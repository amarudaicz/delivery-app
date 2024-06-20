import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderEntity, StatusType } from '../../domain/order-entity';
import { OrdersUseCase } from '../../aplication/orders-use-cases';
import { ItemCart } from 'src/app/interfaces/itemCart-interfaz';
import { MatTableDataSource } from '@angular/material/table';
import { Clipboard } from '@angular/cdk/clipboard';
import { OrderService } from '../../aplication/order.service';

@Component({
  selector: 'app-modal-details-order',
  templateUrl: './modal-details-order.component.html',
  styleUrls: ['./modal-details-order.component.scss'],
})
export class ModalDetailsOrderComponent {

  cart:ItemCart[]
  displayedColumns = ['idProduct', 'name','options', 'quantity']
  dataSource = new MatTableDataSource<ItemCart>([]);
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public order: any|OrderEntity,
    public orderUseCase: OrdersUseCase, private clipboard:Clipboard,
     private orderService:OrderService
  ) {
    this.cart = order.cart
    this.dataSource.data = this.cart
    console.log(order);
  }

  
  copyToClipboard(): void {
    this.clipboard.copy(this.order.customer_phone);
  }

  updateStatusOrder(order: OrderEntity, status: StatusType) {
    this.orderUseCase.updateOrder({ id: order.id, status }).subscribe(ok=>{
      this.orderService.getOrders()
    });
  }

  iconClass(status: StatusType) {
    if (status === 'pendiente') {
      return 'text-green-300 pi-whatsapp';
    } else if (status === 'procesando') {
      return 'text-yellow-300 pi-circle-fill';
    } else if (status === 'enviado') {
      return 'text-green-300 pi-circle-fill';
    } else if (status === 'cancelado') {
      return 'text-red-500 pi-circle-fill';
    } else {
      return '';
    }
  }
}
