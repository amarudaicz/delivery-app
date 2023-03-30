import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params, Route } from '@angular/router';
import { ThemesService } from 'src/app/services/themes/themes.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-info-product',
  templateUrl: './info-product.component.html',
  styleUrls: ['./info-product.component.scss']
})
export class InfoProductComponent implements OnInit {
  constructor(public theme:ThemesService, private route:ActivatedRoute, private location:Location){

  }
  ngOnInit(): void {
    console.log(this.route.snapshot.params);
    console.log(this.product);
    
    this.productForChild = this.product
    
  }
  
  @Input() product:any
  @Input() modePreview:boolean = false
  productForChild:any
  favClicked:boolean = false

  
  redirectBack(){
    this.location.back()
  }

  toogleFav(){
    this.favClicked = !this.favClicked
  }


}
