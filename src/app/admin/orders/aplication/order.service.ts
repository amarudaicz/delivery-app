import { Injectable } from "@angular/core";
import { OrderRepository } from "../domain/order-repository";
import { MysqlRepositoryService } from "../repository/mysql-repository.service";
import { OrderEntity, StatusType } from "../domain/order-entity";
import { Order } from "src/app/interfaces/order-interfaz";
import { BehaviorSubject } from "rxjs";
import { OrdersUseCase } from "./orders-use-cases";

@Injectable({
    providedIn: 'root'
  })
  
export class OrderService {
  private columnsMode$: BehaviorSubject<0|1> = new BehaviorSubject<0|1>(0);
  public orders$: BehaviorSubject<OrderEntity[]|undefined> = new BehaviorSubject<OrderEntity[]|undefined>(undefined);

  constructor(private ordersUseCase:OrdersUseCase){ 
    
        
  }

  getMode(){
    return this.columnsMode$
  }


  setMode(mode:0|1){
    this.columnsMode$.next(mode)
  }

  getOrders(){
    this.ordersUseCase.getAllOrders().subscribe(orders=>{
      this.orders$.next(orders.reverse())
    })
  }




}
