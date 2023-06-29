import { Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { BehaviorSubject, catchError, firstValueFrom, map, Observable, startWith } from 'rxjs';
import { Category } from 'src/app/interfaces/category-interfaz';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { ThemesService } from 'src/app/services/themes/themes.service';
import {
  MatChipEditedEvent,
  MatChipEvent,
  MatChipInputEvent,
} from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import {
  DetailsOptions,
  OptionProduct,
} from 'src/app/interfaces/optionProduct-interface';
import { ToastrService } from 'ngx-toastr';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Product } from 'src/app/interfaces/product-interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MainDetailComponent } from 'src/app/detail/components/main-detail/main-detail.component';
import { Location } from '@angular/common';
import { shepherd } from 'src/app/utils/shepherd-tour';
import { CloudinaryService } from 'src/app/services/cloudinary/cloudinary.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment';
import { AdminService } from 'src/app/services/admin/admin.service';
import { noScriptValidator } from 'src/app/utils/validators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SetOptionsProductComponent } from '../set-options-product/set-options-product.component';
import { enterRight } from 'src/app/animations/main-animations';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { DinamicListService } from 'src/app/services/dinamic-list/dinamic-list.service';
import { handleError } from 'src/app/utils/handle-error-http';
import { NotificationsAdminService } from 'src/app/services/notifications-admin/notifications-admin.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
  providers: [MatAutocomplete, ConfirmationService, History, MessageService],
  animations:[enterRight, fadeIn]
})
export class NewProductComponent implements OnInit {

  @ViewChild(SetOptionsProductComponent) setOptions!: SetOptionsProductComponent;

  @Output() close = new EventEmitter(false)
  @Input() category_id?:number

  categories?: any[] = [];
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  ingredientsList: string[] = [];
  options: string[] = [];
  optionsGroup: OptionProduct[] = [];
  form: FormGroup;

  previewImageProduct: any
  processLoad: boolean = false
  previewModal: boolean = false;
  refPreviewModal?: DynamicDialogRef
  creatingGroup:boolean = false


  constructor(
    public theme: ThemesService,
    private localService: LocalDataService,
    private formBuilder: FormBuilder,
    private configDialog: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private dialogService: DialogService,
    private confirmService: ConfirmationService,
    private cloudinary: CloudinaryService,
    private http: HttpClient,
    private adminService: AdminService,
    private toast: MatSnackBar,
    private dinamicList:DinamicListService,
    private notificationsAdmin:NotificationsAdminService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required, noScriptValidator()],
      price: ['', Validators.required, noScriptValidator()],
      ingredients: [null],
      description: [null],
      image: [null]
    });

  }



  image: any

  ngOnInit(): void {
    console.log(this.category_id);
    

    this.adminService.getCategories().subscribe((data) => { this.categories = data; console.log(data); })

    this.continueTutorial()
  }

  async saveProduct() {
    console.log(this.form);


    if (this.form.invalid) {
      this.form.markAllAsTouched()
      this.toast.open('Completar los campos requeridos', '', {duration:3000})
      return
    }

    this.processLoad = true

    this.form.removeControl('ingredients')
    this.form.get('name')?.setValue(this.capitalize(this.form.get('name')?.value))
    this.form.get('description')?.setValue(this.capitalize(this.form.get('description')?.value))

    const product = { variations: JSON.stringify(this.optionsGroup), ingredients: JSON.stringify(this.ingredientsList), ...this.form.value, category_id:this.category_id };

    this.adminService.postProduct(product).pipe(
      catchError(() => {
        this.processLoad = false
        return handleError(undefined, this.notificationsAdmin)

      })).subscribe((res) => {
      this.resetForm()
      this.toast.open('Producto creado con exito', '',  {duration:3000})
      this.adminService.products = undefined
      this.dinamicList.updateDinamicList.next(true)
      this.dinamicList.updateDashboardList.next(true)
      this.closeForm()
    })

  }

  getOptionsSelected(options: OptionProduct[]) {
    const variations: OptionProduct[] = JSON.parse(JSON.stringify(options))

    console.log(variations);


    this.optionsGroup = variations
  }

  removePreviewImage() {
    this.previewImageProduct = undefined
    this.form.get('image')?.setValue(null)
  }

  showPreview() {

    if (this.form.invalid) {
      this.form.markAllAsTouched()
      this.toast.open('Completar los campos requeridos.', 'Ok', {duration:3000})
      return
    }

    const screenWidth = window.innerWidth;
    if (this.previewModal) return
    this.previewModal = true
    this.refPreviewModal = this.dialogService.open(MainDetailComponent, {
      data: {
        variations: this.optionsGroup,
        ...this.form.value,
        image: this.previewImageProduct,
        ingredients: this.ingredientsList
      },
      header: 'Vista previa',
      width: screenWidth > 500 ? '400px' : '100%',
      height: screenWidth > 500 ? '90%' : '100%',
      draggable: true,
      resizable: true,
      keepInViewport: true,
      dismissableMask: true,
      styleClass: 'modal-preview',
    });


    this.refPreviewModal.onClose.subscribe((data) => {
      this.previewModal = false
    });
  }


  uploadImage(event: any) {

    if (event.files.length > 0) {
      const file = event.files[0];
      console.log(file);

      this.form.get('image')?.setValue(file)
      this.image = file
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImageProduct = e.target?.result;

      };
      reader.readAsDataURL(file);
    }


  }

  closeForm(){
    this.close.emit(true)
  }

  resetForm() {
    this.setOptions.resetOptions()
    this.form.reset()
    this.form.markAsUntouched()
    this.ingredientsList = []
    this.form.reset();
    Object.keys(this.form.controls).forEach((key) => {
      this.form.get(key)?.markAsUntouched();
    });

    this.previewImageProduct = undefined
    this.processLoad = false

  }




  add(event: MatChipInputEvent): void {
    const value = ((event.value || '').trim());
    console.log(value);
    console.log(event.chipInput.id);

    if (value) {
      const normalizeValue = value[0].toUpperCase() + value.slice(1);
      if (event.chipInput.id === 'options') {
        if (!this.options.find((e) => e.toLowerCase() === value.toLowerCase())) {
          this.options.push(normalizeValue);
        }
      } else {
        if (!this.ingredientsList.find((e) => e.toLowerCase() === value.toLowerCase())) {
          this.ingredientsList.push(normalizeValue);
        }
      }
    }
    // Add our fruit

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(value: any, event?: MatChipEvent): void {
    console.log(event);
    if (event?.chip.id === 'options') {
      const index = this.options.indexOf(value);
      if (index >= 0) {
        this.options.splice(index, 1);
      }
    } else {
      const index = this.ingredientsList.indexOf(value);
      this.ingredientsList.splice(index, 1);
    }
  }

  edit(value: any, event: MatChipEditedEvent) {
    const data = event.value.trim();
    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(value);
      return;
    }

    if (event.chip.id === 'ingredientsList') {
      const index = this.ingredientsList.indexOf(value);
      if (index >= 0) {
        this.ingredientsList[index] = data;
      }
    } else {
      const index = this.options.indexOf(value);
      if (index >= 0) {
        this.options[index] = data;
      }
    }
    // Edit existing fruit
  }


  capitalize(value: string) {
    if (value)
      return value[0]?.toUpperCase() + value.slice(1)
    else return null
  }


  private normalizeValue(value: any): string {
    return value.toLowerCase().replace(/\s/g, '');
  }


  continueTutorial() {
    const widthScreen = window.innerWidth

    shepherd.addSteps(
      [
        {
          id: 'step6',
          classes: 'step-variations-form',
          text: `Si su producto tiene opciones, puede crear variaciones para él. Las variaciones son conjuntos únicos de opciones (como tamaño, color, Kg, Ml, etc.) que existen para este producto concreto. Por ejemplo: 
            <br>
            Una camiseta que se ofrece en dos tallas (pequeña y mediana) y dos colores (amarillo y gris) tiene cuatro variaciones,
            <br>
            Una gaseosa que se ofrece tiene 3 Medidas (2.5l, 1L, 500ML) tiene 3 variaciones
            <br>
            <span style="font-size:11px; color:wheat;">Pase por el formulario para mas informacion</span><br>
            <span style="font-size:11px; color:wheat;">Los datos ingresados son a modo de ejemplo</span>
            `,

          attachTo: {
            element: '#variationsForm',
            on: 'top'
          },
          buttons: [
            {
              text: 'Siguiente',
              action: shepherd.next
            }
          ],
          when: {
            show: () => {
             
            },
            hide: () => {

            }
          }

        },
        {
          id: 'step7',
          classes: 'step-current-options',
          text: `Una vez creada tus variaciones, aqui abajo podras editar el precio de cada una, si es que lo afecta  <br>
              En este ejemplo el producto X tiene 3 variaciones que afectan totalmente su precio                   
        `,

          attachTo: {
            element: '.container-current-options',
            on: 'top'
          },
          buttons: [
            {
              text: 'Siguiente',
              action: shepherd.next
            }
          ],
          when: {
            show: () => {
              this.optionsGroup = [
                {
                  id:110,
                  nameVariation: 'Tamaño',
                  multiple: false,
                  typePrice: 1,
                  options: [
                    {
                      nameOption: 'Grande',
                      price: 700
                    },
                    {
                      nameOption: 'Mediano',
                      price: 400
                    },
                    {
                      nameOption: 'Chico',
                      price: 200
                    }
                  ],
                  required: true,
                  min: 0,
                  max: 0

                }
              ]
              console.log(this.optionsGroup);


            },
            hide: () => {
              this.optionsGroup.length = 0
              console.log(this.optionsGroup);
            }
          }

        },
        {
          id: 'step8',
          classes: 'step-save-buttons-options',
          text: `Finalizando con el producto puedes ver una vista previa y luego guardarlo, automaticamente este producto se mostrara en el inicio de tu aplicacion disponible para comprar`,

          attachTo: {
            element: '.button-save-product',
            on: widthScreen > 500 ? 'left' : 'top'
          },
          buttons: [
            {
              text: 'Finalizar',
              action: shepherd.complete
            }
          ],
          when: {
            show: () => {
              const element = (document.querySelector('.button-preview-product') as HTMLElement);
              element.style.zIndex = '9999';
              element.style.position = 'relative';
            },
            hide: () => {
              const element = (document.querySelector('.button-preview-product') as HTMLElement);
              element.style.zIndex = '1';
              element.style.position = 'initial';
            }
          }

        }
      ])

  }

}


