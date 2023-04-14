import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from 'src/app/interfaces/category-interfaz';
import { Product } from 'src/app/interfaces/product-interface';
import { LocalDataService } from '../localData/local-data.service';

@Injectable({
  providedIn: 'root'
})
export class PreviewCategoryService {


  categoryId?:number
  productsByCategory = new BehaviorSubject<Product[]|boolean>( false )

  constructor(
    private localData:LocalDataService
    )
  {
    this.localData.getCategories().subscribe(data=>{
      if (!this.categoryId && data) {
        this.setCategory(data[0].id)
      }
    })


  }



  setCategory(id:number){
    this.categoryId = id
    this.localData.getProducts$().subscribe(products=>{
      const data = products.filter(p=> p.categoryId === id)
      this.productsByCategory.next(data)
    })
      
  }

  getProductsByCategory(){
    return this.productsByCategory
  }

  




}
