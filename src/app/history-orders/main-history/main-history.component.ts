import { Component } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-main-history',
  templateUrl: './main-history.component.html',
  styleUrls: ['./main-history.component.scss']
})
export class MainHistoryComponent {

  constructor(public orderService:OrdersService){

  }

}
