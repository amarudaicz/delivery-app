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
                    { label: 'Dashboard', icon: 'pi pi-home', routerLink: ['/admin'] }
                ]
            },
            {
                label: 'Secciones',
                items: [
                    { label: 'Productos', icon: 'fa-solid fa-table', routerLink: ['products'] },
                    { label: 'Ajustes', icon: 'pi pi-sliders-v', routerLink: ['config'] },
                    { label: 'Horarios', icon: 'pi pi-clock', routerLink: ['schedules'] },
                    { label: 'Redes sociales', icon: 'pi pi-share-alt', routerLink: ['links'] },
                    { label: 'Ayuda', icon: 'pi pi-question', routerLink: ['help'] },
                ]
            }
        ];
    }
}
