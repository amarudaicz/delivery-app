import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product-interface';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import {DialogService} from 'primeng/dynamicdialog';
import { CartItemsComponent } from 'src/app/cart/cart-items/cart-items.component';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
  providers:[DialogService]
})
export class ListProductsComponent implements OnInit {
  products:any[]=[]


  constructor(private localService:LocalDataService, private primeDialog:DialogService){

  }


  ngOnInit(): void {
    this.localService.getProducts().subscribe((data)=>{
      console.log(data);
      
      this.products = data
    })
    
  }


  editProduct(product:any){
    this.primeDialog.open(CartItemsComponent, {
      header:'Editando Producto',
      width:'70%',
      data:product,
      maximizable: true
    })

  }

}
