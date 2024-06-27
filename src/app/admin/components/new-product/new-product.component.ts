import { Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
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
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Product } from 'src/app/interfaces/product-interface';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MainDetailComponent } from 'src/app/detail/components/main-detail/main-detail.component';
import { Location } from '@angular/common';
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
import { copy } from 'src/app/utils/copyElement';
import { LayoutStateService } from 'src/app/services/layoutState/layout-state.service';
import { HttpInterceptorService } from 'src/app/services/iterceptor-jwt/interceptorJwt';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
  providers: [MatAutocomplete, ConfirmationService, History, MessageService],
  animations:[enterRight, fadeIn]
})
export class NewProductComponent implements OnInit, OnDestroy {

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
  groupsAvailables?:OptionProduct[]
  isMobile = window.innerWidth < 768;

  constructor(
    public theme: ThemesService,
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
    private adminService: AdminService,
    private toast: MatSnackBar,
    private notificationsAdmin:NotificationsAdminService,
    private cloudinary:CloudinaryService,
    private layout:LayoutStateService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required, ],
      price: ['', Validators.required, noScriptValidator()],
      ingredients: [null],
      description: [null],
      image: [null],
    });

    this.layout.blockBody()
  }



  image:any;
  galeryFiles:any[]=[];
  galeryUrls:string[] = [];
  galeryPreview?:any[];

  ngOnInit(): void {
    console.log(this.category_id);
    
    window.history.pushState({modal:true}, 'modal');

    this.adminService.categories$.subscribe((data) => this.categories = data )
    this.adminService.optionsGroup.subscribe((groups) => this.groupsAvailables = groups)

  
  }

  async saveProduct() {
    console.log(this.form);

    if (this.form.invalid) {
      this.form.markAllAsTouched()
      this.toast.open('Completar los campos requeridos', '', {duration:3000})
      return
    }

    if (!this.checkOptionsEmpyt(this.optionsGroup).state){
      this.toast.open(this.checkOptionsEmpyt(this.optionsGroup).message, 'Ok')
      return
    }

    this.processLoad = true
    this.toast.open('Creando producto...')

    if (this.image || this.galeryFiles.length ) {
      this.toast.open('Subiendo imagenes...')
      const primaryImage = await this.uploadSingleImage(this.image ?? this.galeryFiles[0])
      this.form.get('image')?.setValue(primaryImage)
      this.image ? null : this.galeryFiles.shift()
      console.log(this.galeryFiles);
      
      await this.uploadSequentiallyGalery(0)
    }

    this.form.removeControl('ingredients')
    this.form.get('price')?.enable()
    this.cleanVariations(this.optionsGroup)
    const product = { variations: JSON.stringify(this.optionsGroup), ingredients: JSON.stringify(this.ingredientsList), ...this.form.value, category_id:this.category_id, galery:JSON.stringify(this.galeryUrls) };

    this.adminService.postProduct(product).pipe(
      catchError(({error}) => {
        this.processLoad = false
        return handleError(error, this.notificationsAdmin)

      })).subscribe((res) => {
      this.resetForm()
      this.toast.open('Producto creado con éxito', '',  {duration:3000})
      this.adminService.getProductsAdmin()
      this.closeForm()
    })

  }

  getOptionsSelected(options: OptionProduct[]) {
    const variations: OptionProduct[] = copy(options)
    this.optionsGroup = options
    console.log(this.getOptionWithLowestPrice(options));

    if (!this.getOptionWithLowestPrice(options)) {
      this.form.get('price')?.setValue(this.form.get('price')?.value)
      this.form.get('price')?.enable()
      return
    }

    this.form.get('price')?.setValue(this.getOptionWithLowestPrice(options)) 
    this.form.get('price')?.disable()
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
    
    window.history.pushState({modal:true}, 'modal');
    const screenWidth = window.innerWidth;
    if (this.previewModal) return

    this.previewModal = true
    this.refPreviewModal = this.dialogService.open(MainDetailComponent, {
      data: {
        variations: this.optionsGroup,
        ...this.form.value,
        image: this.previewImageProduct,
        galery:this.galeryPreview,
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

    const file = event.target.files[0];

    if (file) {
      this.form.get('image')?.setValue(file)
      this.image = file
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImageProduct = e.target?.result;
      };

      reader.readAsDataURL(file);
    }
  }

  uploadGalery(event:any){
    let files:FileList|any[] = event.target.files;
    this.galeryPreview = files.length ? [] : undefined;
    console.log(files);

    if (files.length > 4) {
      this.toast.open('Solo puedes cargar un máximo de 4 imágenes', '' ,{duration:3000})
      let filesArray: File[] = Array.from(files);
      // Limitar la cantidad de archivos a 4
      filesArray = filesArray.slice(0, 4);
      files = filesArray
    }
    console.log(files);

    for (let i = 0; i < files.length; i++) {
      this.galeryFiles.push(files[i])
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.galeryPreview!.push(e.target?.result);
      };
      reader.readAsDataURL(files[i]);
    }

    
  }

  closeForm(){
    this.close.emit(true)
  }

  @HostListener('window:popstate')
  onPopState() {
    // Detectar el evento de retroceso del historial
    this.closeForm();
    this.previewModal = false
  }

  resetForm() {
    this.setOptions?.resetOptions()
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

  getOptionWithLowestPrice(product: any): any | null {
    let lowestPrice: number = Infinity;
  
    for (const variation of product) {
      for (const option of variation.options) {
        if (option.price < lowestPrice && option.active && variation.typePrice === 1) {
          lowestPrice = option.price;
        } 
      }
    } 
  
    console.log(lowestPrice); 
    return lowestPrice === Infinity ? false : lowestPrice;
  }



  checkOptionsEmpyt(variations:OptionProduct[]){
    console.log(variations);
    console.log(variations.find(v=>v.typePrice === 1));
    const definePrice = variations.find(v=>v.typePrice === 1);

    const error = {message:'', state:false}
    
    if (definePrice && (definePrice?.options.every(o => !o.active) || definePrice?.options.some(o => o.price <= 0))) {
      this.optionsGroup.filter(v=> v.id !== definePrice.id)
    }
    console.log(this.optionsGroup);
    return {message:'', state:true}
  }

  cleanVariations(variations:OptionProduct[]){
    variations.forEach((v,i,d)=>{
      if (v.options.every(o => !o.active)) {
        d.splice(i,1)
      }
    })

    console.log(this.optionsGroup);
  }


  handleDragDrop(event:CdkDragDrop<any[]>){
    const {previousIndex, currentIndex} = event
    console.log(previousIndex, currentIndex);
    
    moveItemInArray(this.galeryFiles, previousIndex, currentIndex);
    moveItemInArray(this.galeryPreview!, previousIndex, currentIndex);
    console.log(this.galeryFiles);
    
  }

  deleteAllGaleryImages(){
    this.galeryFiles = []
    this.galeryPreview = undefined
    this.form.get('galery')?.reset()
  }

  deleteImageFromGalery(index:number){
    this.galeryFiles.splice(index, 1)
    this.galeryPreview?.splice(index, 1)
    
    this.galeryPreview?.length === 0 ? 
    this.galeryPreview = undefined : null
    
  }

  async uploadSequentiallyGalery(index: number): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (index < this.galeryFiles.length) {
        const file = this.galeryFiles[index];
  
        try {
          const secure_url:any = await this.uploadSingleImage(file);
          this.galeryUrls.push(secure_url);
          console.log(this.galeryUrls);
  
          // Sube la siguiente imagen de forma recursiva
          await this.uploadSequentiallyGalery(index + 1);
          resolve(true);
        } catch (error) {
          console.error('Error al subir imagen:', error);
          reject(false);
        }
      } else {
        // Se han subido todas las imágenes
        console.log('Todas las imágenes se han subido');
        resolve(true);
      }
    });
  }

  async uploadSingleImage(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      this.cloudinary.upload(file).subscribe((data: any) => {
        resolve(data.secure_url);
      }, (error: any) => {
        reject(error);
      });
    });
  }

  ngOnDestroy(): void {
    this.layout.unblockBody()
  }
}

