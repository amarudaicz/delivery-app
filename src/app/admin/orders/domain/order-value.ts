import { ItemCart } from 'src/app/interfaces/itemCart-interfaz';
import { OrderEntity, StatusType } from './order-entity';

export class OrderValue  {
  constructor(order: OrderEntity) {
    this.id = order.id;
    this.customer_name = order.customer_name;
    this.total_amount = order.total_amount;
    this.local_id = order.local_id;
    this.payment_method = order.payment_method;
    this.shipping_address = order.shipping_address;
    this.shipping_reference = order.shipping_reference;
    this.status = order.status;
    this.cart = order.cart;
    this.order_date = order.order_date;
    this.watched_admin = order.watched_admin;
  }
  
  customer_email!: string;
  id: number;
  watched_admin: number;
  order_date: Date;
  cart: ItemCart[];
  status: StatusType;
  customer_name: string;
  total_amount: number;
  local_id: number;
  payment_method: string;
  shipping_address: string;
  shipping_reference: string | null;
}
