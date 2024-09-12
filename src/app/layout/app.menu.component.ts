import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Inicio',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-home', routerLink: ['/admin'] }
                ]
            },
            {
                label: 'Secciones',
                items: [
                    { label: 'Productos', icon: 'fa-solid fa-table', routerLink: ['products'] },
                    { label: 'Pedidos', icon: 'pi pi-send', routerLink: ['orders'] },
                    { label: 'Tienda', icon: 'pi pi-sliders-v', routerLink: ['config'] },
                    { label: 'Envíos', icon: 'pi pi-box', routerLink: ['shipping'] },
                    { label: 'Pagos', icon: 'pi pi-money-bill', routerLink: ['pay-methods'] },
                    { label: 'Horarios', icon: 'pi pi-clock', routerLink: ['schedules'] },
                    { label: 'Redes Sociales', icon: 'pi pi-share-alt', routerLink: ['links'] },
                    { label: 'WhatsApp', icon: 'pi pi-whatsapp', routerLink: ['whatsapp'] },
                ]
            },
            {
                label: 'Ayuda',
                items: [
                    { label: 'Documentación', icon: 'pi pi-question', routerLink: ['docs'] },
                    { label: 'Suscripción' ,icon: 'pi pi-credit-card', routerLink: ['payments'] },
                ]
            }
        ];
    }
}
