import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, HostListener, Inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent, MatChipEvent, MatChipEditedEvent } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { async } from 'rxjs';
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

@Component({
  selector: 'app-modal-edit-product',
  templateUrl: './modal-edit-product.component.html',
  styleUrls: ['./modal-edit-product.component.scss']
})
export class ModalEditProductComponent {



  @Input() product?: Product; 
  @Output() stateProduct = new EventEmitter<Product>()

  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  formEditProduct: FormGroup
  processLoad: boolean = false
  ingredientsList: string[] = [];
  optionsGroup: OptionProduct[] = [];
  previewImageProduct: any
  categories: Category[] = []
  editing: boolean = false
  previewModal: boolean = false
  image: any


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
    private dinamicList:DinamicListService
  ) {
    this.formEditProduct = this.formBuilder.group({
      name: ['', Validators.required ],
      id: ['', Validators.required ],
      price: ['', Validators.required ],
      ingredients: [null],
      description: [null],
      image: [null]
    });

  }


  ngOnInit(): void {

    console.log(this.product);
    this.product = copy(this.product)
    
    this.formEditProduct.addControl('id', this.formBuilder.control(null))
    this.setEditProduct(this.product!);

    this.formEditProduct.valueChanges.subscribe(change => {
      this.editing = true
      
    
      
    })


    if (this.getOptionWithLowestPrice(this.optionsGroup)){
      this.formEditProduct.get('price')?.disable()
    }

    
  
  }


  saveEditProduct() {


    if (this.formEditProduct.invalid) {
      this.formEditProduct.markAllAsTouched()
      this.toast.open('Completar los campos requeridos', '' , {duration:3000})
      return  
    }


    if (!this.checkOptionsEmpyt(this.optionsGroup)){
      this.toast.open('Debes activar al menos una opcion en un grupo', '' , {duration:3000})
      return
      
    }


    this.formEditProduct.removeControl('ingredients')
    this.formEditProduct.get('price')?.enable()
    this.formEditProduct.get('name')?.setValue(this.capitalize(this.formEditProduct.get('name')?.value))

    const product = {variations:JSON.stringify(this.optionsGroup), ingredients:JSON.stringify(this.ingredientsList), ...this.formEditProduct.value};

    this.adminService.updateProduct(product).subscribe(res => {
      this.toast.open('Producto actualizado con exito', '', {duration:3000})
      this.adminService.products = undefined
      this.adminService.getProductsAdmin()
    })
  }

  setEditProduct(product: Product) {
    this.previewImageProduct = product.image
    this.ingredientsList = product.ingredients || [];
    this.optionsGroup = product.variations || [];

    this.formEditProduct.patchValue({
      name: product.name,
      id: product.id,
      price:this.getOptionWithLowestPrice(this.optionsGroup) || product.price,
      image: product.image || null,
      description: product.description,
    });

    if (this.getOptionWithLowestPrice(this.optionsGroup)){
      this.formEditProduct.get('price')?.disable()
    }
 

  }

  getOptionsSelected(options: OptionProduct[]) {
    
    
    this.optionsGroup = options
    
    if (!this.getOptionWithLowestPrice(options)) {
      this.formEditProduct.get('price')?.setValue(null) 
      this.formEditProduct.get('price')?.enable()
      return
    }

    this.formEditProduct.get('price')?.setValue(this.getOptionWithLowestPrice(options) || this.product?.price) 
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
    const refPreviewModal = this.dialogService.open(MainDetailComponent, {
      data: {
        variations: this.optionsGroup,
        ...this.formEditProduct.value,
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


    refPreviewModal.onClose.subscribe((data) => {
      this.previewModal = false
    });
  }




  capitalize(value: string) {
    if (value)
      return value[0]?.toUpperCase() + value.slice(1)
    else return null
  }


  uploadImage(event: any) {

    if (event.files.length > 0) {
      const file = event.files[0];
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
    return variations.every(v=> v.options.some(v => v.active))
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




}
