import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { Local, PayMethods } from 'src/app/interfaces/local-interface';
import { AdminService } from 'src/app/services/admin/admin.service';
import { NotificationsAdminService } from 'src/app/services/notifications-admin/notifications-admin.service';
import { handleError } from 'src/app/utils/handle-error-http';

@Component({
  selector: 'app-payments-methods-config',
  templateUrl: './payments-methods-config.component.html',
  styleUrls: ['./payments-methods-config.component.scss']
})
export class PaymentsMethodsConfigComponent {
  form:FormGroup
  editing:boolean = false
  loadForm:boolean = false

  isChangingTransfer=false
  constructor(private formBuilder:FormBuilder, private adminService:AdminService, private notificationsAdmin:NotificationsAdminService){
    this.form = this.formBuilder.group({
      transfer:false,
      cash:[false,],
      cbu:[null],
      alias:[null],
      nameAccount:[null],
      entity:[]

    })

    this.adminService.local$.subscribe(local=> this.patchForm(local!))


    this.setValidators()

  }

  saveForm(){
    console.log(this.form);
    
    if (!this.form.get('cash')?.value && !this.form.get('transfer')?.value ) {
      this.notificationsAdmin.new('Debes tener como minimo un metodo de pago activo')
      return
    }

    if(this.form.invalid){
      this.notificationsAdmin.new('Completar los campos requeridos')
      return
    }

    if (!this.form.dirty){
      this.editing = false
      this.form.disable()
      return
    }

    this.loadForm = true

    this.checkForm()
    
    this.adminService.updateLocal({pay_methods:this.getPayMethods()}).pipe(
      catchError(({error})=>{
        this.editing = false;
        this.loadForm = false;
        return handleError(error, this.notificationsAdmin)
      })
    ).subscribe(res=>{
      this.notificationsAdmin.new('Metodos de pago actualizados con exito', 'Ok')
      this.editing = false
      this.loadForm = false
      this.form.disable()
      this.form.markAsPristine()

    })

  } 

  getPayMethods(){
    const payMethods:any = {}

    if (this.form.value.cash) {
      payMethods['cash'] = {
        method:'cash',
        description:'Efectivo'
      }
    }

    if (this.form.value.transfer) {
      payMethods['transfer'] = {
        method:'transfer',
        cbu:this.form.get('cbu')?.value,
        alias:this.form.get('alias')?.value,
        nameAccount:this.form.get('nameAccount')?.value,
        entity:this.form.get('entity')?.value,
        description:'Transferencia'
      }
    }

    return payMethods
  }

  editForm(){
    this.editing = true
    this.form.enable()

    
  }

  checkForm(){
    this.form.get('transfer')?.value ? null : this.form.get('cbu')?.setValue(null) 
  }


  patchForm(local:Local){
    if (!local) return

    if(!local.pay_methods) {
      this.form.disable()
      return
    }
    
    this.form.patchValue({
      transfer:local.pay_methods.transfer ? true: null,
      cash:local.pay_methods.cash ? true: null,
      cbu:local.pay_methods.transfer?.cbu,
      alias:local.pay_methods.transfer?.alias,
      nameAccount:local.pay_methods.transfer?.nameAccount,
      entity:local.pay_methods.transfer?.entity
    })

    this.form.disable()
    
  }



  setValidators(){
    const validator = Validators.required
    this.form.get('transfer')?.valueChanges.subscribe((value) => {
      console.log(value);
      
      if (value) {
        this.form.get('cbu')?.setValidators([validator]);
        this.form.get('alias')?.setValidators([validator]);
        this.form.get('entity')?.setValidators([validator]);
        this.form.get('nameAccount')?.setValidators([validator]);
      } else {
        this.form.get('cbu')?.clearValidators();
        this.form.get('alias')?.clearValidators();
        this.form.get('nameAccount')?.clearValidators();
        this.form.get('entity')?.clearValidators();
      }

      // Actualizar la validez de los campos
      this.form.get('cbu')?.updateValueAndValidity();
      this.form.get('alias')?.updateValueAndValidity();
      this.form.get('nameAccount')?.updateValueAndValidity();
      this.form.get('entity')?.updateValueAndValidity();
   
    });
  }
}
