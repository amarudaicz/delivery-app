import {
  Component,
  OnDestroy,
  OnInit,
  AfterContentChecked,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { Category } from 'src/app/interfaces/category-interfaz';
import { CartService } from 'src/app/services/cartData/cart.service';
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
export class MainHomeComponent implements OnInit, OnDestroy {
  appInstalled: boolean = this.pwaInstaller.isPwaMode();
  categories?: Category[]|any[] = [1,2,3,4,5]; //INTERFACE
  local: string | null = null;
  themeLoaded: boolean = false;
  @ViewChild('containerCategories') containerCategories?: ElementRef;

  constructor(
    public theme: ThemesService,
    private routeService: RouteDataService,
    private localService: LocalDataService,
    private pwaInstaller: PwaInstallerService,
    private route: ActivatedRoute,
    private layoutStateService: LayoutStateService,
    private cartService: CartService
  ) {
    this.layoutStateService.state.header = true;
    this.layoutStateService.state.navigation = true;
    this.layoutStateService.unblockBody()
    this.layoutStateService.updateState();
  }

  ngOnInit(): void {
    //SETING RUTA
    this.routeService.setCurrent('home');

    //SETING PETICIONES DEL LOCAL
    this.local = this.route.snapshot.params['local'];
    
    // this.localService.initDataLocal(this.local);

    if (this.local !== this.routeService.getOrigin()) {
      this.cartService.clearCart();
    }

    //SETING ORIGIN

    //SETEANDO EL PRELOADER DE LAS CATEGORIAS SI NO EXISTE ID SETEADO

    //OBTENIENDO LAS CATEGORIAS
    this.localService.categories$.subscribe((data) => {
      if (!data.length) return;
        this.categories = data;
    });

    this.localService.local$.subscribe((local) => {
      if (!local) return;

      window.document.title = local.name;
    });

    //CHECK QUE EL TEMA ESTE CARGADO CUANDO SETLOCAL()
    this.theme.getThemeState().subscribe((state) => (this.themeLoaded = state));

    console.log(this.containerCategories);
  }

  ngOnDestroy(): void {
    this.layoutStateService.state.menuMobile = false;
    this.layoutStateService.updateState();
  }
}
