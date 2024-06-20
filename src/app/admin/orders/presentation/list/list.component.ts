import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';
import { OrdersUseCase } from '../../aplication/orders-use-cases';
import { OrderEntity, StatusType } from '../../domain/order-entity';
import { catchError, interval } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NotificationsAdminService } from 'src/app/services/notifications-admin/notifications-admin.service';
import { handleError } from 'src/app/utils/handle-error-http';
import { MatChipListboxChange } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { ModalDetailsOrderComponent } from '../modal-details-order/modal-details-order.component';
import { OrderService } from '../../aplication/order.service';

@Component({
  selector: 'app-list-orders',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements AfterViewInit, OnDestroy {
  allOrders!: OrderEntity[];
  filtredOrders!: OrderEntity[];
  intervalUpdateList = interval(60000);
  displayedColumns = [
    'id',
    'customer_name',
    'order_date',
    'status',
    'total_ammount',
    // 'shipping_address',
    'actions',
  ];
  dataSource = new MatTableDataSource<OrderEntity>();
  @ViewChild('paginator', {static:true}) paginator!: MatPaginator;
  query: string = '';
  ordersSubscription: any;


  modelConfigCategory: any[] = [
    {
      label: ' ',
      items: [
        {
          label: 'Ver pedido',
          icon: 'pi pi-eye',
        },
        {
          label: 'Eliminar',
          icon: 'pi pi-trash',
          command: (event: any) => {
          },
        },
      ],
    },
  ];

  constructor(
    public ordersUseCase: OrdersUseCase,
    private adminNotify: NotificationsAdminService,
    private dialog: MatDialog, 
    private orderService:OrderService
  ) {
  }
  
  ngAfterViewInit() {
    this.orderService.getOrders()
    this.getOrders();
  }

  getOrders() {
    this.ordersSubscription = this.orderService.orders$.subscribe((orders) => {
      if (!orders) return 
      console.log(orders);
      
      this.allOrders = orders;
      this.filtredOrders = orders;
      
      this.setDataSource(this.filtredOrders);
      this.setPaginator();
    });
  }

  updateStatusOrder(order: OrderEntity, status: StatusType) {
    this.ordersUseCase.updateOrder({ id: order.id, status }).subscribe();
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
            const ordersNoDelete = this.allOrders.filter(
              (o) => o.id !== id
            );
            this.orderService.orders$.next(ordersNoDelete);
      });
  });
  };

  viewDetailsOrder(order: OrderEntity) {
    this.dialog.open(ModalDetailsOrderComponent, {
      data: order,
      // width:window.innerWidth > 768 ? '60vw' : '90vw'
    });
  }

  searchQuery(event: any) {
    const query = event.target?.value;
    if (!query) {
      this.setDataSource(this.allOrders);
      return;
    }

    const ordersByQuery = this.ordersUseCase.filterByQuery(
      this.allOrders,
      query
    );
    this.setDataSource(ordersByQuery);
  }

  filterByStatus(event: { value: StatusType }) {
    if (!event.value) {
      this.setDataSource(this.allOrders);
      return;
    }
    const ordersFiltredBystatus = this.ordersUseCase.filterByStatus(
      this.allOrders,
      event.value.toLowerCase() as StatusType
    );
    this.filtredOrders = ordersFiltredBystatus;
    this.setDataSource(ordersFiltredBystatus);
  }

  setPaginator() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel = 'Pedidos por página';
    this.paginator._intl.nextPageLabel = 'Siguiente página';
    this.paginator._intl.previousPageLabel = 'Página anterior';
    this.paginator._intl.getRangeLabel = (
      page: number,
      pageSize: number,
      length: number
    ) => {
      if (length === 0 || pageSize === 0) {
        return `0 de ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} de ${length}`;
    };
  }

  setDataSource(data: OrderEntity[]) {
    this.dataSource.data = data;
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


  ngOnDestroy(): void {
    if(this.ordersSubscription){
      this.ordersSubscription.unsubscribe()
    }
  }


}
