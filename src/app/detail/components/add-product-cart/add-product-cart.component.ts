import { Component, Input, OnInit, OnChanges,ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-add-product-cart',
  templateUrl: './add-product-cart.component.html',
  styleUrls: ['./add-product-cart.component.scss'],
  changeDetection:ChangeDetectionStrategy.Default
})
export class AddProductCartComponent implements OnInit, OnChanges {

  constructor(public theme:ThemesService, private FormBuilder:FormBuilder){

    this.form = this.FormBuilder.group({
      options:['', Validators.required],
      especifications:['', Validators.required],
      quantity:[1, [Validators.required, Validators.min(1)]]
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    
  }

  
  ngOnInit(): void {

  }

  form:FormGroup
  
  @Input() dataOptions:any

  quantity:number = 1

  saveOrder(){
    console.log(this.form);
  }


  setError(control:string){
    return this.form.controls[control].valid && this.form.controls[control].markAsTouched
  }
  
  setQuantity(number:number){

    if (number === 1) {
      this.quantity++;
    } else {
      if (this.quantity > 1) {
        this.quantity--;
      }
    }
    
    this.form.controls['quantity'].setValue(this.quantity)

  }

      



  

}
