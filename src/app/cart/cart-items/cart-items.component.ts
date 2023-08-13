import { Component, OnDestroy } from '@angular/core';
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
  constructor(public cartService: CartService, public theme: ThemesService, public routeService:RouteDataService) {
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
    this.cartService.removeFromCart(id)
    console.log(this.subtotal);
    
  
  }

  setQuantity(id: number, number: number, currentValue: any) {
    console.log(id);
    
    if (number === 1) {
      this.cartService.updateQuantity(id, number);
    } else {
      if (Number(currentValue) > 1) {
        this.cartService.updateQuantity(id, number);
      }
    }
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
}