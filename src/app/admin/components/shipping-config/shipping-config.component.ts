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
        this.form.patchValue({
          delivery:local.shipping.delivery ? true : false,
          delivery_cost:local.shipping.delivery.delivery_cost,
          delivery_time:local.shipping.delivery.delivery_time,
          pick_in_local:local.shipping.pick_in_local ? true : false
        })
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
    
    this.adminService.updateLocal({shipping:this.getShippingMethods()}).subscribe(res=>{
      this.notificationsAdmin.new('Metodos de envio actualizados con exito', 'Ok')
      this.editing = false
      this.loadForm = false
      this.form.disable()
      this.form.markAsPristine()

    })

  } 


  getShippingMethods(){
    const shippingMethods:any = {}

    if (this.form.get('delivery')?.value){
      shippingMethods.delivery = {
        method:'delivery',
        description:'Envio a domicilio',
        delivery_time:this.form.get('delivery_time')?.value,
        delivery_cost:this.form.get('delivery_cost')?.value,
      }
    }

    if (this.form.get('pick_in_local')?.value){
      shippingMethods.pick_in_local= {
        method:'pick_in_local',
        description:'Buscar en el local',
      }
    }

    return shippingMethods
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