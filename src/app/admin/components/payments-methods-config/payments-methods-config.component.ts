import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin/admin.service';
import { NotificationsAdminService } from 'src/app/services/notifications-admin/notifications-admin.service';

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
      cbu:['',  []]
    })

    this.adminService.local$.subscribe(local=>{

      if (local?.pay_methods) {
        this.form.patchValue(local.pay_methods)
      }
      this.form.disable()
    })

    this.form.get('transfer')?.valueChanges.subscribe((change) => {
      if (!this.isChangingTransfer) {
        this.isChangingTransfer = true;
        this.form.get('transfer')?.setValue(change, { emitEvent: false });
        this.isChangingTransfer = false;
      }
      this.form.get('cbu')?.clearValidators();
      if (change) {
        this.form.get('cbu')?.setValidators([Validators.required]);
      }
      this.form.get('cbu')?.updateValueAndValidity();
    });

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
    
    this.adminService.updateLocal({pay_methods:this.form.value}).subscribe(res=>{
      this.notificationsAdmin.new('Metodos de pago actualizados con exito', 'Ok')
      this.editing = false
      this.loadForm = false
      this.form.disable()
      this.form.markAsPristine()

    })

  } 
  editForm(){
    this.editing = true
    this.form.enable()

    
  }




  checkForm(){
    this.form.get('transfer')?.value ? null : this.form.get('cbu')?.setValue(null) 
  }
}
