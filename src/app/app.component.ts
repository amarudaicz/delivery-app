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
    private routeService: RouteDataService,
    ){}

  ngOnInit(): void {
    
    
    
    
  }

  local:any
  localName:any

  getRouteData() {
    const route =  this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];

    if (route === 'home') {
      const local =  this.contexts.getContext('primary')?.route?.snapshot?.params['local'];
      this.routeService.setOrigin(local);
    }

  }
    

}
