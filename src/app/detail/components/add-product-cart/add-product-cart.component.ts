import { Component, Input, OnInit } from '@angular/core';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-add-product-cart',
  templateUrl: './add-product-cart.component.html',
  styleUrls: ['./add-product-cart.component.scss']
})
export class AddProductCartComponent implements OnInit {

  constructor(public theme:ThemesService){
  }

  ngOnInit(): void {
    console.log(this.options);
  }

  @Input() options:any

  quantity:number = 1
  

}
