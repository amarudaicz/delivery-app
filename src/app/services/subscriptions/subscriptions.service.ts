import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {

  constructor() { }

  private plans = {
    basic:{
      price:4000,
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


  public getPlans(){
    return this.plans
  }


}
