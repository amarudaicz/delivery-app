import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  DynamicDialogComponent,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { Product } from 'src/app/interfaces/product-interface';
import { LayoutStateService } from 'src/app/services/layoutState/layout-state.service';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-main-detail',
  templateUrl: './main-detail.component.html',
  styleUrls: ['./main-detail.component.scss'],
  animations: [fadeIn],
})
export class MainDetailComponent implements OnInit, OnDestroy {

  product?: Product;
  modePreview:boolean = false

  constructor(
    public theme: ThemesService,
    private route: ActivatedRoute,
    private routeService: RouteDataService,
    private localService: LocalDataService,
    private dialogConfig: DynamicDialogConfig,
    private layoutState:LayoutStateService
  ) {
  
  }
  
  ngOnInit(): void {
    const origin = sessionStorage.getItem('origin')

    if (this.dialogConfig.data) {
      this.product = this.dialogConfig.data
      this.modePreview = true
      return
    }
    
    if (!this.modePreview){
      this.localService.initDataLocal(this.route.snapshot.params['local'])
      this.layoutState.state.navigation = false
      this.layoutState.state.header = false
      this.layoutState.updateState()
    }
    
    const idProduct = this.route.snapshot.queryParams['id'];
    
    this.localService.getProducts().subscribe((data) => {
      this.product = data.filter((e) => e.id === Number(idProduct))[0];
    });
    
  }

  ngOnDestroy(): void {
    this.layoutState.state.header = true
    this.layoutState.state.navigation = true
    this.layoutState.updateState()
  }

}
