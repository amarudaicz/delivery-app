import { Component } from '@angular/core';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { CartService } from 'src/app/services/cartData/cart.service';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss'],
  animations:[
    fadeIn
  ]
})
export class CartItemsComponent {
  products: any[] = []; // products will be stored as an array of objects
  subtotal = 0;

  constructor(private cartService: CartService, public theme: ThemesService, public routeService:RouteDataService) {}

  ngOnInit(): void {
    this.routeService.setCurrent('cart')
    
    this.cartService.getCartItems().subscribe((items: any[]) => {
      this.products = items;      
      if (items.length === 0){
        this.subtotal = 0
        return
      }
      
      this.subtotal = items.map(e => e.price*e.quantity).reduce((prev, act)=>prev + act)
    });
  }

  clearCart() {
    this.products = [];
    this.subtotal = 0;
  }

  checkout() {
    // TODO: Implement checkout functionality
  }

  // This method removes a product from the cart and updates the subtotal
  removeProduct(id: number) {
    this.cartService.removeFromCart(id)
    console.log(this.subtotal);
    
  
  }

  setQuantity(id: number, number: number, currentValue: any) {
    if (number === 1) {
      this.cartService.updateQuantity(id, number);
    } else {
      if (Number(currentValue) > 1) {
        this.cartService.updateQuantity(id, number);
      }
    }
  }

}
