import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
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
import { noScriptValidator } from 'src/app/utils/validators';

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
      name: ['', Validators.required, noScriptValidator()],
      category_id: ['', Validators.required, noScriptValidator()],
      price: ['', Validators.required, noScriptValidator()],
      ingredients: [null],
      description: [null],
      image: [null]
    });

  }


  ngOnInit(): void {

    console.log(this.product);
    
    this.adminService.getCategories().subscribe((data) => { this.categories = data; console.log(data); })

    this.formEditProduct.addControl('id', this.formBuilder.control(null))
    this.setEditProduct(this.product!);

    this.formEditProduct.valueChanges.subscribe(change => {
      this.editing = true
    })
  }

  saveEditProduct() {

    this.formEditProduct.removeControl('ingredients')
    this.formEditProduct.get('name')?.setValue(this.capitalize(this.formEditProduct.get('name')?.value))

    const product = {variations:JSON.stringify(this.optionsGroup), ingredients:JSON.stringify(this.ingredientsList), ...this.formEditProduct.value};

    this.adminService.updateProduct(product).subscribe(res => {
      this.toast.open('Producto actualizado con exito', '', {duration:3000})
      this.adminService.products = undefined
      this.product!.editing = false
      this.dinamicList.updateDinamicList.next(true)
    })
  }

  setEditProduct(product: Product) {
    console.log(product);

    this.formEditProduct.patchValue({
      name: product.name,
      price: product.price,
      id: product.id,
      image: product.image || null,
      description: product.description,
    });

    this.previewImageProduct = product.image
    this.ingredientsList = product.ingredients || [];
    this.optionsGroup = product.variations || [];
  }

  getOptionsSelected(options: OptionProduct[]) {
     
    const variations:OptionProduct[] = JSON.parse(JSON.stringify(options))

    console.log(variations);
    this.optionsGroup = variations

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

  closeEditProduct() {

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
