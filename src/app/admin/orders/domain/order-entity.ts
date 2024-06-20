import { ItemCart } from "src/app/interfaces/itemCart-interfaz";

interface BaseOrderValue {
    id: number;
    order_date: Date;
    customer_name: string;
    customer_email: string;
    total_amount: number;
    local_id: number;
    payment_method: string;
    shipping_address: string;
    shipping_reference: string | null;
    cart:ItemCart[],
    status:StatusType;
    watched_admin:number;
  }
  
export interface OrderEntity extends BaseOrderValue {
  
}
  
export type StatusType = 'pendiente'|'procesando'|'enviado'|'entregado'|'cancelado';