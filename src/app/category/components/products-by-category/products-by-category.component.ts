import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { Product } from 'src/app/interfaces/product-interface';
import { BreadcrumbService } from 'src/app/services/breadcrumb/breadcrumb.service';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

type SortType = 'higher' | 'lower';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.scss'],
})
export class ProductsByCategoryComponent implements OnInit {
  @Input() products?: Product[];
  panelSort: boolean = false;
  sortType: 'higher' | 'lower' | null = null;
  flagPanelSortBlur = 0;

  sortMock: { sortType: SortType; label: string }[] = [
    {
      sortType: 'higher',
      label: 'Mayor precio',
    },
    {
      sortType: 'lower',
      label: 'Menor precio',
    },
  ];

  constructor(
    public theme: ThemesService,
    private localService: LocalDataService,
    private route: Router,
    private routeService: RouteDataService,
    public breadcrum: BreadcrumbService
  ) {}

  ngOnInit(): void {
    this.setBread()
    this.route.events.subscribe((e)=>{
      this.setBread()
    })
  }

  setBread(){
    this.breadcrum.setBreadcrumbs([
      { route: `/${this.routeService.getOrigin()!}`, label: 'Inicio' },
      {
        route: `/${this.routeService.getOrigin()!}/${this.products![0].category_name.toLowerCase()}`,
        label: this.products![0].category_name,
      },
    ]);
  }

  backHome() {
    this.route.navigate([this.routeService.getOrigin()]);
  }

  setSortType(sortType: 'higher' | 'lower') {
    this.panelSort = false;
    this.sortType = sortType
    
    if (sortType === 'higher') {
      this.products!.sort((a, b) => b.price - a.price);
      return;
    }

    this.products!.sort((a, b) => a.price - b.price);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    // Verificar si el clic se realizó dentro del div o no
    if ((event.target as HTMLElement).closest('.open-panel-sort')) {
      this.panelSort = !this.panelSort;
      return;
    }

    if (!(event.target as HTMLElement).closest('.panel-sort')) {
      this.panelSort = false;
      return;
    }
  }
}
