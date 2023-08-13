import { Component, OnDestroy, Renderer2,OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { LayoutService } from "./service/app.layout.service";
import { AppSidebarComponent } from "./app.sidebar.component";
import { AppTopBarComponent } from './app.topbar.component';
import { shepherd } from '../utils/shepherd-tour';
import Shepherd from 'shepherd.js';
import { LayoutStateService } from '../services/layoutState/layout-state.service';

@Component({
    selector: 'app-layout',
    templateUrl: './app.layout.component.html'
})
export class AppLayoutComponent implements OnInit, OnDestroy {

    overlayMenuOpenSubscription: Subscription;

    menuOutsideClickListener: any;

    profileMenuOutsideClickListener: any;

    @ViewChild(AppSidebarComponent) appSidebar!: AppSidebarComponent;

    @ViewChild(AppTopBarComponent) appTopbar!: AppTopBarComponent;

    constructor(public layoutService: LayoutService, public renderer: Renderer2, public router: Router, private layoutState:LayoutStateService) {
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', event => {
                    const isOutsideClicked = !(this.appSidebar.el.nativeElement.isSameNode(event.target) || this.appSidebar.el.nativeElement.contains(event.target) 
                        || this.appTopbar.menuButton.nativeElement.isSameNode(event.target) || this.appTopbar.menuButton.nativeElement.contains(event.target));
                    
                    if (isOutsideClicked) {
                        this.hideMenu();
                    }
                });
            }

            if (this.layoutService.state.staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });

        this.router.events.pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => {
                this.hideMenu();
                this.hideProfileMenu();
            });

            this.layoutState.state.header=false
            this.layoutState.state.navigation=false
            this.layoutState.updateState()
    }
    ngOnInit(): void {
        this.initTutorial()
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
        }
        else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        }
        else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' +
                'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    get containerClass() {
        return {
            'layout-theme-light': this.layoutService.config.colorScheme === 'light',
            'layout-theme-dark': this.layoutService.config.colorScheme === 'dark',
            'layout-overlay': this.layoutService.config.menuMode === 'overlay',
            'layout-static': this.layoutService.config.menuMode === 'static',
            'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config.menuMode === 'static',
            'layout-overlay-active': this.layoutService.state.overlayMenuActive,
            'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
            'p-input-filled': this.layoutService.config.inputStyle === 'filled',
            'p-ripple-disabled': !this.layoutService.config.ripple
        }
    }



    private initTutorial(){
        const widthScreen = window.innerWidth
        const watched = localStorage.getItem('watched-tutorial')
        console.log(watched);
        
        shepherd.addSteps([
            {
                id: 'step1',
                classes:'step-header',
                text: 'Este es el header de nuestro panel de administración. En la parte superior, puedes encontrar diferentes enlaces para acceder a las diferentes secciones del panel, como el dashboard, los usuarios y los pedidos. También puedes hacer una búsqueda rápida aquí mismo. En la esquina superior derecha, puedes encontrar los enlaces para cerrar sesión y para acceder a tu perfil de usuario.',
                attachTo: {
                  element: '#header-admin',
                  on: 'bottom' 
                },
                buttons:[
                    {
                      text:'Siguiente',
                      action:shepherd.next
                    }
                ]
            },
            {
            
                id: 'step2',
                classes:'step-dashboard',
                classPrefix:'header-step',
                arrow:widthScreen < 480 ? false : true,
                text: 'En este menu de inicio puedes ver un resumen de las diferentes secciones del panel, como las estadísticas, los usuarios y los pedidos. También puedes hacer clic en los enlaces para ver más información detallada.',
                attachTo: {
                  element: '#dashboard-admin',
                  on:'left' 
                },
                buttons:[
                    {
                      text:'Siguiente',
                      action:shepherd.next
                    }
                ],
                when:{
                    show:()=>{
                        this.layoutService.state.staticMenuMobileActive=true
                    },
                    hide:()=>{
                        this.layoutService.state.staticMenuMobileActive = false
                    }
                }
               

            },
            
        ]
        )

        
        if (!watched) {
            shepherd.start()
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

