import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Order, OrderHistory } from 'src/app/interfaces/order-interfaz';
import { DateService } from 'src/app/services/date-service/date-service.service';

enum ShippingMethod {
  DOMICILIO = 'Envío a domicilio',
  TIENDA = 'Retirar en local',
  OTRO = 'Otro método de envío'
}
@Component({
  selector: 'app-card-order',
  templateUrl: './card-order.component.html',
  styleUrls: ['./card-order.component.scss']
})

export class CardOrderComponent implements OnChanges, OnInit {

  @Input() order?: OrderHistory;

  formattedDate: string = ''; // Variable para almacenar el valor formateado de la fecha
  constructor(private dateService: DateService, private dateSerivice:DateService) {
    

  }

  ngOnInit(): void {
    this.formattedDate = this.getFormatDate(this.order?.date!)
  }
  
  ngOnChanges(changes: SimpleChanges) {
    // Verificar si la propiedad order ha cambiado
    // if (changes['order'] && changes['order'].currentValue) {
    //   // Actualizar el valor formateado de la fecha cuando la propiedad order.date cambie
    //   this.formattedDate = this.getFormatDate(this.order!.date);
    // }
  }

  getFormatDate(date:Date){
    return this.dateSerivice.formatTimeElapsed(date)
  }

  hasShipping(){
    return this.order?.shippingMethod === ShippingMethod.DOMICILIO
  }

}
