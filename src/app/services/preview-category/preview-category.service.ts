import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from 'src/app/interfaces/category-interfaz';
import { Product } from 'src/app/interfaces/product-interface';
import { LocalDataService } from '../localData/local-data.service';

@Injectable({
  providedIn: 'root'
})
export class PreviewCategoryService {


  category_id?:number
  productsByCategory = new BehaviorSubject<Product[]|boolean>( false )

  constructor(
    private localData:LocalDataService
    )
  {
    this.localData.getCategories().subscribe(data=>{
      console.log(data);
      console.log(this.category_id);
      if (!this.category_id && data?.length !== 0) {
        
        this.setCategory(data![0].id)
      }
    })


  }



  setCategory(id:number){
    this.category_id = id
    this.localData.getProducts$().subscribe(products=>{
      const data = products.filter(p=> p.category_id === id)
      console.log(data);
      
      this.productsByCategory.next(data)
    })
      
  }

  getProductsByCategory(){
    return this.productsByCategory
  }

  




}
