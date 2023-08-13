import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public cartItems: any[] = [];
  public cartSubject = new ReplaySubject<any[]>(1);


  constructor() {
    this.reset()
    // interval(3000).subscribe(i=>{
    //   this.cartSubject.next(this.cartItems)
    // })
  }

  reset(){
    const items = localStorage.getItem('cartItems');
    console.log(items);
    
    if (items) {
      this.cartItems = JSON.parse(items);
      this.cartSubject.next(this.cartItems);
    }
  }
 
  addToCart(item: any): void {
    
    console.log(this.cartItems);
    
    let lastId;

    const index = this.cartItems.findIndex((i) => i.idProduct === item.idProduct && this.compareArrays(i.userOptions, item.userOptions));
    
    if (this.cartItems.length === 0) {
      lastId = 1;
    } else {
      lastId = this.cartItems[this.cartItems.length - 1].idCart + 1;
    }

    item.idCart = lastId
    console.log(index);


    if (index !== -1) {
      this.cartItems[index].quantity += item.quantity
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }else{
      this.cartItems.push(item);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }

    console.log(this.cartItems);
    this.cartSubject.next(this.cartItems)
  }



  removeFromCart(id: any): void {
    const index = this.cartItems.findIndex((i) => i.idCart === id);

    if (index !== -1) {
      this.cartItems.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this.cartSubject.next(this.cartItems);
    }

  }

  getCartItems(): ReplaySubject<any[]> {
    console.log(this.cartSubject);
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
    this.cartItems = []
    console.log(this.cartItems);
    
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
