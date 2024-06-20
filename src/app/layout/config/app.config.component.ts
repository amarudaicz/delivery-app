import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { LayoutService } from "../service/app.layout.service";
import { MenuService } from "../app.menu.service";
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
    selector: 'app-config',
    templateUrl: './app.config.component.html'
})
export class AppConfigComponent implements OnInit, OnDestroy {

    ngOnInit(): void {
    }

    constructor(public layoutService: LayoutService, public menuService: MenuService, private routeData:RouteDataService, private adminService:AdminService) { 
        this.routeData.setCurrent('admin')
        // this.adminService.getCategories().subscribe()
        // this.adminService.getProsductsAdmin()
        this.adminService.getLocal().subscribe()
        this.adminService.getCategories().subscribe()
    }


    ngOnDestroy(): void {
        window.document.title = 'Delitienda - Vende mas, sin pagar comisión'  
    }
}
