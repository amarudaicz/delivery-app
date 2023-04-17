import { Component, HostListener, OnInit } from '@angular/core';
import { ActivationStart, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { headerIn } from 'src/app/animations/haeder-animations';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { Local } from 'src/app/interfaces/local-interface';
import { LayoutStateService } from 'src/app/services/layoutState/layout-state.service';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations:[
    fadeIn,
    headerIn
  ]
})

export class HeaderComponent implements OnInit {
  local?:Local

  stateMenu:boolean = false
  stateHeader:boolean = true
  dataMenu:any[]=[
    {
      name:'Inicio',
      icon:'fa-solid fa-house'
    },
    {
      name:'Informacion',
      icon:'pi pi-info-circle'
    },
    {
      name:'Ubicacion',
      icon:'fa-solid fa-location-dot'
    },
    {
      name:'Instagram',
      icon:'pi pi-instagram'
    }
  ]
  state:any
  fixed:boolean = false
  scrollPos:number = 0

  constructor(
    public theme:ThemesService, 
    public routeData:RouteDataService, 
    private localService:LocalDataService,
    public layoutState:LayoutStateService,
    private router:Router
    ){
      
    }
    
  ngOnInit(): void {
    this.layoutState.stateSubject.subscribe((state)=>{
      console.log(state);
      this.state = state
    })
      
    
  }


  toogleMenu(){
    this.stateMenu = !this.stateMenu
    if (document.body.style.overflow === 'hidden') {
      document.body.style.overflow = ''
    }else{
      document.body.style.overflow = 'hidden'
    }
  }

  @HostListener('window:scroll', [])
  onScroll(): void {
    const currentPos = window.pageYOffset || window.scrollY;
    console.log(currentPos)
    if (currentPos === 0) {
      this.fixed=false
      document.body.style.padding = '0'
    }else{
      this.fixed=true
      document.body.style.padding = '64px 0 0 0'

    }
    
    this.scrollPos = currentPos;
  }


}
