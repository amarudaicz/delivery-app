  import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { Product } from 'src/app/interfaces/product-interface';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LayoutStateService } from 'src/app/services/layoutState/layout-state.service';
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


export class MainCategoryComponent implements OnInit, OnDestroy {
  category:string = ''
  products?: Product[];
  routeSubscription:Subscription


  
  constructor(
    public theme: ThemesService,
    private routeService: RouteDataService,
    private localService: LocalDataService,
    private route: ActivatedRoute,
    private layoutService:LayoutStateService
  ) 
  {
    this.category = this.route.snapshot.params['category']
    this.layoutService.state.header = true
    this.layoutService.state.navigation = true
    this.layoutService.updateState()

    this.routeSubscription =  this.route.paramMap.subscribe(params=>{
      console.log(params);
      this.category = params.get('category')!

      this.localService.getProducts().subscribe((data)=>{
        if (!data.length) return 
        this.products = data.filter(e => e.category_name.toLowerCase() === this.category)
      })
    })

  }


  ngOnInit(): void {
    this.routeService.setCurrent('categories');
    // this.localService.initDataLocal(this.route.snapshot.url[0].path)
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe()
  }


}
