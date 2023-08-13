import { HttpClient } from '@angular/common/http';
import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product-interface';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.scss']
})
export class ProductsByCategoryComponent implements OnInit {
  constructor(public theme:ThemesService, private localService:LocalDataService, private route:Router, private routeService:RouteDataService){


  } 

  ngOnInit(): void {
   
    
    
  }


  backHome(){
    this.route.navigate([this.routeService.getOrigin()])
  }


  @Input() products?:Product[]


}
