import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user-interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InfoPlanBasicComponent } from './components/info-plan-basic/info-plan-basic.component';
import { MercadopagoService } from 'src/app/services/mercadopago/mercadopago.service';
import { Subscription } from 'src/app/interfaces/subscription-interface';
import { catchError, throwError } from 'rxjs';
import { NotificationsAdminService } from 'src/app/services/notifications-admin/notifications-admin.service';
import { handleError } from 'src/app/utils/handle-error-http';

@Component({
  selector: 'app-subscription-state',
  templateUrl: './subscription-state.component.html',
  styleUrls: ['./subscription-state.component.scss']
})
export class SubscriptionStateComponent implements OnInit {

  user?:User
  subscription?:Subscription
  hasFreeTier?:boolean
  disableButtons:boolean = false

  constructor(public auth:AuthService, private modal:MatDialog, private mp:MercadopagoService, private notificationsAdmin:NotificationsAdminService){
    
    
  }


  ngOnInit(): void {

    this.auth.getUser().subscribe(user =>{
      this.user = user
      
      console.log(user.register_date, typeof(user.register_date));
    })

    this.mp.getSubscription().subscribe(sub=>{
      this.subscription = sub
      this.hasFreeTier = this.hasFreeTrial(sub.auto_recurring.start_date)
      console.log(this.hasFreeTier);
      
    })
    
  }


  getDateFormat(date:any){
    return new Date(date).toLocaleDateString()
  }

  getFreeTrialFinish(){
    let date = new Date(this.subscription?.auto_recurring.start_date!) 
    date.setDate(date.getDate() + 14)

    return date.toLocaleDateString()
  }

  moreInfoPlanBasic(){
    this.modal.open(InfoPlanBasicComponent)
  }

  hasFreeTrial(fecha: Date): boolean {
    const now = new Date();
    const startFreeTrial = new Date(fecha);
    startFreeTrial.setMonth(startFreeTrial.getMonth() + 1);

    return now <= startFreeTrial;
  }

  putStatusSubscription(status:string){
    const newState= status === 'authorized' ? 'paused' : 'authorized'
    this.disableButtons = true

    this.mp.putSubscription(newState).pipe(catchError(err=>{
      this.notificationsAdmin.new('A ocurrido un error al intentar detener su suscripcion, porfavor contacte al soporte')
      this.disableButtons = false
      return throwError(()=> new Error(err))
    })).subscribe(subUpdated=>{
      this.disableButtons = false
      console.log(subUpdated);
      this.subscription = subUpdated
    })
  }
}
