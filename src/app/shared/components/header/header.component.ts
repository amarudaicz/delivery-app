import { Component, OnInit } from '@angular/core';
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

  constructor(
    public theme:ThemesService, 
    public routeData:RouteDataService, 
    private localService:LocalDataService,
    public layoutState:LayoutStateService,
    private router:Router
    ){
      
    }
    
    ngOnInit(): void {
      
    
      this.router.events.subscribe((event) => {
        if (event instanceof ActivationStart) {
            const page = event.snapshot.data['page'] 
            if (page === 'detail' || page ==='admin') {
              this.stateHeader = false 
            }else{
              this.stateHeader = true
            } 
          // Realizar alguna acción cuando se navega a una nueva página
        }
      });
      console.log(this.stateHeader);

    
  }


  toogleMenu(){
    this.stateMenu = !this.stateMenu
    if (document.body.style.overflow === 'hidden') {
      document.body.style.overflow = ''
    }else{
      document.body.style.overflow = 'hidden'
    }
  }


}
