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
  productsByCategory = new BehaviorSubject<Product[]>([])

  constructor(
    private localData:LocalDataService
    )
  {
    this.localData.getCategories().subscribe(data=>{
      console.log(data);
    
      if (!this.category_id && data.length) {
        this.setCategory(data![0].id)
      }

    })


  }



  setCategory(id:number){
    this.category_id = id
    this.localData.getProducts$().subscribe(products=>{
      const data = products.filter(p=> p.category_id === id)
      this.productsByCategory.next(data)
    })
      
  }


  




}
