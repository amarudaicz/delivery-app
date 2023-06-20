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
                    { label: 'Grupo de opciones', icon: 'pi pi-list', routerLink: ['options-group'] },
                    { label: 'Ajustes', icon: 'pi pi-fw pi-sliders-v', routerLink: ['config'] },
                    { label: 'Button', icon: 'pi pi-fw pi-box', routerLink: ['/uikit/button'] }
                ]
            }
        ];
    }
}
