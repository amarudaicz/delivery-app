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
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] }
                ]
            },
            {
                label: 'Secciones',
                items: [
                    { label: 'Productos', icon: 'fa-solid fa-table', routerLink: ['products'] },
                    { label: 'Nuevo Producto', icon: 'pi pi-plus', routerLink: ['new-product'] },
                    { label: 'Ajustes', icon: 'pi pi-fw pi-sliders-v', routerLink: ['config'] },
                    { label: 'Invalid State', icon: 'pi pi-fw pi-exclamation-circle', routerLink: ['/uikit/invalidstate'] },
                    { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] }
                ]
            }
        ];
    }
}
