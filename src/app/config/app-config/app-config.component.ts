import { Q } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import { ActivatedRoute, ActivationEnd, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Local } from 'src/app/interfaces/local-interface';
import { AdminService } from 'src/app/services/admin/admin.service';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-app-config',
  templateUrl: './app-config.component.html',
  styleUrls: ['./app-config.component.scss']
})
export class AppConfigComponent {
  
  localName?: string|null;

  constructor(public theme:ThemesService, public routeData:RouteDataService, private localService:LocalDataService, private router:Router, private adminService:AdminService){
    router.events.subscribe(event => {
      if (event instanceof NavigationStart && event.id === 1) {
        const local = event.url.split('/')[1]
        console.log(local);

        const origin = this.routeData.getOrigin()

        if (local === 'admin') {
          return
        }
        
        if (local && local !== 'user' && local !== 'cart' && local !== ''){
          // this.localService.initDataLocal(local)
        }else if (origin){
          // this.localService.initDataLocal(this.routeData.getOrigin())
        }else{
          this.router.navigate(['/'])
        }


      }

      
    });
  }

  ngOnInit(): void {
    this.adminService.getCategories()
  }

}
