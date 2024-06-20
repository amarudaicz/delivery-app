import { Component, OnDestroy } from '@angular/core';
import { OrderService } from '../../aplication/order.service';
import { MatDialog } from '@angular/material/dialog';
import { SetBuyerFieldsComponent } from '../set-buyer-fields/set-buyer-fields.component';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-main-orders',
  templateUrl: './main-orders.component.html',
  styleUrls: ['./main-orders.component.scss']
})
export class MainOrdersComponent implements OnDestroy {

  mode:0|1 = 0
  modeSubscription:Subscription
  constructor(public orderService:OrderService, private dialog:MatDialog){

    this.modeSubscription = this.orderService.getMode().subscribe(mode=>{
      console.log(mode)
      this.mode = mode
    })
  }


  modalSetFields(){
    this.dialog.open(SetBuyerFieldsComponent, {})
  }

  
  changeMode(){
    this.orderService.setMode(this.mode ? 0 : 1)
  }

  ngOnDestroy(){
    this.modeSubscription.unsubscribe()
  }

}
