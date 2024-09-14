import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  ActivatedRoute,
  ActivationStart,
  NavigationEnd,
  Router,
} from '@angular/router';
import { filter } from 'rxjs';
import { headerIn } from 'src/app/animations/haeder-animations';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { Local } from 'src/app/interfaces/local-interface';
import { LayoutStateService } from 'src/app/services/layoutState/layout-state.service';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';
import { ModalInfoLocalComponent } from '../modal-info-local/modal-info-local.component';
import { CartService } from 'src/app/services/cartData/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [fadeIn, headerIn],
})
export class HeaderComponent implements OnInit, OnDestroy {
  local?: Local;

  dataMenu: any[] = [
    {
      name: 'Inicio',
      icon: 'fa-solid fa-home',
      link: `/${this.routeData.getOrigin()}`,
      command: () => (this.state.menuMobile = false),
    },
    {
      name: 'Mis recientes',
      icon: 'fa-solid fa-history',
      link: '/recientes',
      command: () => {},
    },
    {
      name: 'Informacion',
      icon: 'pi pi-info-circle',
      command: () => {
        this.openModalInfo();
      },
    },
  ];
  state: any;
  fixed: boolean = false;
  scrollPos: number = 0;
  catActive?: string;

  constructor(
    public theme: ThemesService,
    public routeData: RouteDataService,
    public localService: LocalDataService,
    public layoutState: LayoutStateService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.layoutState.stateSubject.subscribe((state) => {
      this.state = state;
    });

    this.localService.local$.subscribe((local) => {
      this.local = local;
    });

    if (this.localService.getLinkMaps()) {
      this.dataMenu.push({
        name: 'Ubicacion',
        icon: 'fa-solid fa-location-dot',
        command: () => {
          window.open(this.localService.getLinkMaps()!);
        },
      });
    }

    this.setBodyClass();

    this.activeRoute.paramMap.subscribe((params) => {
      console.log(params);

      this.catActive = params.get('category')!;
      console.log(this.catActive);
    });
  }

  toogleMenu() {
    this.layoutState.state.menuMobile = !this.layoutState.state.menuMobile;
    this.layoutState.updateState();

    if (document.body.style.overflow === 'hidden') {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  openModalInfo() {
    this.toogleMenu();
    this.dialog.open(ModalInfoLocalComponent);
  }

  shareLocal() {
    if (navigator.share) {
      navigator
        .share({
          title: 'Mira este local en DELITIENDA',
          url: `${this.local?.name_url}`, // Reemplaza esto con tu enlace a compartir
        })
        .then(() => console.log('Enlace compartido con éxito'))
        .catch((error) => console.error('Error al compartir:', error));
    } else {
      console.log('La API de Web Share no está soportada en este navegador.');
      // Aquí puedes proporcionar una alternativa para compartir en navegadores que no soportan la API de Web Share.
    }
  }

  getIgLink() {
    return `$`;
  }

  setBodyClass() {
    if (document.documentElement.classList.contains('h-full')) {
      document.body.classList.remove('h-full');
      document.documentElement.classList.remove('h-full');
    } else {
      document.body.classList.add('h-full');
      document.documentElement.classList.add('h-full');
    }
  }

  navigateCategory(cat: string) {
    this.router.navigate([
      '/' + this.routeData.getOrigin() + '/' + cat.toLowerCase(),
    ]);
  }

  ngOnDestroy(): void {
    document.body.style.overflow = '';
    this.layoutState.state.menuMobile = false;
    this.layoutState.updateState();
  }
}
