import { Injectable } from '@angular/core';
import { ItemCart } from 'src/app/interfaces/itemCart-interfaz';
import { Order, OrderHistory } from 'src/app/interfaces/order-interfaz';
import { LocalDataService } from '../localData/local-data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environment';
import { AuthService } from '../auth/auth.service';
import { Local } from 'src/app/interfaces/local-interface';

@Injectable({
  providedIn: 'root'
})


export class OrdersService {

  local?:Local

  constructor(private localService:LocalDataService, private http:HttpClient, private auth:AuthService) { 
    this.localService.local$.subscribe(local=>{
      this.local = local
    })

  }
  
  postOrder(order:OrderHistory ){
    order.local_id = this.local?.id!
    order.local = this.local!
    this.saveOrderLocal(order)
    return this.http.post(`${environment.host}orders`, order)
  }


  saveOrderLocal(order:OrderHistory){
    const history = this.getHistoryOrdersLocal()
    order.local_name = this.local?.name!
    order.date = new Date()
    if (!history) {
      this.setHistoryOrdersLocal([order])
      return
    }

    if (history.length >= 4) {
      history.shift()
    }

    history?.push(order)
    this.setHistoryOrdersLocal(history)
  }

  getHistoryOrdersLocal(): OrderHistory[] | null{
    return JSON.parse(localStorage.getItem('history-orders')!)
  }

  setHistoryOrdersLocal(history:Order[]){
    localStorage.setItem('history-orders', JSON.stringify(history) )

  }

}
