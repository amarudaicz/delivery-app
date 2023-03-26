import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>([]);


  constructor() {
    this.reset()
    
    
  }

  reset(){
    const items = localStorage.getItem('cartItems');
    if (items) {
      this.cartItems = JSON.parse(items);
      this.cartSubject.next(this.cartItems);
    }
  }

  addToCart(item: any): void {
    
    let lastId;
    console.log(item);
    console.log(this.cartItems);
    

    const index = this.cartItems.findIndex((i) => i.idProduct === item.idProduct && this.compareArrays(i.userOptions, item.userOptions));
    console.log(index);
    
    if (this.cartItems.length === 0) {
      lastId = 1;
    } else {
      lastId = this.cartItems[this.cartItems.length - 1].idCart + 1;
    }
    item.idCart = lastId

    
    if (index !== -1) {
      console.log('aumentando quanity');
      this.cartItems[index].quantity += item.quantity
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));  
    }else{
      this.cartItems.push(item);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }    
    
    this.reset()    
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

  clearCart(){
    this.cartItems.length=0
    this.cartSubject.next(this.cartItems);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));

  }



  compareArrays(array1:any[], array2:any[]) {
    console.log(array1);
    console.log(array2);
    
    if (array1.length !== array2.length) {
      return false;
    }
    
    for (let i = 0; i < array1.length; i++) {
      let found = false;
      
      for (let j = 0; j < array2.length; j++) {
        if (JSON.stringify(array1[i]) === JSON.stringify(array2[j])) {
          found = true;
          break;
        }
      }
      
      if (!found) {
        return false;
      }
    }
    
    return true;
  }
}
