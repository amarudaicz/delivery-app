import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  private cartItems: any[] = [];

  private cartSubject = new BehaviorSubject<any[]>([]);

  constructor() {
    const items = localStorage.getItem('cartItems');
    if (items) {
      this.cartItems = JSON.parse(items);
      this.cartSubject.next(this.cartItems);
    }
  }

  addToCart(item: any): void {
    const index = this.cartItems.findIndex((i) => i.id === item.id);
    if (index !== -1) {
      this.cartItems[index].quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
    
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    this.cartSubject.next(this.cartItems);
  }

  removeFromCart(id: any): void {
    const index = this.cartItems.findIndex((i) => i.id === id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      // localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this.cartSubject.next(this.cartItems);
    }

  }

  getCartItems(): BehaviorSubject<any[]> {
    return this.cartSubject;
  }


  updateQuantity(id:number, number:number){
    const index = this.cartItems.findIndex((i) => i.id === id);
    if (index !== -1) {
      this.cartItems[index].quantity += number
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this.cartSubject.next(this.cartItems);
    }
    console.log(this.cartItems);
    

  }

}
