import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/interfaces/product-interface';
import { LocalDataService } from '../localData/local-data.service';

@Injectable({
  providedIn: 'root'
})
export class PreviewCategoryService {


  categoryId?:number
  products = new BehaviorSubject<Product[]>([])


  constructor(
    private localData:LocalDataService
    
  ) {
  }



  setCategory(id:number){

    this.categoryId = id
    this.localData.getProducts().subscribe(products=>{
      const data = products.filter(p=> p.categoryId === id)
      this.products.next(data)
      console.log(data);
    })
      
  }

  getProductsByCategory(){
    return this.products
  }




}
