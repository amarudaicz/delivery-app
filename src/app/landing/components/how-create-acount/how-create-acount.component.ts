import { Component } from '@angular/core';

@Component({
  selector: 'app-how-create-acount',
  templateUrl: './how-create-acount.component.html',
  styleUrls: ['./how-create-acount.component.scss']
})
export class HowCreateAcountComponent {

  plans = {
    basic:{
      price:3500,
      features:[
        'Conexión con WhatsApp',
        'Categorías y productos ilimitados',
        'Control de horarios de la tienda ',
        'Tienda personalizable',
        'Código QR de acceso',
        'Productos variables',
        'Control de stock',
        'Estadísticas de ventas y usuarios',
        'Geolocalizacion de clientes',
        'Precio de envío por distancia',
        'Conexión con redes (instagram, facebook, etc)'
      ]
    },
    advanced:{
      price:5000,
      features:[
        'Todas del plan básico',
        'Recibir pagos automáticos',
        'Hasta 10 imágenes por producto',
        'Multiples sucursales',
        'Posicionamiento en buscadores (Google, etc)',
        'Secciones exclusivas',
      ]
    }
  }

}
