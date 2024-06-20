import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin/admin.service';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { NotificationsAdminService } from 'src/app/services/notifications-admin/notifications-admin.service';

@Component({
  selector: 'app-set-buyer-fields',
  templateUrl: './set-buyer-fields.component.html',
  styleUrls: ['./set-buyer-fields.component.scss']
})
export class SetBuyerFieldsComponent {




  form:FormGroup
  formExample:FormGroup
  local:any
  constructor(public dialogRef: MatDialogRef<SetBuyerFieldsComponent>, private fb:FormBuilder, public adminService:AdminService, public localService:LocalDataService, private notify:NotificationsAdminService){


    this.form = this.fb.group({
      email:[false],
      postalCode:[false],
      incomingMoney:[false]
    })

    this.formExample = this.fb.group({
      name:[''],
      phone:[null],
      email:[''],
      postalCode:[null],
      incomingMoney:[null],
      direction: [null],
      streetNumber: [null],
    })

    this.adminService.local$.subscribe(local=>{
      if (!local) return 
        
      this.local = local
      console.log(this.local);
      this.form.patchValue(this.local.fields_checkout)
    })




  }


  saveConfig(){
    console.log(this.form.value);
    this.adminService.updateLocal({fields_checkout:JSON.stringify(this.form.value)}).subscribe(res=>{
      this.notify.new('Formulario de compra actualizado con éxito')
      this.adminService.local$.next({...this.local, fields_checkout:this.form.value})
      this.dialogRef.close()
    })
  }


  isFieldtrue(control:string){
    return this.form.get(control)?.value
  }
}
