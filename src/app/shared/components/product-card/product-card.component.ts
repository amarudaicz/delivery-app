import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product-interface';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  constructor(public themeService:ThemesService, private localService:LocalDataService){
  
  }

  ngOnInit(): void {
    
    
  }

  @Input() product:Product|any
  localName?:string
  






}
