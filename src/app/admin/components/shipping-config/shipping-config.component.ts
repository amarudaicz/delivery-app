import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { AdminService } from 'src/app/services/admin/admin.service';
import { NotificationsAdminService } from 'src/app/services/notifications-admin/notifications-admin.service';

@Component({
  selector: 'app-shipping-config',
  templateUrl: './shipping-config.component.html',
  styleUrls: ['./shipping-config.component.scss']
})
export class ShippingConfigComponent {

  form:FormGroup
  editing:boolean = false
  loadForm:boolean = false
  isChangingDelivery=false

  constructor(private formBuilder:FormBuilder, private adminService:AdminService, private notificationsAdmin:NotificationsAdminService){
    this.form = this.formBuilder.group({
      delivery:'',
      pick_in_local:'',
      delivery_cost:['', ],
      delivery_time:['', ]
    })

    this.adminService.local$.subscribe(local=>{
      if (local?.shipping) {
        this.form.patchValue(local?.shipping)
      }
      
      this.form.disable()
    })

    
    this.form.get('delivery')?.valueChanges.subscribe((change) => {
      // Check if the change is triggered by user interaction
      if (!this.isChangingDelivery) {
        // Update the value of the checkbox based on user interaction
        this.isChangingDelivery = true;
        this.form.get('delivery')?.setValue(change, { emitEvent: false });
        this.isChangingDelivery = false;
      }

      // Clear existing validators
      this.form.get('delivery_cost')?.clearValidators();
      this.form.get('delivery_time')?.clearValidators();

      if (change) {
        // Add validators for delivery_cost and delivery_time if delivery is true
        this.form.get('delivery_cost')?.setValidators([Validators.required]);
        this.form.get('delivery_time')?.setValidators([
          Validators.pattern(/^\d{1,2}\s-\s\d{1,2}$/),
          Validators.required,
        ]);
      }

      // Update the validity of the controls after changing validators
      this.form.get('delivery_cost')?.updateValueAndValidity();
      this.form.get('delivery_time')?.updateValueAndValidity();
    });
  }


  saveForm(){
    console.log(this.form );
    

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
    
    this.adminService.updateLocal({shipping:this.form.value}).subscribe(res=>{
      this.notificationsAdmin.new('Metodos de envio actualizados con exito', 'Ok')
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
    this.form.get('delivery')?.value ? null : this.form.get('delivery_cost')?.setValue(null) 
    this.form.get('delivery')?.value ? null : this.form.get('delivery_time')?.setValue(null) 
  }


}