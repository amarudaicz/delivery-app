import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivationStart, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { headerIn } from 'src/app/animations/haeder-animations';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { Local } from 'src/app/interfaces/local-interface';
import { LayoutStateService } from 'src/app/services/layoutState/layout-state.service';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';
import { ModalInfoLocalComponent } from '../modal-info-local/modal-info-local.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [fadeIn, headerIn],
})
export class HeaderComponent implements OnInit, OnDestroy {
  local?: Local;

  stateMenu: boolean = false;
  stateHeader: boolean = true;
  dataMenu: any[] = [
    {
      name: 'Inicio',
      icon: 'fa-solid fa-house',
      link: '/',
      command:()=>{}
    },
    {
      name: 'Informacion',
      icon: 'pi pi-info-circle',
      command:()=>{this.openModalInfo()}
    },
    {
      name: 'Ubicacion',
      icon: 'fa-solid fa-location-dot',
      command:()=>{
        window.open(this.localService.getLinkMaps())
      }
    },
    {
      name: 'Instagram',
      icon: 'pi pi-instagram',
      command:()=>{}
    },
  ];
  state: any;
  fixed: boolean = false;
  scrollPos: number = 0;

  constructor(
    public theme: ThemesService,
    public routeData: RouteDataService,
    private localService: LocalDataService,
    public layoutState: LayoutStateService,
    private router: Router,
    private dialog:MatDialog
  ) {}

  ngOnInit(): void {
    this.layoutState.stateSubject.subscribe((state) => {
      this.state = state;
    });

    this.localService.local$.subscribe((local) => {
      console.log(local);
      this.local = local;
    });
  }

  toogleMenu() {
    this.stateMenu = !this.stateMenu;
    this.layoutState.state.menuMobile = !this.layoutState.state.menuMobile;
    this.layoutState.updateState();

    if (document.body.style.overflow === 'hidden') {
      document.body.style.overflow = '';
    } else {
      document.body.style.overflow = 'hidden';
    }
  }

  openModalInfo(){
    this.dialog.open(ModalInfoLocalComponent)
  }
  
  shareLocal() {
    if (navigator.share) {
      navigator
        .share({
          title: 'Título del enlace compartido',
          text: 'Descripción del enlace compartido',
          url: `deliapp/${this.local?.name_url}.com`, // Reemplaza esto con tu enlace a compartir
        })
        .then(() => console.log('Enlace compartido con éxito'))
        .catch((error) => console.error('Error al compartir:', error));
    } else {
      console.log('La API de Web Share no está soportada en este navegador.');
      // Aquí puedes proporcionar una alternativa para compartir en navegadores que no soportan la API de Web Share.
    }
  }

  ngOnDestroy(): void {
    this.stateMenu = false;
    document.body.style.overflow = '';
  }
}
