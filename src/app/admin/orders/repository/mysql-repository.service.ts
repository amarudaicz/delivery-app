import { Injectable } from '@angular/core';
import { OrderRepository } from '../domain/order-repository';
import { OrderEntity } from '../domain/order-entity';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MysqlRepositoryService implements OrderRepository{

  constructor(private http:HttpClient)  { 

  }
  
  postOrder(order: any): Promise<any> {
    throw new Error('Method not implemented.');
  }

  getOrder(order_id: number): Promise<OrderEntity> {
    throw new Error('Method not implemented.');
  }

  getOrdersByLocalId(): Observable<OrderEntity[]> {
    return this.http.get<OrderEntity[]>(`${environment.host}orders/all`)
  }

  putOrder(order: OrderEntity): Observable<any> {
    return this.http.put(`${environment.host}orders`, order)
  }

  deleteOrder(order_id: number): Observable<any> {
    return this.http.delete(`${environment.host}orders/${order_id}`)
  }
}



