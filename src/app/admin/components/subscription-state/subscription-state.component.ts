import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user-interface';
import { AuthService } from 'src/app/services/auth/auth.service';
import { InfoPlanBasicComponent } from './components/info-plan-basic/info-plan-basic.component';
import { MercadopagoService } from 'src/app/services/mercadopago/mercadopago.service';
import { Subscription } from 'src/app/interfaces/subscription-interface';
import { catchError, throwError } from 'rxjs';
import { handleError } from 'src/app/utils/handle-error-http';
import { AdminService } from 'src/app/services/admin/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(public auth:AuthService, private modal:MatDialog, private mp:MercadopagoService, private toast:MatSnackBar, private adminService:AdminService){
    
    
  }


  ngOnInit(): void {
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
    date.setDate(date.getDate() + 30)

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

  putStatusSubscription(status:string, deleteAccount?:boolean){
    const newState = status === 'authorized' ? 'paused' : 'authorized'

    this.disableButtons = true

    this.mp.putSubscription(newState).pipe(catchError(err=>{
      this.toast.open('A ocurrido un error al intentar detener su suscripcion, porfavor contacte al soporte')
      this.disableButtons = false
      return throwError(()=> new Error(err))
    })).subscribe(subUpdated=>{
      this.disableButtons = false
      console.log(subUpdated);
      this.subscription = subUpdated
    })
  }


  deleteAccount(){
    const alert = this.toast.open('Realmente quiere eliminar su cuenta, se perderan todos sus datos incluida su tienda activa?', 'Si, eliminar', {duration:5000})

    const supr = () =>{
      
      this.adminService.deleteAccount().pipe(catchError(err=>{
        this.toast.open('A ocurrido un error al intentar eliminar su cuenta, porfavor contacte al soporte', ' ', {duration:5000})
        this.disableButtons = false
        return throwError(()=> new Error(err))
      })).subscribe(res=>{
        this.toast.open('Su cuenta fue eliminada con exito')
        this.auth.deleteToken()
        this.disableButtons = false
        setTimeout(() =>location.replace('/'), 500);
      })
    }
    this.disableButtons = true
    
    alert.afterDismissed().subscribe(dimiss=> this.disableButtons = false)
    alert.onAction().subscribe(action => supr())

  }
}
