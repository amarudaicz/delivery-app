import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Route } from '@angular/router';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-info-product',
  templateUrl: './info-product.component.html',
  styleUrls: ['./info-product.component.scss']
})
export class InfoProductComponent implements OnInit {
  constructor(public theme:ThemesService, private route:ActivatedRoute){

  }
  ngOnInit(): void {
    console.log(this.route.snapshot.params);
    console.log(this.product);
    
    this.options = this.product.options
    
  }
  
  @Input() product:any
  options:any
  


}
