import { Component, OnInit } from '@angular/core';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { DetailsOptions, OptionProduct } from 'src/app/interfaces/optionProduct-interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
  providers: [MatAutocomplete],
})
export class NewProductComponent implements OnInit {
  categories: Category[] = [];
  filterCategories?: Observable<any[]>;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  ingredients: string[] = [];
  options: string[] = [];
  optionsGroup:OptionProduct[] = [];
  form: FormGroup;
  formVariations:FormGroup;
  categoryControl = new FormControl('');
  variationState:boolean = false

  constructor(
    public theme: ThemesService,
    private localService: LocalDataService,
    private formBuilder: FormBuilder,
    private toastr:ToastrService

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
      required:[false]
    })
  }

  ngOnInit(): void {
    this.categories = this.localService.getCategories();

    this.filterCategories = this.form.controls['category'].valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value || ''))
    );

  }

  saveProduct() {
    
    console.log(this.optionsGroup);
    console.log(this.form);
    if (this.form.invalid) {

      this.toastr.error('Completar los campos requeridos')
      return
    }
    
    const product = {variations:this.optionsGroup, ...this.form.value }
    console.log(product);
    //HTTP METHOD////////////////////////////////////



  }

  saveOptions() {
    const _typeOption = this.formVariations.controls['typeOption'];
    const op = this.options.join(','); //FOR BUG
    const option = this.createOption(_typeOption.value, op.split(','));

    if (this.optionsGroup.find(e => e.typePrice === 1) && this.formVariations.get('typePrice')?.value === 1) {
      this.toastr.error('Solo puedes crear una variacion que altere el precio totalmente')
      return
    }


    if (
      this.formVariations.invalid ||
      this.options.length === 0
    ) {      
      this.formVariations.markAllAsTouched()
      this.form.markAllAsTouched();
      this.toastr.error('Completar los campos requeridos')
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
    this.formVariations.reset()
  }

  private createOption(typeOption: string, options: string[]):OptionProduct{
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
      multiple: _typePriceControl.value === 1 ? false : this.formVariations.controls['multiple'].value,
      required:this.formVariations.get('required')?.value
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
        if (!this.options.find(e=> e === value)) {
          this.options.push(value);
        }
      } else {
        if (!this.ingredients.find(e=> e === value)) {
          this.ingredients.push(value);
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
      const index = this.ingredients.indexOf(value);
      this.ingredients.splice(index, 1);
    }
  }

  edit(value: any, event: MatChipEditedEvent) {
    const data = event.value.trim();
    // Remove fruit if it no longer has a name
    if (!value) {
      this.remove(value);
      return;
    }

    if (event.chip.id === 'ingredients') {
      const index = this.ingredients.indexOf(value);
      if (index >= 0) {
        this.ingredients[index] = data;
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

    return this.categories.filter((cat) =>
      this.normalizeValue(cat.name).includes(filterValue)
    );
  }

  private normalizeValue(value: any): string {
    return value.toLowerCase().replace(/\s/g, '');
  }



  public updatePriceOption(indexGroup:number, index:number, newPrice?:any ){
    const htmlInput:HTMLElement|null = document.querySelector('#option' + index + indexGroup)
    console.log(htmlInput);
    
    if (this.optionsGroup[indexGroup].typePrice === 3) {
      return
    }

    htmlInput!.style.visibility = 'visible'

      

    if (newPrice || newPrice === '') {
      htmlInput!.style.visibility = 'hidden'
      this.optionsGroup[indexGroup].options[index].price = newPrice
    }

  }




}
