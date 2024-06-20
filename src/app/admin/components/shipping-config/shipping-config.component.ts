import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  loadMap:boolean=false

  constructor(private formBuilder:FormBuilder, private adminService:AdminService, private notificationsAdmin:NotificationsAdminService){
    this.form = this.formBuilder.group({
      delivery:'',
      pick_in_local:'',
      delivery_cost:['', ],
      delivery_time:['', ],
      cords:[null, []]
    })

    this.formCostShipping = this.formBuilder.group({
      shippingCosts:this.formBuilder.array([])
    }, Validators.required)

    this.shippingCostsArray = this.formCostShipping.get('shippingCosts') as FormArray
    
    this.adminService.local$.subscribe(local=>{ 
      this.patchForms(local!)
    })


    this.setFormChanges()

    
   
  }

  ngOnInit(): void {
  }

  saveForm(){
    console.log(this.form );
    const hasDelivery = this.form.get('delivery')?.value;

    if(this.form.invalid || (hasDelivery && this.formCostShipping.invalid)){
      this.notificationsAdmin.new('Completar los campos requeridos')
      this.form.markAllAsTouched()
      this.formCostShipping.markAllAsTouched()
      return
    }

    if (!this.form.get('cords')?.value && hasDelivery ) {
      this.notificationsAdmin.new('Debes fijar una ubicación para calcular los costos de envío ')
      return
    }

    if (!this.form.dirty && !this.formCostShipping.dirty ){
      this.editing = false
      this.form.disable()
      this.formCostShipping.disable()
      return
    }

    this.loadForm = true


    // this.checkForm()
    
    this.adminService.updateLocal({shipping:this.getShippingMethods(), cords:this.form.get('cords')?.value}).pipe(
      catchError(({error})=>{
        this.loadForm = false
        this.editing = false
        this.blockForm()
       return handleError(undefined, this.notificationsAdmin)
      })

    ).subscribe(res=>{
      this.notificationsAdmin.new('Métodos de entrega actualizados con éxito', 'Ok')
      this.editing = false
      this.loadForm = false
      this.blockForm()
      this.adminService.getLocal().subscribe()
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
  }
  

  patchForms(local:Local){

    if (local?.shipping) {
      this.form.patchValue({
        delivery:local.shipping.delivery ? true : false,
        delivery_cost:local.shipping.delivery?.delivery_cost,
        delivery_time:local.shipping.delivery?.delivery_time,
        pick_in_local:local.shipping.pick_in_local ? true : false,
        cords:local?.cords
      })

      local.shipping.delivery?.shipping_costs?.forEach( e => this.shippingCostsArray.push(this.createRangeGroup(e.distance, e.cost)))
    }
    

    this.shippingCostsArray.controls.sort((a: AbstractControl, b: AbstractControl) => {
      const valorA = a.get('distance')?.value;
      const valorB = b.get('distance')?.value;

      // Compara los valores numéricos
      return valorA - valorB;
    });

    this.form.disable()
    this.formCostShipping.disable()
  }


  getCords(cords:{lat:number, lng:number}){
    console.log(cords);
    this.form.get('cords')?.setValue(`${cords.lng},${cords.lat}`)
    this.form.markAsDirty()
  }


  getRangeInitial(actualDistance:any){
    const ranges:any[] = this.shippingCostsArray.value
    const menores = []
    const mayores = []
    let initial=0
    let final=0

    for (const r of ranges) {
      if (r.distance < actualDistance ) {
        menores.push(r.distance)
      }else{
        mayores.push(r.distance)
      }
    }      

    initial = Math.max(...menores)
    final = Math.min(...mayores)
    console.log(initial);
    
    return `${menores.length ? initial : 0} Hasta ${final} Kilómetros`
  }

}