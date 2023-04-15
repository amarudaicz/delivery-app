import { Component, HostListener, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Local } from 'src/app/interfaces/local-interface';
import { CartService } from 'src/app/services/cartData/cart.service';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  
  itemsCart:any
  local?:Local

  constructor(public theme:ThemesService, private cartService:CartService,public routeService:RouteDataService, private localData:LocalDataService){

  }

  ngOnInit(){
    this.cartService.getCartItems().subscribe((items:any[]) =>{
      this.itemsCart = items.length
    })
    
    this.localData.local.subscribe((local)=>{
      this.local = local

    })
    console.log(this.itemsCart);

  }

  private prevPos = 0;
  scrollDown:boolean = false

  @HostListener('window:scroll', [])
  onScroll(): void {
    const currentPos = window.pageYOffset || window.scrollY;
    if (currentPos > this.prevPos) {
      console.log('Scroll hacia abajo detectado');
      // Haga cualquier otra acción deseada aquí
      this.scrollDown=true
    }else{
      this.scrollDown=false
    }
    
    this.prevPos = currentPos;
  }



  
  setNavigation(location:string){
  

  }

}
