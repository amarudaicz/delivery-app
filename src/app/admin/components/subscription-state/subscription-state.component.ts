import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user-interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InfoPlanBasicComponent } from './components/info-plan-basic/info-plan-basic.component';

@Component({
  selector: 'app-subscription-state',
  templateUrl: './subscription-state.component.html',
  styleUrls: ['./subscription-state.component.scss']
})
export class SubscriptionStateComponent implements OnInit {

  user?:User


  constructor(public auth:AuthService, private modal:MatDialog){
    
    
  }


  ngOnInit(): void {

    this.auth.getUser().subscribe(user =>{
      this.user = user
      
      console.log(user.register_date, typeof(user.register_date));
    })
    
  }


  getDateFormat(date:any){
    return new Date(date).toLocaleDateString()
  }


  getPlanFinish(){
    let date = new Date(this.user!.register_date) 
    date.setDate(date.getDate() + 14)

    return date.toLocaleDateString()
  }

  getNextPay(){
    let date = new Date(this.user!.last_pay) 
    date.setDate(date.getDate() + 31)

    return date.toLocaleDateString()
  }

  moreInfoPlanBasic(){
    this.modal.open(InfoPlanBasicComponent)
  }
}
