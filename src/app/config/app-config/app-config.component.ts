import { Component } from '@angular/core';
import { Local } from 'src/app/interfaces/local-interface';
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
  constructor(public theme:ThemesService, public routeData:RouteDataService, private localService:LocalDataService){

  }

  ngOnInit(): void {
    
    this.localName = this.routeData.getOrigin()
    this.theme.setTheme(1)//this.local.theme
    this.localService.setProducts(this.localName)
    this.localService.setLocal(this.localName)
    
    

  }

}
