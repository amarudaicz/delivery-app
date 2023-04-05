import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { Category } from 'src/app/interfaces/category-interfaz';
import { Local } from 'src/app/interfaces/local-interface';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { PreviewCategoryService } from 'src/app/services/preview-category/preview-category.service';
import { PwaInstallerService } from 'src/app/services/pwa-installer/pwa-installer.service';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';
import { deleteRepeatElement } from 'src/app/utils/deleteRepeatElement'; 
@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.scss'],
  animations: [fadeIn],
})
export class MainHomeComponent implements OnInit {
  appInstalled: boolean = this.pwaInstaller.isPwaMode();
  categories: Category[] = []; //INTERFACE
  themeLoad:boolean=false

  constructor(
    public theme: ThemesService,
    private routeService: RouteDataService,
    private localService: LocalDataService,
    private pwaInstaller:PwaInstallerService,
    private previewCategory:PreviewCategoryService
  ) {}
    
  ngOnInit(): void {
    this.routeService.setCurrent('home');

    this.localService.getCategories().subscribe((data)=>{
      console.log(data);
      if (data.length !== 0) {
        this.categories = data
        this.previewCategory.setCategory(data[0].id) 
      }
    })

    this.localService.local.subscribe(data=>{
      if (data) {
        
        this.themeLoad = true
      }
    })




  
        

  
       




  }





}
