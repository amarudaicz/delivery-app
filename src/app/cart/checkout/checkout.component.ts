import { ChangeDetectionStrategy } from '@angular/compiler';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  
  form:FormGroup

  constructor(public theme:ThemesService, private formBuilder:FormBuilder){
    this.form = this.formBuilder.group({
      name:['', Validators.required],
      direcction:['',Validators.required],
      payMethod:['', Validators.required],
      amountReceived:['', Validators.required],
      reference:['' ], 
      shippingMethod:['', Validators.required]
    })

  }
    ngOnInit(): void {
      this.form.valueChanges.subscribe((changes:any)=>{

        console.log(changes);
        
        this.formChange();
      }) 
        

    

  }

  getErrorMessage(control:string) {
    
    return this.form.controls[control].hasError('required')? 'Este campo es requerido' : ''

  }


  formChange(){

    console.log(this.form.value);
    


  }


  redirectWP(){
    
  }

}
