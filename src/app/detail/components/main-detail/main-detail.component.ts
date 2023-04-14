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
  constructor(
    public theme: ThemesService,
    private route: ActivatedRoute,
    private routeService: RouteDataService,
    private localService: LocalDataService,
    private dialogConfig: DynamicDialogConfig,
    private layoutState:LayoutStateService
  ) {}
  ngOnInit(): void {
    this.localService.initDataLocal(localStorage.getItem('origin'))

    if (this.dialogConfig.data) {
      this.product = this.dialogConfig.data
      this.modePreview = true
      return
    }
    
    this.routeService.setCurrent('detail');
    const idProduct = this.route.snapshot.queryParams['id'];
    this.localService.getProducts$().subscribe((data) => {
      this.product = data.filter((e) => e.id === idProduct)[0];
    });

  }

  product?: Product;
  modePreview:boolean = false



  ngOnDestroy(){
    this.layoutState.state.header=true
  }
}
