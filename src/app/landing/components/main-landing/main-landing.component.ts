import { Component, OnInit } from '@angular/core';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { LayoutStateService } from 'src/app/services/layoutState/layout-state.service';
import { PwaInstallerService } from 'src/app/services/pwa-installer/pwa-installer.service';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-main-landing',
  templateUrl: './main-landing.component.html',
  styleUrls: ['./main-landing.component.scss'],
  animations: [fadeIn],
})
export class MainLandingComponent implements OnInit {
  currentBanner: number = 1;
  model: any[] = [
    {
      id: 1,
      image: 'assets/images/Order food.gif',
      text: '¡Deli, la manera más rápida y fácil para tus antojos! ¡Pide ahora y disfruta de la mejor comida en la comodidad de tu hogar!',
      callToAction: 'Instalar',
      callToNext: 'Comenzar',
      action: (): void => this.pwa.promptInstall(),
      next: 2,
    },
    {
      id: 2,
      image: 'assets/images/2.gif',
      text: '¡Descubre la mejor comida en tu área con la aplicación de Deli! Simplemente ingresa la URL proporcionada por tu restaurante favorito y obtén acceso a su selección de comida.',
      callToAction: null,
      callToNext: 'Continuar',
      action: null,
      next: 3,
    },
    {
      id: 3,
      text: 'Compra lo que necesitas de manera rápida. Agrega tus productos al carrito de compras y procede al checkout para completar los datos de tu pedido.',
      image: 'assets/images/3.gif',
      callToNext: 'Siguiente',
      callToAction: null,
      action: null,
      next: 4,
    },
    {
      id: 4,
      image: 'assets/images/4.gif',
      text: 'Una vez que hayas realizado el checkout, la aplicación te redireccionará automáticamente a WhatsApp con un mensaje generado que incluirá los detalles de tu pedido.',
      background: '',
      callToNext: null,
      callToAction: 'Finalizar',
      action: { finish: true },
      next: 0,
    },
  ];

  constructor(
    private pwa: PwaInstallerService,
    private themeService: ThemesService,
    private layoutState: LayoutStateService,
    private routeService:RouteDataService
  ) {
    localStorage.getItem('landing-banner')
      ? (this.currentBanner = 0)
      : (this.currentBanner = 1);
    this.layoutState.state.header = false;
    this.layoutState.state.navigation = false;
    this.layoutState.updateState();
  }
  ngOnInit(): void {
    // this.themeService.setTheme(2)
    this.routeService.setCurrent('landing')
  }
  updateCurrentBanner(event: number) {
    console.log(event);
    this.currentBanner = event;
  }
}
