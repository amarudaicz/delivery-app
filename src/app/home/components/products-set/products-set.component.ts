import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product-interface';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-products-set',
  templateUrl: './products-set.component.html',
  styleUrls: ['./products-set.component.scss']
})
export class ProductsSetComponent implements OnInit {
  products?:Product[]
  
  constructor(public theme:ThemesService, private localService:LocalDataService){

  }

  ngOnInit(): void { 
    this.localService.getProducts().subscribe(data =>{
      this.products = data
    })
    


  }

  



}
