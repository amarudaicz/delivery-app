import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-info-plan-basic',
  templateUrl: './info-plan-basic.component.html',
  styleUrls: ['./info-plan-basic.component.scss']
})
export class InfoPlanBasicComponent {

  constructor( public dialogRef:MatDialogRef<InfoPlanBasicComponent>){

  }
  planBasic = {
    price:3000,
    features:[
      'Conexion con WhatsApp',
      'Categorías y productos ilimitados',
      'Control de horarios de la tienda ',
      'Tienda personalizable',
      'Codigo QR de acceso',
      'Productos variables',
      'Control de stock',
      'Estadisticas de ventas y usuarios',
      'Geolocalizacion de clientes',
      'Precio de envio segun distancia',
      'Conexion con redes (instagram, facebook, etc)'
    ]
  }
}
