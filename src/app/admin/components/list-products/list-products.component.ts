import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product-interface';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import { NewProductComponent } from '../new-product/new-product.component';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
  providers:[DialogService,DynamicDialogConfig]
})
export class ListProductsComponent implements OnInit {
  products?:Product[]
  filtredProducts?:Product[]
  
  refDialog?:DynamicDialogRef

  constructor(private localService:LocalDataService, private primeDialog:DialogService){
    

  }


  ngOnInit(): void {
    this.localService.getProducts().subscribe((data)=>{
      this.products = data
      this.filtredProducts = data
    })
      


    
  }


  editProduct(product:any){
    this.refDialog = this.primeDialog.open(NewProductComponent, {
      data:product,
      header:'Editando Producto',
      width:'90%',
      height:'90%',
      maximizable:true,
      baseZIndex:999
    })

  }


  filterProduct(value:string){
    console.log(value);
    
    if (value === '') {
      this.ngOnInit()
    }

    

    const normalizeValue = value.toLowerCase()
    this.filtredProducts = this.products?.filter(p => (p.nameProduct.toLowerCase()).includes(normalizeValue))
  }

}
