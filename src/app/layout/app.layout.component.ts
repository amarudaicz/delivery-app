import {
  Component,
  OnDestroy,
  Renderer2,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { LayoutService } from './service/app.layout.service';
import { AppSidebarComponent } from './app.sidebar.component';
import { AppTopBarComponent } from './app.topbar.component';
import ShepherdMain from 'shepherd.js';
import { LayoutStateService } from '../services/layoutState/layout-state.service';
import { shepherdMain } from '../utils/shepherd-tour';

@Component({
  selector: 'app-layout',
  templateUrl: './app.layout.component.html',
})
export class AppLayoutComponent implements OnInit, OnDestroy {
  overlayMenuOpenSubscription: Subscription;

  menuOutsideClickListener: any;

  profileMenuOutsideClickListener: any;

  @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

  @ViewChild(AppTopBarComponent) appTopbar!: AppTopBarComponent;

  constructor(
    public layoutService: LayoutService,
    public renderer: Renderer2,
    public router: Router,
    private layoutState: LayoutStateService
  ) {
    this.overlayMenuOpenSubscription =
      this.layoutService.overlayOpen$.subscribe(() => {
        if (!this.menuOutsideClickListener) {
          this.menuOutsideClickListener = this.renderer.listen(
            'document',
            'click',
            (event) => {
              const isOutsideClicked = !(
                this.appSidebar.el.nativeElement.isSameNode(event.target) ||
                this.appSidebar.el.nativeElement.contains(event.target) ||
                this.appTopbar.menuButton.nativeElement.isSameNode(
                  event.target
                ) ||
                this.appTopbar.menuButton.nativeElement.contains(event.target)
              );

              if (isOutsideClicked) {
                this.hideMenu();
              }
            }
          );
        }

        if (this.layoutService.state.staticMenuMobileActive) {
          this.blockBodyScroll();
        }
      });

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.hideMenu();
        this.hideProfileMenu();
      });

    this.layoutState.state.header = false;
    this.layoutState.state.navigation = false;
    this.layoutState.updateState();
  }

  ngOnInit(): void {
    this.initTutorial();
  }

  hideMenu() {
    this.layoutService.state.overlayMenuActive = false;
    this.layoutService.state.staticMenuMobileActive = false;
    this.layoutService.state.menuHoverActive = false;
    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
      this.menuOutsideClickListener = null;
    }
    this.unblockBodyScroll();
  }

  hideProfileMenu() {
    this.layoutService.state.profileSidebarVisible = false;
    if (this.profileMenuOutsideClickListener) {
      this.profileMenuOutsideClickListener();
      this.profileMenuOutsideClickListener = null;
    }
  }

  blockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    } else {
      document.body.className += 'blocked-scroll';
    }
  }

  unblockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          '(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)',
          'gi'
        ),
        ' '
      );
    }
  }

  get containerClass() {
    return {
      'layout-theme-light': this.layoutService.config.colorScheme === 'light',
      'layout-theme-dark': this.layoutService.config.colorScheme === 'dark',
      'layout-overlay': this.layoutService.config.menuMode === 'overlay',
      'layout-static': this.layoutService.config.menuMode === 'static',
      'layout-static-inactive':
        this.layoutService.state.staticMenuDesktopInactive &&
        this.layoutService.config.menuMode === 'static',
      'layout-overlay-active': this.layoutService.state.overlayMenuActive,
      'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
      'p-input-filled': this.layoutService.config.inputStyle === 'filled',
      'p-ripple-disabled': !this.layoutService.config.ripple,
    };
  }

  private initTutorial() {
    const watched = localStorage.getItem('shepherd-main');
    shepherdMain.addSteps([
      {
        id: 'step1',
        classes: 'step-header',
        text: 'Este es el Menú principal de tu panel de administración. En la parte superior izquierda, puedes encontrar un botón para mostrar u ocultar el dashboard. También puedes encontrar los enlaces para ver tu tienda, cerrar sesión, ver la información de tu plan de pago y acceder a tu perfil de usuario al pulsar o pasar el mouse sobre el nombre de tu tienda.',
        attachTo: {
          element: '#header-admin',
          on: 'bottom',
        },
        buttons: [
          {
            text: 'Siguiente',
            action: shepherdMain.next,
          },
     
        ],
      },
      {
        id: 'step2',
        classes: 'step-dashboard',
        classPrefix: 'header-step',
        arrow: false,
        text: 'Puedes ver las diferentes secciones de tu panel de administrador en el Dashboard, como los productos, ajustes de tu tienda, envíos, pagos, horarios y redes sociales. Navega a cada uno de ellos para configurar tu tienda según tus requerimientos',
        attachTo: {
          element: '#dashboard-admin',
          on: 'right-end',
        },
        buttons: [
          {
            text: 'Siguiente',
            action: shepherdMain.next,
          },
            ],
        when: {
          show: () => {
            this.blockBodyScroll()
            this.layoutService.state.staticMenuMobileActive = true          
        },
          hide: () => {  
            this.unblockBodyScroll()
            this.layoutService.state.staticMenuMobileActive = false       
           
          },
        },
      },
    ]);

    if (!watched) {
      shepherdMain.start();
    }
  }

  ngOnDestroy() {
    if (this.overlayMenuOpenSubscription) {
      this.overlayMenuOpenSubscription.unsubscribe();
    }

    if (this.menuOutsideClickListener) {
      this.menuOutsideClickListener();
    }
  }
}
