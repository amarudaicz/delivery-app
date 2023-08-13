import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { CartService } from 'src/app/services/cartData/cart.service';
import { LayoutStateService } from 'src/app/services/layoutState/layout-state.service';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-main-cart',
  templateUrl: './main-cart.component.html',
  styleUrls: ['./main-cart.component.scss'],
  animations:[
    fadeIn
  ]
})
export class MainCartComponent implements OnInit {
  
  constructor(private layoutState:LayoutStateService, ) {

  }



  
  ngOnInit(): void {
    this.layoutState.state.header=true
    this.layoutState.state.navigation=true
    this.layoutState.updateState()
    
  }
 
}
