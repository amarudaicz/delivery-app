import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { Local } from 'src/app/interfaces/local-interface';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations:[
    fadeIn
  ]
})
export class HeaderComponent implements OnInit {
  local?:Local

  stateMenu:boolean = false
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

  constructor(public theme:ThemesService, public routeData:RouteDataService, private localService:LocalDataService){
  }

  ngOnInit(): void {
    
    
    this.localService.local.subscribe((data)=>{
      
      this.local = data
      console.log(this.local);
    })
    
    console.log(this.local);

    
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
