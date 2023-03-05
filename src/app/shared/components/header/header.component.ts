import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public theme:ThemesService, public routeData:RouteDataService, private route:ActivatedRoute){
    

  }

  ngOnInit(): void {
    this.theme.setTheme(1)
    console.log(this.route.snapshot);
    
    
    
 
    
    
  }

  public isRoute(route: string) {

  }


}
