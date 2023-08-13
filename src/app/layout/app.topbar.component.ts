import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from './service/app.layout.service';
import { AdminService } from '../services/admin/admin.service';
import { fadeIn } from '../animations/main-detail-animations';
import { LocalDataService } from '../services/localData/local-data.service';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { Local } from '../interfaces/local-interface';
import { NotificationsAdminService } from '../services/notifications-admin/notifications-admin.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  animations: [fadeIn],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTopBarComponent implements OnInit {
  items!: MenuItem[];
  panelSession: boolean = false;
  local?:Local

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(
    public layoutService: LayoutService,
    public localService: LocalDataService,
    public adminService: AdminService,
    private notificationsAdmin:NotificationsAdminService,
    public auth: AuthService,
    private route: Router,
    private detectChanges: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.adminService.local$.subscribe(local=>{
      this.local = local
    })

  }

  watchStore() {
    this.localService.resetData()
    this.localService.initDataLocal(this.local?.name_url!)
    setTimeout(() => {
      this.route.navigate(['/' + this.local?.name_url]);
    }, 100);
  }

  logOut() {
    this.auth.deleteToken();
    this.notificationsAdmin.new('Cerrando session', '', {duration:2000})

    setTimeout(() => this.route.navigate(['/']), 2000);
    
  }


}
