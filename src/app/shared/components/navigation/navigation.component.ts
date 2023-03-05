import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cartData/cart.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(public theme:ThemesService, private cartService:CartService){

  }

  ngOnInit(){
    this.cartService.getCartItems().subscribe((items:any[]) =>{
      this.itemsCart = items.length
    })
    
    console.log(this.itemsCart);

  }


  location:string = 'home'

  itemsCart:any

  
  setNavigation(location:string){
  

  }

}
