import { Location } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { addItemCart, fadeIn } from 'src/app/animations/main-detail-animations';
import {
  DetailsOptions,
  OptionProduct,
} from 'src/app/interfaces/optionProduct-interface';
import { Product } from 'src/app/interfaces/product-interface';
import { CartService } from 'src/app/services/cartData/cart.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-add-product-cart',
  templateUrl: './add-product-cart.component.html',
  styleUrls: ['./add-product-cart.component.scss'],
  animations: [addItemCart, fadeIn],
})
export class AddProductCartComponent implements OnInit {
  @Input() product!: Product;
  @Input() modePreview: boolean = false;

  form: FormGroup;
  quantity: number = 1;
  shakeError: string = '';
  stateButton: boolean = true;
  subtotal: number = 0;
  total: number = 0;
  options: any[] = [];
  currentCart?: any;
  countOptions: any = {};

  constructor(
    public theme: ThemesService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private toast: MatSnackBar,
    private location: Location
  ) {
    this.form = this.formBuilder.group({
      especifications: [''],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    console.log(this.product);

    this.form.valueChanges.subscribe((change) => {});

    this.cartService.getCartItems().subscribe((data) => {
      console.log(data);

      this.currentCart = data;
    });

    this.setOptions();

    if (
      !this.product.variations ||
      !this.product.variations.length ||
      !this.product.variations.find((e) => e.typePrice === 1)
    ) {
      console.log(this.product.price);

      this.subtotal = this.product.price;
    }
  }

  saveOrder() {
    const {
      name,
      id: idProduct,
      image: productImage,
      category_name,
      price: productPrice,
    } = this.product;
    console.log(this.options);

    if (this.options.length !== 0) {
      const _type1Index = this.options.findIndex((e) => e.typePrice === 1);
      const _type1Object = this.options.splice(_type1Index, 1)[0];
      this.options.unshift(_type1Object);
    }

    if (
      this.form.valid &&
      Object.values(this.countOptions).every((value) => value === true)
    ) {
      this.stateButton = false;
      const item = {
        name,
        productImage,
        productPrice,
        category_name,
        idProduct,
        ...this.form.value,
        userOptions: this.options,
        total: this.subtotal ? this.subtotal : this.product.price,
      };

      this.cartService.addToCart(item);
      this.stateButton = true;
      
      setTimeout(() => {
        this.location.back();
      }, 1000);

    } else {
      this.form.markAllAsTouched();
      this.toast.open('Completar todos los campos', 'Ok', {
        panelClass: 'alert-detail',
        duration: 3000,
      });
    }
  }

  saveOptions(option: DetailsOptions, optionGroup: OptionProduct) {
    const index = this.options.findIndex(
      (o) => o.nameVariation === optionGroup.nameVariation
    );
    const indexMultiple = this.options.findIndex(
      (o) => o.nameVariation === optionGroup.nameVariation
    );

    console.log(this.subtotal);

    if (optionGroup.multiple) {
      if (indexMultiple !== -1) {
        const subIndex = this.options[indexMultiple].multipleOptions.findIndex(
          (l: any) => l.nameOption === option.nameOption
        );

        if (subIndex !== -1) {
          this.options[indexMultiple].multipleOptions.splice(subIndex, 1);

          if (this.options[indexMultiple].multipleOptions.length === 0) {
            this.options.splice(indexMultiple, 1);
          }
        } else {
          this.options[indexMultiple].multipleOptions.push({ ...option });
        }
      } else {
        this.options.push({
          nameVariation: optionGroup.nameVariation,
          multipleOptions: [{ ...option }],
          multiple: true,
        });
      }

      if (optionGroup.typePrice !== 3) {
        console.log('aaa----');
        console.log(this.options);

        this.subtotal = this.calcSubtotal(this.options);
        console.log(this.subtotal);
      }

      return;
    }

    if (index !== -1) {
      this.options.splice(index, 1);
    }

    this.options.push({ ...option, ...optionGroup });

    const typePrice1Option = this.options.find((e) => e.typePrice === 1);

    if (typePrice1Option) {
      this.total = typePrice1Option.price;
    }

    if (optionGroup.typePrice !== 3) {
      this.subtotal = this.calcSubtotal(this.options);
    }
  }

  setOptions() {
    this.product.variations = this.cleanOptions(this.product.variations);
    this.product.variations?.forEach((e) => {
      e.options = this.sortOptionsByLowestPrice(e.options);
    });

    this.product.variations?.forEach((e) => {
      if (e.multiple) {
        this.form.addControl(e.nameVariation, this.formBuilder.array([]));
        this.countOptions[e.nameVariation] = e.min || e.max ? false : true;
        this.addGroupCheckboxes(e, e.options);

        return; 
      } else if (e.typePrice === 1) {
        const lowOption = this.getOptionWithLowestPrice(e);
        console.log(lowOption);

        this.saveOptions(lowOption, e);
        this.form.addControl(
          e.nameVariation,
          this.formBuilder.control(null, [Validators.required])
        );
        this.form.get(e.nameVariation)?.setValue(lowOption.nameOption);
        return;
      } else {
        this.form.addControl(e.nameVariation, this.formBuilder.control(null));
        this.form.get(e.nameVariation)?.setValue(e.options[0].nameOption);

      }
    });
  }

  clearOption(controlName:string){
    this.form.get(controlName)?.setValue('')
    const i = this.options.findIndex(e=>e.nameVariation === controlName)
    this.options.splice(i, 1)

    this.subtotal = this.calcSubtotal(this.options)
    
  }

  sortOptionsByLowestPrice(options: any[]): any[] {
    return options.sort((a, b) => a.price - b.price);
  }

  getOptionWithLowestPrice(variation: any): DetailsOptions {
    let lowestPrice: number = Infinity;
    let lowestOption: any;

    for (const option of variation.options) {
      if (option.price < lowestPrice && option.active) {
        lowestPrice = option.price;
        lowestOption = option;
      }
    }

    console.log(lowestOption);

    return lowestOption;
  }

  cleanOptions(variations: OptionProduct[]) {
    return variations?.filter((e) => e.options.some((o) => o.active));
  }

  addGroupCheckboxes(groupOption: OptionProduct, checkboxes: any[]) {
    const formArray = this.form.get(groupOption.nameVariation) as FormArray;

    checkboxes.forEach((checkbox) => {
      const formControl = this.formBuilder.control(false);
      formArray.push(formControl);
    });
    this.handleCheckboxChange(groupOption);
  }

  setQuantity(number: number) {
    if (number === 1) {
      this.quantity++;
    } else {
      if (this.quantity > 1) {
        this.quantity--;
      }
    }

    this.form.controls['quantity'].setValue(this.quantity);
  }

  handleCheckboxChange(groupOption: OptionProduct) {
    const formArray = this.form.get(groupOption.nameVariation) as FormArray;
    const selectedCount = formArray.controls.filter(
      (control) => control.value === true
    ).length;

    if (!groupOption.max && !groupOption.min) return;

    if (selectedCount < groupOption.min) {
      this.countOptions[groupOption.nameVariation] = false;
      formArray.controls.forEach((control: any) => {
        control.enable();
      });
    } else if (
      selectedCount >= groupOption.min ||
      selectedCount <= groupOption.max
    ) {
      this.countOptions[groupOption.nameVariation] = true;
      formArray.controls.forEach((control: any) => {
        control.enable();
      });
    } else {
      this.countOptions[groupOption.nameVariation] = false;
      formArray.controls.forEach((control) => control.enable());
    }

    if (groupOption.max && selectedCount === groupOption.max) {
      formArray.controls.forEach((control: any, index: number) => {
        if (!control.value) control.disable();
      });
    }
  }

  calcSubtotal(array: any[]) {
    const subtotal: number[] = [0];
    const multiples: number[] = [0];
    const typePrice1 = array.findIndex((e) => e.typePrice === 1);
    console.log(typePrice1);
    
    array.forEach((e) => {
      if (e.multipleOptions) {
        e.multipleOptions.forEach((j: any) => {
          multiples.push(j.price);
        });
        console.log(multiples);
      } else {
        subtotal.push(e.price);
      }
    });

    console.log(subtotal);

    if (typePrice1 !== -1) {
      const calc =
      subtotal.reduce((act, prev) => act + prev) +
      multiples.reduce((act, prev) => act + prev);
      return calc;    
    }else{

      return this.product.price + subtotal.reduce((act, prev) => act + prev) + multiples.reduce((act, prev) => act + prev);
    }

  }
}
