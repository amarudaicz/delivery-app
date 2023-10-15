import { Component, EventEmitter, Output } from '@angular/core';
import { WpService } from 'src/app/services/wpService/wp.service';

@Component({
  selector: 'app-pricing-cards',
  templateUrl: './pricing-cards.component.html',
  styleUrls: ['./pricing-cards.component.scss']
})
export class PricingCardsComponent {


  @Output() closePricing = new EventEmitter<boolean>()
  featuresCount:number = 6;
  cardExpandida: boolean = false;
  
  constructor(private wpService:WpService){}

  plans = {
    basic:{
      price:3500,
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
    },
    advanced:{
      price:4000,
      features:[
        'Todas el plan basico',
        'Recivir pagos en MercadoPago',
        'Hasta 10 imagenes por producto',
        'Multiples sucursales',
        'Codigo QR de acceso',
        'Posicionamiento en buscadores (Google, etc)',

      ]
    }
  }

  closePanelPricing(){
    this.closePricing.emit(true)
  }

  seeAllFeatures(){
    this.featuresCount += this.plans.basic.features.length; // Incrementa la cantidad a mostrar

    setTimeout(()=> window.scrollTo(0, document.body.scrollHeight), 500 )
    

  }

  contactWp(){
    this.wpService.contactSoporte()
  }

}
