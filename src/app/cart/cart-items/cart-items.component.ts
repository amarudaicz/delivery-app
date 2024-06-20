import { Location } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Navigation } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { ItemCart } from 'src/app/interfaces/itemCart-interfaz';
import { Product } from 'src/app/interfaces/product-interface';
import { CartService } from 'src/app/services/cartData/cart.service';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';
import { deleteRepeatElement } from 'src/app/utils/deleteRepeatElement';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss'],
  animations:[
    fadeIn
  ]
})
export class CartItemsComponent implements OnDestroy {
  subtotal = 0;
  itemsCart:any[]=[]
  items$?:Subscription
  constructor(
    public cartService: CartService, 
    public theme: ThemesService, 
    public routeService:RouteDataService,
    public location:Location,
    private toast:MatSnackBar) {
  }


  ngOnInit(): void {
    this.routeService.setCurrent('cart')
    this.items$ = this.cartService.getCartItems().subscribe((items) => {
      console.log(items);
      this.itemsCart = items
      
      if (items.length === 0) {
        this.subtotal = 0
        return
      }
      
      this.subtotal = items.map(e => e.total*e.quantity).reduce((prev, act)=>prev + act)
      
    });
  }

  clearCart() {
    this.subtotal = 0;
    this.cartService.clearCart()
  }


  // This method removes a product from the cart and updates the subtotal
  removeProduct(id: number) {

    const product = this.itemsCart.find(i => i.idCart === id)

    console.log(product);
    
    const refAlert = this.toast.open(`Quiere eliminar el producto ${product.name}?`, 'Eliminar', {duration:3000})

    refAlert.onAction().subscribe(accept=>{
      this.cartService.removeFromCart(id)
      console.log(this.subtotal);
    })
  }

  setQuantity(id: number, number: any, currentValue: any) {
    console.log(number.target?.value, typeof(number.target?.value));

    if (Number(currentValue) === 1 && number < 1 || Number(number.target?.value) < 1) {
      this.removeProduct(id)
      return
    }

    if (number.target?.value) {
      this.cartService.updateQuantity(id, Number(number.target.value));
      return
    }

    console.log(currentValue, number);
    
    number = this.itemsCart.find(i=>i.idCart === id).quantity + number
    this.cartService.updateQuantity(id, number);
  }


  ngOnDestroy(): void {
    console.log('------------------------------');
    console.log('------------------------------');
    console.log('DESTROY');
    console.log('------------------------------');
    console.log('------------------------------');
    
    if (this.items$) {
      this.items$?.unsubscribe()
    }
  }

  parseInt(a:string){
    return parseInt(a)
  } 
}