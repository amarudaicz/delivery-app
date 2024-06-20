import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, HostListener, Inject, Input, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent, MatChipEvent, MatChipEditedEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { async, catchError, of, throwError } from 'rxjs';
import { MainDetailComponent } from 'src/app/detail/components/main-detail/main-detail.component';
import { Category } from 'src/app/interfaces/category-interfaz';
import { OptionProduct } from 'src/app/interfaces/optionProduct-interface';
import { Product } from 'src/app/interfaces/product-interface';
import { AdminService } from 'src/app/services/admin/admin.service';
import { CloudinaryService } from 'src/app/services/cloudinary/cloudinary.service';
import { DinamicListService } from 'src/app/services/dinamic-list/dinamic-list.service';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { ThemesService } from 'src/app/services/themes/themes.service';
import { copy } from 'src/app/utils/copyElement';
import { MainEditProductComponent } from '../main-edit-product/main-edit-product.component';
import { HttpInterceptorService } from 'src/app/services/iterceptor-jwt/interceptorJwt';
import { handleError } from 'src/app/utils/handle-error-http';
import { Local } from 'src/app/interfaces/local-interface';
import { LayoutStateService } from 'src/app/services/layoutState/layout-state.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-modal-edit-product',
  templateUrl: './modal-edit-product.component.html',
  styleUrls: ['./modal-edit-product.component.scss']
})
export class ModalEditProductComponent implements OnDestroy{



  @Input() product?: Product; 
  @Output() stateProduct = new EventEmitter<Product>()
  @Output() closeModal = new EventEmitter<boolean>()

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  formEditProduct: FormGroup
  processLoad: boolean = false
  ingredientsList: string[] = [];
  optionsGroup: OptionProduct[] = [];
  previewImageProduct: any
  categories: any[] = []
  editing: boolean = false
  previewModal: boolean = false
  image: any;
  galeryFiles:any[]=[];
  galeryUrls:string[] = [];
  galeryPreview?:any[];
  isMobile = window.innerWidth < 768;
  refPreviewModal:any

  constructor(
    public theme: ThemesService,
    public localService: LocalDataService,
    private formBuilder: FormBuilder,
    private configDialog: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private dialogService: DialogService,
    private confirmService: ConfirmationService,
    private cloudinary: CloudinaryService,
    private http: HttpClient,
    public adminService: AdminService,
    private toast: MatSnackBar,
    private dinamicList:DinamicListService,
    private layout:LayoutStateService
  ) {
    this.formEditProduct = this.formBuilder.group({
      name: ['', Validators.required ],
      id: ['', Validators.required ],
      price: ['', Validators.required ],
      ingredients: [null],
      description: [null],
      image: [null],
      category_id:[null]
    });

    this.layout.blockBody()
  }


  ngOnInit(): void {

    this.product = copy(this.product)
    
    this.formEditProduct.addControl('id', this.formBuilder.control(null))
    this.setEditProduct(this.product!);

    this.formEditProduct.valueChanges.subscribe(change => {
      this.editing = true
    })

    if (this.getOptionWithLowestPrice(this.optionsGroup)){
      this.formEditProduct.get('price')?.disable()
    }

    this.adminService.categories$.subscribe(categories=>{
      this.categories = categories
    })

  }


  async saveEditProduct() {


    if (this.formEditProduct.invalid) {
      this.formEditProduct.markAllAsTouched()
      this.toast.open('Completar los campos requeridos', '' , {duration:3000})
      return  
    }


    if (!this.checkOptionsEmpyt(this.optionsGroup).state){
      this.toast.open(this.checkOptionsEmpyt(this.optionsGroup).message, 'Ok')
      return
    }


    this.processLoad = true
    if(this.image) {
      this.toast.open('Subiendo imagenes...')
      const primaryImage = await this.uploadSingleImage(this.image)
      this.formEditProduct.get('image')?.setValue(primaryImage)
    }

    if (this.galeryFiles.length){
      this.toast.open('Subiendo imagenes...')
      await this.uploadSequentiallyGalery(0)
    }


    this.formEditProduct.removeControl('ingredients')
    this.formEditProduct.get('price')?.enable()
    this.formEditProduct.get('name')?.setValue(this.capitalize(this.formEditProduct.get('name')?.value))

    this.cleanVariations(this.optionsGroup)
    console.log(this.optionsGroup);
    
    const product = {variations:JSON.stringify(this.optionsGroup), ingredients:JSON.stringify(this.ingredientsList), ...this.formEditProduct.value,galery:JSON.stringify(this.galeryUrls) };
    this.product!.editing = false

    this.adminService.updateProduct(product).pipe(
      catchError((err)=>{
        this.toast.open('A ocurrido un error, intente nuevamente', '', {duration:5000})
        this.processLoad = false
        return throwError(()=> new Error(err))
      })
    ).subscribe(res => {
      this.closeModal.emit(true)
      this.toast.open('Producto actualizado con éxito', '', {duration:3000})
      this.adminService.products = undefined
      this.adminService.getProductsAdmin()
      this.processLoad = false
    })
  }

  setEditProduct(product: Product) {
    this.previewImageProduct = product.image
    this.ingredientsList = product.ingredients || [];
    this.optionsGroup = product.variations || [];
    this.galeryPreview = product.galery?.length ? product.galery : undefined
    this.galeryUrls = product.galery?.length ? product.galery : []

    this.formEditProduct.patchValue({
      name: product.name,
      id: product.id,
      price:this.getOptionWithLowestPrice(this.optionsGroup) || product.price,
      image: product.image || null,
      description: product.description,
      category_id:product.category_id
    });

    if (this.getOptionWithLowestPrice(this.optionsGroup)){
      this.formEditProduct.get('price')?.disable()
    }
  }

  getOptionsSelected(options: OptionProduct[]) {
    this.optionsGroup = options
    
    if (!this.getOptionWithLowestPrice(options)) {
      this.formEditProduct.get('price')?.setValue(this.product?.price) 
      this.formEditProduct.get('price')?.enable()
      return
    }

    this.formEditProduct.get('price')?.setValue(this.getOptionWithLowestPrice(options)) 
    this.formEditProduct.get('price')?.disable()


    console.log(this.formEditProduct.getRawValue);
    
    this.formEditProduct.removeControl('ingredients')
    const product = {variations:this.optionsGroup, ingredients:this.ingredientsList, ...this.formEditProduct.value}

    this.stateProduct.emit(product)

  }

  removePreviewImage() {
    this.previewImageProduct = undefined
    this.formEditProduct.get('image')?.setValue(null)
  }



  showPreview() {

    const screenWidth = window.innerWidth;

    this.previewModal = true
    this.refPreviewModal = this.dialogService.open(MainDetailComponent, {
      data: {
        variations: this.optionsGroup,
        ...this.formEditProduct.value,
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

    window.history.pushState({modal:true}, 'modal')

    this.refPreviewModal.onClose.subscribe((data:any) => {
      this.previewModal = false
    });
  }

  @HostListener('window:popstate')
  onPopState() {
    if (this.refPreviewModal) {
      this.refPreviewModal.close()
      return 
    }

    console.log('closeando');
    this.closeModal.emit(true)
    
  }



  capitalize(value: string) {
    if (value)
      return value[0]?.toUpperCase() + value.slice(1)
    else return null
  }


  uploadImage(event: any) {
    console.log(event);
    
    const file = event.target.files[0];

    if (file) {
      console.log(file);
      this.formEditProduct.get('image')?.setValue(file)
      this.image = file
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImageProduct = e.target?.result;
      };
      reader.readAsDataURL(file);
    }
  }

  uploadGalery(event:any){
    let files = event.target.files;
    this.galeryPreview = files.length ? [] : undefined;

    if (files.length > 4) {
      this.toast.open('Solo puedes cargar un máximo de 4 imágenes', '' ,{duration:3000})
      let filesArray: File[] = Array.from(files);
      // Limitar la cantidad de archivos a 4
      filesArray = filesArray.slice(0, 4);
      files = filesArray
    }
    for (let i = 0; i < files.length; i++) {
      this.galeryFiles.push(files[i])
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.galeryPreview!.push(e.target?.result);
      };
      reader.readAsDataURL(files[i]);
    }

    
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
    return lowestPrice === Infinity ? 0 : lowestPrice;
  }

  checkOptionsEmpyt(variations:OptionProduct[]){
    console.log(variations);
    console.log(variations.find(v=>v.typePrice === 1));
    const definePrice = variations.find(v=>v.typePrice === 1);

    const error = {message:'', state:false}
    
    if (definePrice?.options.some(o => o.price === 0)) {
      error.message = `Una opcion del grupo ${definePrice.nameVariation} que define el precio final de su producto no tiene precio.`
      return error
    }

    if (definePrice && definePrice?.options.every(o => !o.active)){
      this.optionsGroup.filter(v=> v.id !== definePrice.id)
    }

    return {message:'', state:true}
  }

  cleanVariations(variations:OptionProduct[]){

    variations.forEach((v,i,d)=>{
      if (v.options.every(o => !o.active)) {
        d.splice(i,1)
      }
    })

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

  add(event: MatChipInputEvent): void {
    const value = ((event.value || '').trim());
    console.log(value);
    console.log(event.chipInput.id);

    if (value) {
      const normalizeValue = value[0].toUpperCase() + value.slice(1);
      this.ingredientsList.push(normalizeValue);
    }
    // Add our fruit
    // Clear the input value
    event.chipInput!.clear();
  }

  remove(value: any, event?: MatChipEvent): void {
    console.log(event);
    const index = this.ingredientsList.indexOf(value);
    this.ingredientsList.splice(index, 1);

  }

  edit(value: any, event: MatChipEditedEvent) {
    const data = event.value.trim();
    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(value);
      return;
    }
    const index = this.ingredientsList.indexOf(value);
    
    if (index >= 0) {
      this.ingredientsList[index] = data;
    }
    // Edit existing fruit
  }


  ngOnDestroy(): void {
    this.layout.unblockBody()
  }



}
