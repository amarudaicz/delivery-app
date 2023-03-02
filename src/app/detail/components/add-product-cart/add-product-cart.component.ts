import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-add-product-cart',
  templateUrl: './add-product-cart.component.html',
  styleUrls: ['./add-product-cart.component.scss']
})
export class AddProductCartComponent implements OnInit {

  constructor(public theme:ThemesService, private FormBuilder:FormBuilder){

    this.form = this.FormBuilder.group({
      options:['', Validators.required],
      especifications:['', Validators.required],
      quantity:['', [Validators.required, Validators.min(1)]]
    })
  }

  
  ngOnInit(): void {
    this.form.controls['quantity'].setValue(this.quantity)
  }

  form:FormGroup
  
  @Input() dataOptions:any

  quantity:number = 1

  saveOrder(){
    this.form.controls['quantity'].setValue(this.quantity)

    console.log(this.form);
    

  }


  setError(control:string){
    return this.form.controls[control].valid
  }
  

}
