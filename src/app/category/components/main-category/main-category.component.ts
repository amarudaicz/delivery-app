import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { Product } from 'src/app/interfaces/product-interface';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';


@Component({
  selector: 'app-main-category',
  templateUrl: './main-category.component.html',
  styleUrls: ['./main-category.component.scss'],
  animations:[
    fadeIn
  ]
})


export class MainCategoryComponent implements OnInit {
  category?:string
  products?: Product[];

  
  constructor(
    public theme: ThemesService,
    private routeService: RouteDataService,
    private localService: LocalDataService,
    private route: ActivatedRoute
  ) 
  {
    this.category = this.route.snapshot.params['category'] 

  }

  ngOnInit(): void {
    this.routeService.setCurrent('categories');
    console.log(); 

    this.localService.getProducts().subscribe((data)=>{
      console.log(data);
      this.products = data.filter(e => e.category === this.category)
    })
 
    

  }


}
