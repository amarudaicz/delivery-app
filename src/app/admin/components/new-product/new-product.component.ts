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
  variationState: boolean = true;
  dataModal?: any;
  editing: boolean = false;
  previewModal: boolean = false;

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
    });

    this.formVariations = this.formBuilder.group({
      options: ['', [Validators.required]],
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
  }

  closeModalEdit() {
    console.log('as');

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
    console.log(this.ingredientsList);
    this.form.get('ingredients')?.setValue(this.ingredientsList);
    const screenWidth = window.innerWidth;

    if (this.dialogService.dialogComponentRefMap.has(this.dialogRef)) {
      return;
    }

     
    
    this.dialogRef = this.dialogService.open(MainDetailComponent, {
      data: {
        variations: this.optionsGroup,
        ...this.form.value,
      },
      header: 'Vista previa',
      width: screenWidth > 500 ? '30%' : '100%',
      height: screenWidth > 500 ? '80%' : '100%',
      draggable: true,
      resizable: true,
      keepInViewport: true,
      modal: false,
      styleClass: 'modal-preview',
      dismissableMask: true,
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

}
