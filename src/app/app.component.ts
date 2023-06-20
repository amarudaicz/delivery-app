import { ApplicationRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ChildrenOutletContexts, Params } from '@angular/router';
import { fadeIn } from './animations/main-detail-animations';
import { routeAnimations } from './animations/transition-route';
import { LocalDataService } from './services/localData/local-data.service';
import { RouteDataService } from './services/routeData/route-data-service.service';
import { ThemesService } from './services/themes/themes.service';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { PwaInstallerService } from './services/pwa-installer/pwa-installer.service';

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
    private themeService:ThemesService,
    private appRef:ApplicationRef,
    private update:SwUpdate,
    private pwa:PwaInstallerService
  ){
    this.pwa.checkForUpdates()

  }

  ngOnInit(): void {
    
    this.themeService.getThemeState().subscribe((state)=>{
      this.themeLoad = state
    })
    
    
    
    
  }

  getRouteData() {
    const route =  this.contexts.getContext('primary')?.route?.snapshot?.data?.['page'];
    
    // return route
  }


  checkUpdate() {
    this.appRef.isStable.subscribe((isStable) => {
      if (isStable) {
        const timeInterval = interval(8 * 60 * 60 * 1000);

        timeInterval.subscribe(() => {
          this.update.checkForUpdate().then(() => console.log('checked'));
          console.log('update checked');
        });
      }
    });
  }
    

}
