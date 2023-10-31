import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, take } from 'rxjs';
import { Local } from 'src/app/interfaces/local-interface';
import { AdminService } from 'src/app/services/admin/admin.service';
import { NotificationsAdminService } from 'src/app/services/notifications-admin/notifications-admin.service';
import { handleError } from 'src/app/utils/handle-error-http';

@Component({
  selector: 'app-shipping-config',
  templateUrl: './shipping-config.component.html',
  styleUrls: ['./shipping-config.component.scss']
})
export class ShippingConfigComponent implements OnInit {

  form:FormGroup
  formCostShipping:FormGroup
  shippingCostsArray:FormArray
  editing:boolean = false
  loadForm:boolean = false
  isChangingDelivery=false
  local?:Local

  constructor(private formBuilder:FormBuilder, private adminService:AdminService, private notificationsAdmin:NotificationsAdminService){
    this.form = this.formBuilder.group({
      delivery:'',
      pick_in_local:'',
      delivery_cost:['', ],
      delivery_time:['', ]
    })

    this.formCostShipping = this.formBuilder.group({
      shippingCosts:this.formBuilder.array([])
    }, Validators.required)

    this.shippingCostsArray = this.formCostShipping.get('shippingCosts') as FormArray
    
    this.adminService.local$.subscribe(local=>{ 
      this.patchForms(local!)
      console.log(local, '********************************');
      
    })


    this.setFormChanges()

    
   
  }

  ngOnInit(): void {
  }

  saveForm(){
    console.log(this.form );
    

    if(this.form.invalid || (this.form.get('delivery')?.value && this.formCostShipping.invalid)){
      this.notificationsAdmin.new('Completar los campos requeridos')
      this.form.markAllAsTouched()
      this.formCostShipping.markAllAsTouched()
      return
    }

    if (!this.form.dirty && !this.formCostShipping.dirty ){
      console.log(this.form, this.formCostShipping);
      
      this.editing = false
      this.form.disable()
      this.formCostShipping.disable()
      return
    }

    this.loadForm = true


    this.checkForm()
    
    this.adminService.updateLocal({shipping:this.getShippingMethods()}).pipe(
      catchError(({error})=>{
        this.loadForm = false
        this.editing = false
        this.blockForm()
       return handleError(error, this.notificationsAdmin)
      })

    ).subscribe(res=>{
      this.notificationsAdmin.new('Metodos de entrega actualizados con exito', 'Ok')
      this.editing = false
      this.loadForm = false
      this.blockForm()
   
    })

  } 

  blockForm(){
    this.form.disable()
    this.formCostShipping.disable()
    this.form.markAsPristine()
    this.formCostShipping.markAsPristine()
  }

  getShippingMethods(){
    const shippingMethods:any = {}
    console.log(this.formCostShipping);
    
    if (this.form.get('delivery')?.value){
      shippingMethods.delivery = {
        method:'delivery',
        description:'Envío a domicilio',
        delivery_time:this.form.get('delivery_time')?.value,
        delivery_cost:this.form.get('delivery_cost')?.value,
        shipping_costs:this.formCostShipping.get('shippingCosts')?.value
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
    this.formCostShipping.enable()
  }


  checkForm(){
    this.form.get('delivery')?.value ? null : this.form.get('delivery_cost')?.setValue(null) 
    this.form.get('delivery')?.value ? null : this.form.get('delivery_time')?.setValue(null) 
  }


  newRangeShipping(){
    this.shippingCostsArray.push(this.createRangeGroup())
    this.formCostShipping.markAsDirty()
  }

  removeRangeShipping(index:number){
    this.shippingCostsArray.removeAt(index)
    this.formCostShipping.markAsDirty()
  }
  
  createRangeGroup(distance?:number, cost?:number){
    return this.formBuilder.group({
      distance:[distance ? distance : null, Validators.required],
      cost:[cost ? cost : null, Validators.required]
    })

  }


  setFormChanges(){
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
        this.addValidatorsForms()
      }

      // Update the validity of the controls after changing validators
      this.form.get('delivery_cost')?.updateValueAndValidity();
      this.form.get('delivery_time')?.updateValueAndValidity();

    });
  }


  addValidatorsForms(){

    this.form.get('delivery_cost')?.setValidators([Validators.required]);
    this.form.get('delivery_time')?.setValidators([
      Validators.pattern(/^\d{1,2}-\d{1,2}$/),
      Validators.required,
    ]);
  }
 

  patchForms(local:Local){

    if (local?.shipping) {
      this.form.patchValue({
        delivery:local.shipping.delivery ? true : false,
        delivery_cost:local.shipping.delivery.delivery_cost,
        delivery_time:local.shipping.delivery.delivery_time,
        pick_in_local:local.shipping.pick_in_local ? true : false
      })

      local.shipping.delivery.shipping_costs.forEach( e => this.shippingCostsArray.push(this.createRangeGroup(e.distance, e.cost)))
    }
    
    this.form.disable()
    this.formCostShipping.disable()
  }

}