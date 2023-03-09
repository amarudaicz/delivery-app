import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations:[
    fadeIn
  ]
})
export class HeaderComponent implements OnInit {
  localName: any;
  local:any
  constructor(public theme:ThemesService, public routeData:RouteDataService, private localData:LocalDataService){
  }

  ngOnInit(): void {
    
    this.localName = this.routeData.getOrigin()
    
    this.localData.getLocal(this.localName).subscribe((data:any)=>{
      // this.local = data
      console.log(data);

      setTimeout(() => {
        
        this.local = data
        this.localData.nextLocal(data)
      }, 3000);

      this.theme.setTheme(1)//this.local.theme

    })
    
  }


}
