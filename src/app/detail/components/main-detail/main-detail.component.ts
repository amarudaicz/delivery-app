import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { Product } from 'src/app/interfaces/product-interface';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-main-detail',
  templateUrl: './main-detail.component.html',
  styleUrls: ['./main-detail.component.scss'],
  animations: [
    fadeIn
  ]
})
export class MainDetailComponent implements OnInit {
  constructor(
    public theme: ThemesService,
    private route: ActivatedRoute,
    private routeService:RouteDataService,
    private localService:LocalDataService
  ) {}
  ngOnInit(): void {
    
    const idProduct = this.route.snapshot.queryParams['id']
    this.routeService.setCurrent('detail');
    console.log(this.routeService.getCurrent());
    
    console.log(this.route.snapshot.queryParams);
    this.localService.getProducts().subscribe(data =>{
      console.log(data);
      
      this.product = data.filter(e => e.id === idProduct)[0]
    })
      
  
    
  }

  product?:Product

  
}
