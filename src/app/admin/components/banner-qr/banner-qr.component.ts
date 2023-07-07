import { Component } from '@angular/core';

@Component({
  selector: 'app-banner-qr',
  templateUrl: './banner-qr.component.html',
  styleUrls: ['./banner-qr.component.scss']
})
export class BannerQrComponent {

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

}
