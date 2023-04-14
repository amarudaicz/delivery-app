import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ChildrenOutletContexts, Params } from '@angular/router';
import { fadeIn } from './animations/main-detail-animations';
import { routeAnimations } from './animations/transition-route';
import { LocalDataService } from './services/localData/local-data.service';
import { RouteDataService } from './services/routeData/route-data-service.service';
import { ThemesService } from './services/themes/themes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations, fadeIn ],
})
export class AppComponent implements OnInit {

  themeLoad:boolean=false
  
  constructor(
    private contexts: ChildrenOutletContexts,
    private routeService: RouteDataService,
    private themeService:ThemesService
    ){}

  ngOnInit(): void {
    
    this.themeService.getThemeState().subscribe((state)=>{
      this.themeLoad = state
    })
    
    
    
    
  }

  getRouteData() {
    const route =  this.contexts.getContext('primary')?.route?.snapshot?.data?.['page'];

    // if (route === 'home') {
    //   const local =  this.contexts.getContext('primary')?.route?.snapshot?.params['local'];
    //   this.routeService.setOrigin(local);
    // }

  }
    

}
