import { Component, OnDestroy, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { LayoutStateService } from 'src/app/services/layoutState/layout-state.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-main-cart',
  templateUrl: './main-cart.component.html',
  styleUrls: ['./main-cart.component.scss'],
  animations:[
    fadeIn
  ]
})
export class MainCartComponent implements OnInit, OnDestroy {
  
  constructor(private layoutState:LayoutStateService, public themes:ThemesService) {

  }
  ngOnInit(): void {
    this.layoutState.state.header=false
    this.layoutState.state.navigation=false
    this.layoutState.updateState()
    
  }
  
  ngOnDestroy(): void {
    this.layoutState.state.header=true
    this.layoutState.state.navigation=true
    this.layoutState.updateState()
  }
}
