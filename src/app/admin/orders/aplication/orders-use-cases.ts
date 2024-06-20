import { Injectable } from '@angular/core';
import { OrderRepository } from '../domain/order-repository';
import { MysqlRepositoryService } from '../repository/mysql-repository.service';
import { OrderEntity, StatusType } from '../domain/order-entity';
import { Order } from 'src/app/interfaces/order-interfaz';
import { NotificationsAdminService } from 'src/app/services/notifications-admin/notifications-admin.service';

@Injectable({
  providedIn: 'root',
})
export class OrdersUseCase {
  constructor(
    private mysqlRepository: MysqlRepositoryService,
    private notify: NotificationsAdminService
  ) {}

  getAllOrders() {
    return this.mysqlRepository.getOrdersByLocalId();
  }

  updateOrder(order: OrderEntity | any) {
    order.cart = JSON.stringify(order.cart);
    return this.mysqlRepository.putOrder(order);
  }

  removeOrder(id: number) {
    return this.mysqlRepository.deleteOrder(id);
  }

  filterByQuery(allOrders: OrderEntity[], query: string) {
    const filterId = (id: number, idQuery: string) =>
      id.toString().includes(idQuery);
    const filterName = (customer_name: string, query: string) =>
      customer_name.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    const filterDate = (order: OrderEntity, query: string) =>
      this.getDate(order).includes(query);

    return allOrders.filter(
      (o) =>
        filterId(o.id, query) ||
        filterName(o.customer_name, query) ||
        filterDate(o, query)
    );
  }

  filterByStatus(allOrders: OrderEntity[], status: StatusType) {
    return allOrders.filter((o) => o.status === status);
  }

  filterByDate(allOrders: OrderEntity[] | any[], date: any) {

    const filtredOrders = allOrders.filter((o) => {
      const dateOrder = new Date(o.order_date).toISOString().split('T')[0]
      return dateOrder === date;
    });

    return filtredOrders
  }

  getDate(order: OrderEntity) {
    
    const date = new Date(order.order_date);
    return `${date.toLocaleDateString()} - ${date
      .getHours()
      .toString()
      .padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
  }
}
