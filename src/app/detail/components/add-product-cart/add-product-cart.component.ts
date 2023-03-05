import { Component, Input, OnInit, OnChanges,ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { addItemCart, fadeIn } from 'src/app/animations/main-detail-animations';
import { CartService } from 'src/app/services/cartData/cart.service';
import { ThemesService } from 'src/app/services/themes/themes.service';


@Component({
  selector: 'app-add-product-cart',
  templateUrl: './add-product-cart.component.html',
  styleUrls: ['./add-product-cart.component.scss'],
  changeDetection:ChangeDetectionStrategy.Default,
  animations:[
    addItemCart,
    fadeIn
  ]
})
export class AddProductCartComponent implements OnInit {

  constructor(public theme:ThemesService, private FormBuilder:FormBuilder, private cartService:CartService){

    this.form = this.FormBuilder.group({
      options:['', Validators.required],
      especifications:[''],
      quantity:[1, [Validators.required, Validators.min(1)]]
    })

    this.cartService.getCartItems().subscribe((items:any)=>{
      this.itemsCart = items
    })

  }

  ngOnInit(): void {

  }

  @Input() product:any
  
  
  form:FormGroup
  quantity:number = 1
  shakeError:string = ''
  itemsCart:any
  stateButton:boolean=true

  saveOrder(){
    this.setError()
    const item = {...this.product, ...this.form.value}
    
    if (this.form.valid) {
      this.stateButton=false
      setTimeout(() =>{
        this.cartService.addToCart(item);
        this.stateButton=true
      } , 1000);
    }  

    
  }

  setError(){
    if (this.form.controls['options'].invalid){
      this.shakeError = 'shake'
      setTimeout(() => {this.shakeError = ''}, 500);  
    }

    this.form.markAsTouched()
    
  }
  
  setQuantity(number:number){

    if (number === 1) {
      this.quantity++;
    } else {
      if (this.quantity > 1) {
        this.quantity--;
      }
    }
    
    this.form.controls['quantity'].setValue(this.quantity)

  }






      



  

}
