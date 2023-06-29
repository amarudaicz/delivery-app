import { Component, OnDestroy, OnInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { Category } from 'src/app/interfaces/category-interfaz';
import { LayoutStateService } from 'src/app/services/layoutState/layout-state.service';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { PreviewCategoryService } from 'src/app/services/preview-category/preview-category.service';
import { PwaInstallerService } from 'src/app/services/pwa-installer/pwa-installer.service';
import { RecentsService } from 'src/app/services/recents/recents.service';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';
@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.scss'],
  animations: [fadeIn],
  providers: [],
})
export class MainHomeComponent implements OnInit, OnDestroy{
  appInstalled: boolean = this.pwaInstaller.isPwaMode();
  categories: any[] = []; //INTERFACE
  local: string | null = null;
  themeLoaded: boolean = false;

  constructor(
    public theme: ThemesService,
    private routeService: RouteDataService,
    private localService: LocalDataService,
    private pwaInstaller: PwaInstallerService,
    private previewCategory: PreviewCategoryService,
    private route: ActivatedRoute,
    private layoutStateService:LayoutStateService,
    private recents:RecentsService
  ) {

    this.layoutStateService.state.header = true
    this.layoutStateService.state.navigation = true
    this.layoutStateService.updateState()
  }

  ngOnInit(): void {
    //SETING RUTA
    this.routeService.setCurrent('home');
    
    //SETING PETICIONES DEL LOCAL
    this.local = this.route.snapshot.params['local'];
    // this.localService.initDataLocal(this.local);


    //SETING ORIGIN
    this.routeService.setOrigin(this.local!);

    //SETEANDO EL PRELOADER DE LAS CATEGORIAS SI NO EXISTE ID SETEADO
    if (!this.previewCategory.category_id)
      for (let i = 0; i < 10; i++) this.categories.push(i);

    //OBTENIENDO LAS CATEGORIAS
    this.localService.getCategories().subscribe((data) => {
      if (data.length) this.categories = data.filter(c => c.active);
    });
    
    //CHECK QUE EL TEMA ESTE CARGADO CUANDO SETLOCAL()
    this.theme.getThemeState().subscribe((state) => (this.themeLoaded = state));
  }



  ngOnDestroy(): void {
    this.layoutStateService.state.menuMobile = false
    this.layoutStateService.updateState()
  }

}
