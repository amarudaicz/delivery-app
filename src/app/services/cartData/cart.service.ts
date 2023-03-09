import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
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
    let lastId;
    let product = this.cartItems.find(p => p.id === item.id && p.options === item.options)

    if (this.cartItems.length === 0) {
      lastId = 1;
    } else {
      lastId = this.cartItems[this.cartItems.length - 1].idCart + 1;
    }
    item.idCart = lastId

    
    const index = this.cartItems.findIndex((i) => i.id === item.id && i.options === item.options );
    
    if (index === -1) {
      this.cartItems.push(item);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this.cartSubject.next(this.cartItems);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));    
      return
    }
    
    console.log(index);
    if(product){
      console.log('aumentando quanity');
      this.cartItems[index].quantity += item.quantity
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));    
      return
    }

  }



  removeFromCart(id: any): void {
    const index = this.cartItems.findIndex((i) => i.idCart === id);

    if (index !== -1) {
      this.cartItems.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this.cartSubject.next(this.cartItems);
    }

  }

  getCartItems(): BehaviorSubject<any[]> {
    return this.cartSubject;
  }

  updateQuantity(id: number, number: number) {
    const index = this.cartItems.findIndex((i) => i.idCart === id);
    if (index !== -1) {
      this.cartItems[index].quantity += number;
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this.cartSubject.next(this.cartItems);
    }
  }
}
