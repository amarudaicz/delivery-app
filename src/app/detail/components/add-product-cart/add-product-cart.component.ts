import { Location } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
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
  subtotal?:number;
  total: number = 0;
  options: any[] = [];
  currentCart?:any
  @Input() modePreview:boolean=false

  constructor(
    public theme: ThemesService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private toastr:ToastrService,
    private location:Location,
  ) {
    this.form = this.formBuilder.group({
      especifications: [''],
      quantity: [1, [Validators.required, Validators.min(1)]],
    });



  }

  ngOnInit(): void {


    this.product.variations?.forEach(e => {
      console.log(e);
      this.form.addControl(e.nameVariation, this.formBuilder.control(null , e.required ? Validators.required : null));
      if (e.required && e.typePrice !== 1){
        this.saveOptions(e.options[0], e)
        this.form.get(e.nameVariation)?.setValue(e.options[0].nameOption)
        console.log(this.options); 
      }

    });

    this.cartService.getCartItems().subscribe(data => this.currentCart = data)


    if(this.product.variations){
      this.subtotal = this.product.price
    }

  }

  saveOrder() {
    const {name, id:idProduct, image:productImage, category_name, price:productPrice} = this.product
    console.log(this.options);
    
    if (this.options.length !== 0) {
      const _type1Index = this.options.findIndex(e => e.typePrice === 1)
      const _type1Object = this.options.splice(_type1Index, 1)[0]
      this.options.unshift(_type1Object) 
    }
    
    if (this.form.valid) {
      this.stateButton = false;
      const item = { name, productImage, productPrice, category_name, idProduct, ...this.form.value, userOptions:this.options, total: this.subtotal ? this.subtotal : this.product.price };
      
      setTimeout(() => {
        this.cartService.addToCart(item);
        this.stateButton = true;
        this.location.back()

      }, 2000);
    }else{ 
      this.toastr.error('Completar todos los campos')
    }
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

  saveOptions(option: DetailsOptions, optionGroup: OptionProduct) {
    console.log(this.form);
    console.log(this.options);
    
    const index = this.options?.findIndex(
      (o) => o.nameVariation === optionGroup.nameVariation
    );
    const indexMultiple = this.options?.findIndex(
      (o) => o.nameVariation === optionGroup.nameVariation );
    console.log(indexMultiple);

    if (optionGroup.multiple) {
      if (indexMultiple !== -1) {

        const subIndex = this.options[indexMultiple].multipleOptions.findIndex((l:any) => l.nameOption === option.nameOption)
        
        if (subIndex !== -1) {
          this.options[indexMultiple].multipleOptions.splice(subIndex, 1)
          if (this.options[indexMultiple].multipleOptions.length === 0) {
            this.options.splice(indexMultiple, 1)
          }
        }else{
          this.options[indexMultiple].multipleOptions.push({...option})
        }

      }else{
        this.options.push({nameVariation:optionGroup.nameVariation, multipleOptions:[{...option}], multiple:true })
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
    const subtotal:number[] = []
    const multiples:number[] = []

    if (array.length !== 0){

      array.forEach(e=>{
        if (!e.multiple) {
          subtotal.push(e.price)
        }
        
        if (e.multipleOptions) {
          e.multipleOptions.forEach((j:any) =>{
              multiples.push(j.price)
          })  
        }
      })


      console.log(multiples);
      console.log(subtotal);

      if (subtotal.length !== 0 && multiples.length !== 0) {
        const calc = (subtotal.reduce((act,prev)=> act+prev) + multiples.reduce((act,prev)=> act+prev))
        return calc
        
      }else if (subtotal.length !== 0) {
        const calc = subtotal.reduce((act,prev)=> act+prev)
        return calc
      }
      

      
    }

    return 0
  }
  

 


}


