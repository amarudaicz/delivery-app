import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { catchError } from 'rxjs';
import { AdminService } from 'src/app/services/admin/admin.service';
import { NotificationsAdminService } from 'src/app/services/notifications-admin/notifications-admin.service';
import { handleError } from 'src/app/utils/handle-error-http';
const { saveAs } = require('file-saver');

@Component({
  selector: 'app-banner-qr',
  templateUrl: './banner-qr.component.html',
  styleUrls: ['./banner-qr.component.scss']
})
export class BannerQrComponent {

  
  constructor(private http:HttpClient, private adminService:AdminService, private adminNotifications:NotificationsAdminService){

    this.adminService.local$.subscribe(local=> local ? this.localUrl = local.name_url : '')
  }

  localUrl:string = ''
  loadingQR:boolean = false

  modelListFeatures= [ 
    {
      text:'Código QR instantaneo',
      icon:'fa-solid fa-circle-check'
    },
    { 
      text:'Envia tus clientes a tu aplicacion',
      icon:'fa-solid fa-circle-check'
    },
    {
      text:'Sincronizacion con Deli',
      icon:'fa-solid fa-circle-check'
    }
  ]


  generateQR(){
    console.log();
    this.loadingQR = true
    const url = `/api?size=150x150&data=https://deliapp.com/${this.localUrl}`;
    this.http.get(url, { responseType: 'blob' }).pipe(
      catchError(()=>{
        this.loadingQR=false
        return handleError(undefined, this.adminNotifications)
      })
    ).subscribe(res => {
      this.loadingQR = false
      saveAs(res, 'qr-code.png');
    });


  }

}
