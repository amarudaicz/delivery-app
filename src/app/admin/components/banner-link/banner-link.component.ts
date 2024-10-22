import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';
import { AdminService } from 'src/app/services/admin/admin.service';
import { NotificationsAdminService } from 'src/app/services/notifications-admin/notifications-admin.service';
import { fadeIn } from 'src/app/animations/main-detail-animations';

@Component({
  selector: 'app-banner-link',
  templateUrl: './banner-link.component.html',
  styleUrls: ['./banner-link.component.scss'],
  animations:[fadeIn]
})
export class BannerLinkComponent {
  
  alertCopy:boolean = false
  copyUrl:string|undefined = undefined

  modelListFeatures= [ 
    {
      text:'Compatible con todas las redes',
      icon:'fa-solid fa-circle-check'
    },
    {
      text:'Carga inmediata de la tienda',
      icon:'fa-solid fa-circle-check'
    },
    {
      text:'Sincronizacion con deli',
      icon:'fa-solid fa-circle-check'
    }
  ]
  constructor(private clipboard:Clipboard, private adminService:AdminService, private notificationsAdmin:NotificationsAdminService){

    this.adminService.local$.subscribe(local=>{
      local ? this.copyUrl = 'https://delitienda.netlify.app/' + local.name_url : null
    })
  }
  

  copyToClipboard(): void {
    this.clipboard.copy(this.copyUrl!);
    this.alertCopy = true

    setTimeout(() => this.alertCopy = false, 5000);
    
  }
  
}
