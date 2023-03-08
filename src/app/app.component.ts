import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ChildrenOutletContexts, Params } from '@angular/router';
import { routeAnimations } from './animations/transition-route';
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
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {
    
    
    
    
  }

  local:any


  setLocalNavigation(){
 
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
