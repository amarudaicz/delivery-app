import { Component, OnInit } from '@angular/core';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.scss']
})
export class MainCategoryComponent implements OnInit {
  constructor(public theme:ThemesService, private routeService:RouteDataService){

  }

  ngOnInit(): void {
    this.routeService.setCurrent('categories');
    
  }



}
