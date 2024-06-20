import { Component, OnDestroy } from '@angular/core';
import { OrderService } from '../../aplication/order.service';
import { OrderEntity, StatusType } from '../../domain/order-entity';
import { NotificationsAdminService } from 'src/app/services/notifications-admin/notifications-admin.service';
import { OrdersUseCase } from '../../aplication/orders-use-cases';
import { MatDialog } from '@angular/material/dialog';
import { catchError } from 'rxjs';
import { handleError } from 'src/app/utils/handle-error-http';
import { ModalDetailsOrderComponent } from '../modal-details-order/modal-details-order.component';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fast-mode',
  templateUrl: './fast-mode.component.html',
  styleUrls: ['./fast-mode.component.scss'],
})
export class FastModeComponent implements OnDestroy {
  allOrder?: OrderEntity[];
  dataSource?: any[];
  dateOrders: any;
  formDate: FormGroup;
  currentDate: any;
  ordersSubscription: any;

  constructor(
    private orderService: OrderService,
    private adminNotify: NotificationsAdminService,
    private ordersUseCase: OrdersUseCase,
    private dialog: MatDialog,
    private fb: FormBuilder
  ) {
    this.formDate = this.fb.group({
      date: [null],
    });


    this.formDate.valueChanges.subscribe((values: any) => {
      this.currentDate = values.date;
      this.getOrders();
    });

    this.formDate.get('date')?.setValue(new Date().toISOString().split('T')[0],{emitEvent:false});
    this.currentDate = this.formDate.get('date')?.value;
    this.getOrders();
  }

  getOrders() {
    this.ordersSubscription = this.orderService.orders$.subscribe(
      (orders: any) => {
        if (!orders) return;
        console.log(orders);
        
        this.allOrder = orders;

        const pendingOrders = this.ordersUseCase.filterByDate(
          this.ordersUseCase.filterByStatus(this.allOrder!, 'pendiente'),
          this.currentDate
        );
    
        const inProgressOrders = this.ordersUseCase.filterByDate(this.ordersUseCase.filterByStatus(
          this.allOrder!,
          'procesando'
        ), this.currentDate)
    
        const shippedOrders =this.ordersUseCase.filterByDate( this.ordersUseCase.filterByStatus(
          this.allOrder!,
          'enviado'
        ), this.currentDate)
    
        this.dataSource = [
          {
            titleStatus: 'Pendientes',
            orders: pendingOrders,
            status: 'pendiente',
          },
          {
            titleStatus: 'En proceso',
            orders: inProgressOrders,
            status: 'procesando',
          },
          {
            titleStatus: 'Enviados',
            orders: shippedOrders,
            status: 'enviado',
          },
        ];
      });
  }

  getPendingOrders() {
    return this.allOrder?.filter((o) => o.status === 'pendiente');
  }

  getIndexReverse(index: number) {
    console.log(this.dateOrders);
    return this.allOrder!.length - 1 - index;
  }

  deleteOrder(id: number) {
    this.adminNotify
      .new(`Realmente quiere eliminar el pedido ${id}`, 'Eliminar')
      .onAction()
      .subscribe(() => {
        this.ordersUseCase
          .removeOrder(id)
          .pipe(
            catchError((err) => {
              return handleError(err, this.adminNotify);
            })
          )
          .subscribe((ok) => {
            this.adminNotify.new(`Pedido ${id} eliminado con éxito`);
            this.orderService.orders$.next(
              this.allOrder?.filter((o) => o.id !== id)
            );
          });
      });
  }

  viewDetailsOrder(order: OrderEntity) {
    this.dialog.open(ModalDetailsOrderComponent, {
      data: order,
      // width:window.innerWidth > 768 ? '60vw' : '90vw'
    });
  }

  dropOrder(event: CdkDragDrop<OrderEntity[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        0
      );
    }

    const currentIndex = event.currentIndex;
    const order = event.container.data[currentIndex];
    const status = event.container.element.nativeElement.id;
    order.status = status as StatusType;

    console.log(event.container.element.nativeElement.id);

    this.ordersUseCase
      .updateOrder({ id: order.id, status })
      .subscribe((res) => {});
  }

  sortPredicate = (index: number, drag: CdkDrag, drop: CdkDropList) => {
    console.log(index);

    // Devuelve true para que el elemento arrastrado siempre se coloque en la primera posición
    return index === 0;
  };

  formatTimeElapsed(order_date:Date) {
    const now = new Date();
    const dateOrder = new Date(order_date)
    const difference = now.getTime() - dateOrder.getTime(); // Use getTime() to get the time in milliseconds

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
        return ` | ${seconds} segundo${seconds === 1 ? '' : 's'}`;
    } else if (minutes < 60) {
        return ` | ${minutes} minuto${minutes === 1 ? '' : 's'}`;
    } else if (hours < 24) {
        return ` | ${hours} hora${hours === 1 ? '' : 's'}`;
    } else {
        return ` | ${days} día${days === 1 ? '' : 's'}`;
    }
}

  ngOnDestroy() {
    if (this.ordersSubscription) {
      this.ordersSubscription.unsubscribe();
    }

    this.orderService.setMode(0)
  }
}
