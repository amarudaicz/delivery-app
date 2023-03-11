import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ChildrenOutletContexts, Params } from '@angular/router';
import { routeAnimations } from './animations/transition-route';
import { LocalDataService } from './services/localData/local-data.service';
import { RouteDataService } from './services/routeData/route-data-service.service';
import { ThemesService } from './services/themes/themes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations],
})
export class AppComponent implements OnInit {
  title = 'app-delivery-ng';

  constructor(
    private contexts: ChildrenOutletContexts,
    public theme: ThemesService,
    private routeService: RouteDataService,
    private localService:LocalDataService
    ){}

  ngOnInit(): void {
    
    
    
    
  }

  local:any
  localName:any

  setLocalNavigation(){
    
    this.localName = this.routeService.getOrigin()

    if (!this.localName) {
      location.replace('/#/landing')
    }
 
  }




  
  getRouteData() {
    this.setLocalNavigation()
    const route =  this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
    
    if (route === 'home') {
      const local =  this.contexts.getContext('primary')?.route?.snapshot?.params['local'];
      this.routeService.setOrigin(local);
    }

  }
    

}
