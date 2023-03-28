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
  localName?: string|null;
  local?:Local
  stateMenu:boolean = false

  constructor(public theme:ThemesService, public routeData:RouteDataService, private localService:LocalDataService){
  }

  ngOnInit(): void {
    
    this.localName = this.routeData.getOrigin()
    
    this.localService.local.subscribe((data)=>{
      this.local = data
    })
    
    
  }


  toogleMenu(){
    this.stateMenu = !this.stateMenu

  }


}
