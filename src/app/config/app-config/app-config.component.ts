import { Q } from '@angular/cdk/keycodes';
import { Component } from '@angular/core';
import {
  ActivatedRoute,
  ActivationEnd,
  NavigationEnd,
  NavigationStart,
  Router,
} from '@angular/router';
import { Local } from 'src/app/interfaces/local-interface';
import { AdminService } from 'src/app/services/admin/admin.service';
import { CartService } from 'src/app/services/cartData/cart.service';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { RecentsService } from 'src/app/services/recents/recents.service';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-app-config',
  templateUrl: './app-config.component.html',
  styleUrls: ['./app-config.component.scss'],
})
export class AppConfigComponent {
  localName?: string | null;

  constructor(
    public theme: ThemesService,
    public routeData: RouteDataService,
    private localService: LocalDataService,
    private router: Router,
    private adminService: AdminService,
    private recentsService:RecentsService,
    private cartService:CartService
  ) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart && event.id === 1) {

        const local = this.cleanUrl(event.url.split('/')[1])
        const origin = this.routeData.getOrigin();
        
        const raizRoutes= [ '/', '', ' ',]
        const setInRoutes = ['user', 'cart']
        const returnInRoutes = ['admin', '/', '', ' ', 'terminos-y-condiciones', 'politicas-de-privacidad', 'recientes', 'login', 'register', 'history']
        console.log(local);


        if (raizRoutes.includes(local) && local !== 'skip-recents') {
          this.checkRecents()
          return;
        }

        if (returnInRoutes.includes(local)) {
          return;
        }

        if (setInRoutes.includes(local) && origin) {
          this.localService.initDataLocal(origin)
          return
        }

        if (!setInRoutes.includes(local)) {
          this.localService.initDataLocal(local)
          return
        }

        if (local === 'recientes') {
          this.recentsService.getRecents()
          return
        }
        
        this.router.navigate(['/']);

      }
    });
  }

  cleanUrl(url:string):string{
    let clean = url
    if (url.includes('#')) {
      clean = url.split('#')[0]      
    }


    return clean
  }

  ngOnInit(): void {
    // this.adminService.getCategories();
  }



  checkRecents(){

    const recentsIds = this.recentsService.getLsRecents()
    console.log(recentsIds);
    

    if (recentsIds && recentsIds.length && recentsIds.filter(i=> i !== 10).length){
      this.router.navigate(['recientes'])
    }


  }
}
