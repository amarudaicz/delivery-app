import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Local } from 'src/app/interfaces/local-interface';
import { ProductCart } from 'src/app/interfaces/product-interface';
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
  
  countitemsCart:any
  local?:Local
  currentRoute?:string 
  totalCart?:number

  constructor(public theme:ThemesService, private cartService:CartService,public routeService:RouteDataService, private localData:LocalDataService, public layoutState:LayoutStateService){

  }

  ngOnInit(){
    this.cartService.getCartItems().subscribe((items:ProductCart[]) =>{
      if (!items.length) {
        this.totalCart = 0
        return
      }

      this.totalCart = items.map(p => p.total * p.quantity).reduce((prev, curr)=> prev+curr)
      this.countitemsCart = items.length
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

  // @HostListener('window:scroll', [])
  // onScroll(): void {
  //   console.log('scrol');
    
  //   const currentPos = window.pageYOffset || window.scrollY;
  //   if (currentPos === 0) {
  //     // Haga cualquier otra acción deseada aquí
  //     this.stateMenu=false
  //   }else{
  //     this.stateMenu=true
  //   }
  //   this.prevPos = currentPos;
  // }



  
  setNavigation(location:string){
  

  }



}
