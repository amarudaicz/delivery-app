import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { Category } from 'src/app/interfaces/category-interfaz';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { PreviewCategoryService } from 'src/app/services/preview-category/preview-category.service';
import { PwaInstallerService } from 'src/app/services/pwa-installer/pwa-installer.service';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';
@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.scss'],
  animations: [fadeIn],
  providers: [],
})
export class MainHomeComponent implements OnInit {
  appInstalled: boolean = this.pwaInstaller.isPwaMode();
  categories: any[] = []; //INTERFACE

  constructor(
    public theme: ThemesService,
    private routeService: RouteDataService,
    private localService: LocalDataService,
    private pwaInstaller: PwaInstallerService,
    private previewCategory: PreviewCategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeService.setCurrent('home');

    if (!this.previewCategory.categoryId) for (let i = 0; i < 10; i++) this.categories.push(i)
      

    this.localService.getCategories().subscribe((data) => {
      if (data.length !== 0) {
        this.categories = data;
      }
    });

    console.log(this.route);
  }
}
