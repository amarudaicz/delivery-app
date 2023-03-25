import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { addItemCart, fadeIn } from 'src/app/animations/main-detail-animations';
import {DetailsOptions,OptionProduct,} from 'src/app/interfaces/optionProduct-interface';
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
  form: FormGroup;
  quantity: number = 1;
  shakeError: string = '';
  stateButton: boolean = true;
  subtotal: number = 0;
  total: number = 0;
  options: any[] = [];

  constructor(
    public theme: ThemesService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private toastr:ToastrService
  ) {
    this.form = this.formBuilder.group({
      especifications: [''],
      quantity: [1, [Validators.required, Validators.min(1)]],
      userOptions:this.formBuilder.array([]),
    });



  }

  ngOnInit(): void {

    this.subtotal = this.product.variations.filter(e => e.typePrice === 1)[0].options[0].price


    
    this.form.valueChanges.subscribe(c => {

    })
    
    this.product.variations.forEach(e => {
      this.form.addControl(e.nameVariation, this.formBuilder.control('', e.required ? Validators.required : null));
      this.form.get(e.nameVariation)?.setValue(e.options[0].nameOption)
    });

    this.setInitialOptions()

  }

  saveOrder() {
    const item = { ...this.product, ...this.form.value, userOptions:this.options, total:this.subtotal };
    
    if (this.form.valid) {
      this.stateButton = false;
      setTimeout(() => {
        this.cartService.addToCart(item);
        this.stateButton = true;
      }, 1000);
    }else{
      
      this.toastr.error('Completar todos los campos')
    }
  }


  setInitialOptions(){
    const type1 = this.product.variations.filter(e => e.typePrice === 1)[0]
    this.options.push({...type1, ...type1.options[0]})
    
    
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
    this.subtotal = this.calcSubtotal(this.options)

  }

  saveOptions(option: DetailsOptions, optionGroup: OptionProduct) {
    const index = this.options?.findIndex(
      (o) => o.nameVariation === optionGroup.nameVariation
    );
    const indexMultiple = this.options?.findIndex(
      (o) => o.nameVariation === optionGroup.nameVariation && o.nameOption === option.nameOption
    );

    if (optionGroup.multiple) {
      if (indexMultiple !== -1) {
        this.options?.splice(indexMultiple, 1);
      }else{
        this.options?.push({ ...option, ...optionGroup });
      }

      this.subtotal = this.calcSubtotal(this.options)
      return;
    }

    if (index !== -1) {
      this.options?.splice(index, 1);
    }

    this.options?.push({ ...option, ...optionGroup });

    if (this.options.find((e) => e.typePrice === 1)) {
      this.total = this.options.filter((e) => e.typePrice === 1)[0].price;
    }
    
    this.subtotal = this.calcSubtotal(this.options)
  }


  calcSubtotal(array:any[]){
    console.log(array);
    
    if (array.length!==0){
      const calc = array.map(e => e.price).reduce((p, a)=> p + a)
      return calc * this.form.get('quantity')?.value
    }

    return 0
  }



}


