import { Component, HostListener, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';
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
import { ConfirmationService } from 'primeng/api';
import { MainDetailComponent } from 'src/app/detail/components/main-detail/main-detail.component';
import { Location } from '@angular/common';
import { shepherd } from 'src/app/utils/shepherd-tour';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
  providers: [MatAutocomplete, ConfirmationService, History],
})
export class NewProductComponent implements OnInit {
  categories: Category[] = [];
  filterCategories?: Observable<any[]>;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  ingredientsList: string[] = [];
  options: string[] = [];
  optionsGroup: OptionProduct[] = [];
  form: FormGroup;
  formVariations: FormGroup;
  categoryControl = new FormControl('');
  variationState: boolean = false;

  dataModal?: any;
  editing: boolean = false;
  previewModal: boolean = false;
  previewImageProduct:any

  constructor(
    public theme: ThemesService,
    private localService: LocalDataService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private configDialog: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private dialogService: DialogService,
    private confirmService: ConfirmationService,
    private location:Location
  ) {
    this.form = this.formBuilder.group({
      nameProduct: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      ingredients: [''],
      description:[''],
      previewImageProduct:['']
    });

    this.formVariations = this.formBuilder.group({
      options: [''],
      typeOption: ['', Validators.required],
      typePrice: ['', Validators.required],
      multiple: [false],
      required: [false],
    });
  }

  ngOnInit(): void {
    this.localService.getCategories().subscribe((data) => {
      this.categories = data;
      console.log(this.categories);
    });

    this.filterCategories = this.form.controls['category'].valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value || ''))
    );

    if (this.configDialog.data) {
      this.dataModal = this.configDialog.data;
      this.setEditProduct(this.configDialog.data);

      this.form.valueChanges.subscribe((change) => {
        this.editing = true;
      });
    }

    this.continueTutorial()

   
  }

  saveProduct() {
    console.log(this.optionsGroup);
    console.log(this.form);

    if (this.form.invalid) {
      this.toastr.error('Completar los campos requeridos');
      return;
    }

    this.form.get('ingredients')?.setValue(this.ingredientsList);
    const product = { variations: this.optionsGroup, ...this.form.value };

    if (this.editing) {
      this.editing = false;
      console.log('ACTUALIZANDO PRODUCTO');
    } else {
      console.log('AGREGANDO PRODUCTO');
    }
    console.log(product);
    //HTTP METHOD////////////////////////////////////
  }

  saveOptions() {
    const _typeOption = this.formVariations.controls['typeOption'];
    const op = this.options.join(','); //FOR BUG
    const option = this.createOption(_typeOption.value, op.split(','));

    if (
      this.optionsGroup.find((e) => e.typePrice === 1) &&
      this.formVariations.get('typePrice')?.value === 1
    ) {
      this.toastr.error(
        'Solo puedes crear una variacion que altere el precio totalmente'
      );
      return;
    }

    if (this.formVariations.invalid || this.options.length === 0) {
      this.formVariations.markAllAsTouched();
      this.form.markAllAsTouched();
      this.toastr.error('Completar los campos requeridos');
      return;
    }

    if (
      this.optionsGroup.find(
        (e) => e.nameVariation.toLowerCase() === _typeOption.value.toLowerCase()
      )
    ) {
      this.optionsGroup.forEach((e: any, i: number) => {
        if (e.nameOption.toLowerCase() === _typeOption.value.toLowerCase()) {
          this.optionsGroup.splice(i, 1);
          this.optionsGroup.push(option);
        }
      });
    } else {
      this.optionsGroup.push(option);
    }

    this.options.length = 0;
    this.formVariations.reset();
  }

  private createOption(typeOption: string, options: string[]): OptionProduct {
    const optionsDetail: DetailsOptions[] = [];
    const _typePriceControl = this.formVariations.controls['typePrice'];

    options.forEach((e) => {
      const o = {
        nameOption: e,
        price:
          _typePriceControl.value === 3 || this.form.get('price')?.invalid
            ? 0
            : this.form.controls['price'].value,
      };
      optionsDetail.push(o);
    });

    return {
      nameVariation: typeOption,
      options: optionsDetail,
      typePrice: _typePriceControl.value,
      multiple:
        _typePriceControl.value === 1
          ? false
          : this.formVariations.controls['multiple'].value,
      required: this.formVariations.get('required')?.value,
    };
  }

  removeOption(name: string) {
    this.optionsGroup.filter((o) => o.nameVariation !== name);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    console.log(event.chipInput.id);

    if (value) {
      if (event.chipInput.id === 'options') {
        if (!this.options.find((e) => e === value)) {
          this.options.push(value);
        }
      } else {
        if (!this.ingredientsList.find((e) => e === value)) {
          this.ingredientsList.push(value);
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

  private filter(value: string): any[] {
    console.log(value);

    const filterValue = this.normalizeValue(value);
    console.log(filterValue);

    console.log(
      this.categories.filter((cat) =>
        this.normalizeValue(cat.name).includes(filterValue)
      )
    );

    return this.categories.filter((cat) =>
      this.normalizeValue(cat.name).includes(filterValue)
    );
  }

  private normalizeValue(value: any): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  public updatePriceOption(indexGroup: number, index: number, newPrice?: any) {
    const htmlInput: HTMLElement | null = document.querySelector(
      '#option' + index + indexGroup
    );
    console.log(htmlInput);

    if (this.optionsGroup[indexGroup].typePrice === 3) {
      return;
    }

    htmlInput!.style.visibility = 'visible';

    console.log(newPrice);

    if (newPrice && newPrice !== '') {
      htmlInput!.style.visibility = 'hidden';
      this.optionsGroup[indexGroup].options[index].price = newPrice;
    }
  }

  setEditProduct(product: Product) {
    this.form.patchValue({
      nameProduct: product.nameProduct,
      category: product.categoryId,
      price: product.price,
    });

    this.ingredientsList = product.ingredients;
    this.optionsGroup = product.variations;
    this.previewImageProduct = product.image
  }

  closeModalEdit() {

    if (this.editing) {
      this.confirmService.confirm({
        message: 'No guardaste tus cambios deseas salir igual?',
        header: 'Alerta',
        icon: 'pi pi-exclamation-triangle',
        accept: () => this.dialogRef.close(),
        reject: () => console.log('reject'),
      });
      return;
    }

    this.dialogRef.close();
  }

  showPreview() {

    this.form.get('ingredients')?.setValue(this.ingredientsList);
    const screenWidth = window.innerWidth;

    // if (this.dialogService.dialogComponentRefMap.has(this.dialogRef)) {
    //   return;
    // }

    this.dialogService.open(MainDetailComponent, {
      data: {
        variations: this.optionsGroup,
        ...this.form.value,
        image:this.previewImageProduct
      },
      header: 'Vista previa',
      width: screenWidth > 500 ? '300px' : '100%',
      height: screenWidth > 500 ? '80%' : '100%',
      draggable: true,
      resizable: true,
      keepInViewport: true,
      modal: false,
      styleClass: 'modal-preview',
      
    });
  }

  

  // @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    console.log('Tecla de retroceso presionada');
    // Realizar acción al presionar la tecla de retroceso sin retroceder en el historial
   
    if (this.dialogService.dialogComponentRefMap.has(this.dialogRef)) {
      this.dialogRef.close()
      window.history.pushState(null, '', window.location.href);
    }

  }


  uploadImage(event:any) {
    
    if (event.files.length > 0) {
      const file = event.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        console.log(e);
        this.previewImageProduct = e.target?.result;
        console.log(this.previewImageProduct);
        
      };
      reader.readAsDataURL(file);
    }

    
  }


  
  continueTutorial(){
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
            buttons:[
                {
                  text:'Siguiente',
                  action:shepherd.next
                }
            ],
            when:{
                show:()=>{
                  this.variationState = true;
                  this.formVariations.patchValue({
                    typeOption:'Tamaño',
                    typePrice:1,
                  })
                  this.options = ['Grande', 'Mediano', 'Chico']
                },
                hide:()=>{
                  this.formVariations.reset();
                  this.options = []

                }
            }
            
          },
        {
        id:'step7',
        classes: 'step-current-options',
        text: `Una vez creada tus variaciones, aqui abajo podras editar el precio de cada una, si es que lo afecta  <br>
              En este ejemplo el producto X tiene 3 variaciones que afectan totalmente su precio                   
        `,

        attachTo: {
          element: '.container-current-options',
          on: 'top' 
        },
        buttons:[
            {
              text:'Siguiente',
              action:shepherd.next
            }
        ],
        when:{
            show:()=>{
              this.optionsGroup = [
                {
                  nameVariation: 'Tamaño',
                  multiple: false,
                  typePrice: 1,
                  options: [
                    {
                      nameOption:'Grande',
                      price:700
                    },
                    {
                      nameOption:'Mediano',
                      price:400
                    },
                    {
                      nameOption:'Chico',
                      price:200
                    }
                  ],
                  required:true

                }
              ]
              console.log(this.optionsGroup);
              

            },
            hide:()=>{
              this.optionsGroup.length = 0
              console.log(this.optionsGroup);  
            }
        }
        
      },
      {
        id:'step8',
        classes: 'step-save-buttons-options',
        text: `Finalizando con el producto puedes ver una vista previa y luego guardarlo, automaticamente este producto se mostrara en el inicio de tu aplicacion disponible para comprar`,

        attachTo: {
          element: '.button-save-product',
          on: widthScreen > 500 ? 'left' : 'top' 
        },
        buttons:[
            {
              text:'Finalizar',
              action:shepherd.complete
            }
        ],
        when:{
            show:()=>{
              const element = (document.querySelector('.button-preview-product') as HTMLElement);
              element.style.zIndex = '9999';
              element.style.position = 'relative';
            },
            hide:()=>{
              const element = (document.querySelector('.button-preview-product') as HTMLElement);
              element.style.zIndex = '1';
              element.style.position = 'initial';
            }
        }
        
      }
    ])

  }
}


