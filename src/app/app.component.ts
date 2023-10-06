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
import { LayoutStateService } from './services/layoutState/layout-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeAnimations, fadeIn ],
})

export class AppComponent implements OnInit {

  themeLoad:boolean=false
  route:string = ''
  
  constructor(
    private contexts: ChildrenOutletContexts,
    private routeService: RouteDataService,
    private themeService:ThemesService,
    private appRef:ApplicationRef,
    private update:SwUpdate,
    private pwa:PwaInstallerService,
    public stateLayout:LayoutStateService,
  ){
    this.pwa.checkForUpdates()

  }

  ngOnInit(): void {
    
    this.themeService.getThemeState().subscribe((state)=>{
      this.themeLoad = state
    })
    this.routeService.current.subscribe(current=>{
      this.route = current 
    })


    console.log(this.routeService.getCurrent());
    
  }

  // routeClass(){

  //   console.log(this.route);
    
  //   switch (this.route) {
  //     case 'admin':
  //       return false
  //       break;
    
  //     case 'login':
  //       return false
  //     break;

  //     case 'landing':
  //       return false
  //     break;

  //     default:
  //       return true
  //       break;
  //   }
  // }


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

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
    

}
