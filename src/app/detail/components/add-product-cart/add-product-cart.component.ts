import { Component, Input, OnInit, OnChanges,ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-add-product-cart',
  templateUrl: './add-product-cart.component.html',
  styleUrls: ['./add-product-cart.component.scss'],
  changeDetection:ChangeDetectionStrategy.Default
})
export class AddProductCartComponent implements OnInit {

  constructor(public theme:ThemesService, private FormBuilder:FormBuilder){

    this.form = this.FormBuilder.group({
      options:['', Validators.required],
      especifications:['', Validators.required],
      quantity:[1, [Validators.required, Validators.min(1)]]
    })
  }

  ngOnInit(): void {

  }

  @Input() product:any
  
  
  form:FormGroup
  quantity:number = 1
  shakeError:string = ''

  saveOrder(){
    this.setError()

    


    console.log(this.form);
    console.log(this.product);
    
  }

  setError(){
    if (this.form.controls['options'].invalid){
      this.shakeError = 'shake'
      setTimeout(() => {this.shakeError = ''}, 500);  
    }

    this.form.markAsTouched()
    
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
