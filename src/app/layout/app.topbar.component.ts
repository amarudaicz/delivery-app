import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AdminService } from '../services/admin/admin.service';
import { fadeIn } from '../animations/main-detail-animations';
import { LocalDataService } from '../services/localData/local-data.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    animations:[fadeIn],
  changeDetection:ChangeDetectionStrategy.OnPush

})
export class AppTopBarComponent {

    items!: MenuItem[];
    panelSession:boolean = false;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    onBlurPanel(){
        console.log('bluri');
        this.panelSession = false
    }
    constructor(public layoutService: LayoutService, public adminService:AdminService, public localService:LocalDataService) {

        this.adminService.local$.subscribe(local=>{
            console.log(local);
            
            if ((local)) {
                console.log(this.localService.islocalOpen(local.schedules));
                
            }
        })
     }
}
