import { Observable } from "rxjs";
import { OrderEntity } from "./order-entity";

export interface OrderRepository {
  postOrder(order: any): Promise<any>;
  getOrder(order_id: number): Promise<OrderEntity>;
  getOrdersByLocalId(local_id: number): Observable<OrderEntity[]>;
  putOrder(order: OrderEntity): Observable<any>;
  deleteOrder(order_id: number): Observable<any>;
}
