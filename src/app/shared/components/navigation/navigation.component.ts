import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Local } from 'src/app/interfaces/local-interface';
import { CartService } from 'src/app/services/cartData/cart.service';
import { LayoutStateService } from 'src/app/services/layoutState/layout-state.service';
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
  currentRoute?:string 

  constructor(public theme:ThemesService, private cartService:CartService,public routeService:RouteDataService, private localData:LocalDataService, public layoutState:LayoutStateService){

  }

  ngOnInit(){
    this.cartService.getCartItems().subscribe((items:any[]) =>{
        console.log(items);
        
      this.itemsCart = items.length
    })
    
    this.localData.local$.subscribe((local)=>{
      console.log(local);
      
      this.local = local
    })

    this.routeService.getCurrent().subscribe(current=>{
      this.currentRoute = current

    })
  }

  private prevPos = 0;
  stateMenu:boolean = false

  @HostListener('window:scroll', [])
  onScroll(): void {
    const currentPos = window.pageYOffset || window.scrollY;
    if (currentPos === 0) {
      // Haga cualquier otra acción deseada aquí
      this.stateMenu=false
    }else{
      this.stateMenu=true
    }
    this.prevPos = currentPos;
  }



  
  setNavigation(location:string){
  

  }



}
