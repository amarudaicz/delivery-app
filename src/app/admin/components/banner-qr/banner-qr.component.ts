import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { catchError } from 'rxjs';
import { AdminService } from 'src/app/services/admin/admin.service';
import { NotificationsAdminService } from 'src/app/services/notifications-admin/notifications-admin.service';
import { handleError } from 'src/app/utils/handle-error-http';
import {toCanvas} from 'qrcode'

@Component({
  selector: 'app-banner-qr',
  templateUrl: './banner-qr.component.html',
  styleUrls: ['./banner-qr.component.scss'],
})
export class BannerQrComponent  {
  localUrl: string = '';
  loadingQR: boolean = false;
  
  
  @ViewChild('canvasQR') canvasQR!:ElementRef<HTMLCanvasElement>
  @ViewChild('downloadLink') downloadLink!:ElementRef<HTMLAnchorElement>



  constructor(
    private http: HttpClient,
    private adminService: AdminService,
    private adminNotifications: NotificationsAdminService
  ) {
    this.adminService.local$.subscribe((local) =>
      local ? (this.localUrl = local.name_url) : ''
    );
  }


  modelListFeatures = [
    {
      text: 'Código QR instantáneo',
      icon: 'fa-solid fa-circle-check',
    },
    {
      text: 'Envía tus clientes a tu aplicación',
      icon: 'fa-solid fa-circle-check',
    },
    {
      text: 'Sincronización con Deli',
      icon: 'fa-solid fa-circle-check',
    },
  ];

  generateQR() {

    this.loadingQR = true;
    // const url = `/api?size=150x150&data=https://delitienda.app/${this.localUrl}`;
    const url = `https://delitienda.app/${this.localUrl}`;

    const qr = toCanvas(this.canvasQR.nativeElement, url,{width:300,margin: 1}, (err)=>{
      this.loadingQR = false;
      return err ? handleError(undefined, this.adminNotifications) : null
    })

    const imageQR = this.canvasQR.nativeElement.toDataURL('qr-code/jpeg', 1)
    this.downloadLink.nativeElement.href = imageQR
    this.downloadLink.nativeElement.download = 'qr-code'
    this.downloadLink.nativeElement.click()
    this.loadingQR = false;
    
  }
}
