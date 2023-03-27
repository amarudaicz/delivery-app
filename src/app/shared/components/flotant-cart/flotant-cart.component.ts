import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cartData/cart.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-flotant-cart',
  templateUrl: './flotant-cart.component.html',
  styleUrls: ['./flotant-cart.component.scss']
})
export class FlotantCartComponent implements OnInit {
  public cartItems:any[]=[]
  
  
  constructor(private cartService: CartService , public theme:ThemesService){

  }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(data =>{
      this.cartItems = data
    })
    
  }

}
