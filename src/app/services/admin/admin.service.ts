import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map, BehaviorSubject } from 'rxjs';
import { environment } from 'src/app/environment';
import { Category } from 'src/app/interfaces/category-interfaz';
import { Local } from 'src/app/interfaces/local-interface';
import { OptionProduct } from 'src/app/interfaces/optionProduct-interface';
import { Product } from 'src/app/interfaces/product-interface';
import { deleteRepeatElement } from 'src/app/utils/deleteRepeatElement';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
    this.credentials = {
      table: localStorage.getItem('admin-local'),
      local_id: localStorage.getItem('local_id')

    }
  }


  credentials: any
  local?: Local
  products?: Product[]
  categories?: any[]
  updateListProducts = new BehaviorSubject<boolean>(false);
  optionsGroup = new BehaviorSubject<OptionProduct[]>([]);

  postProduct(product: any) {

    console.log(product);

    const dataProduct = new FormData()
    Object.keys(product).forEach(k => {
      console.log(k);
      console.log(product[k]);

      dataProduct.append(k, product[k])
    })

    return this.http.post(environment.host + `products`, dataProduct)

  }

  updateProduct(product: any) {
    const formData = new FormData()
    console.log(product);

    Object.keys(product).forEach(k => {
      console.log(k);
      console.log(product[k]);

      formData.append(k, product[k])
    })

    return this.http.put(environment.host + `products`, formData)
  }

  deleteProduct(id: number) {
    return this.http.delete(environment.host + `products/${id}`)

  }




  public getLocal(): Observable<any> {
    if (this.local) {
      return of(this.local);
    } else {
      return this.http.get<Local[]>(environment.host + `locals`).pipe(
        map(data => {
          this.local = data[0];
          this.optionsGroup.next(data[0].options_group)
          return data[0];
        })
      );
    }
  }

  updateLocal(data: any) {
    return this.http.put(environment.host + 'locals/put-one', data)
  }

  postOptionGroup(data: any) {
    return this.http.put(environment.host + 'locals/put-one', data)
  }



  getProductsAdmin() {
    console.log(this.products);
    if (this.products) {
      return of(this.products)
    }

    return this.http.get<Product[]>(environment.host + `products`).pipe(
      map(data => {
        this.products = data;
        return data;
      })
    );
  }

  getCategories() {

    if (this.categories) {
      return of(this.categories)
    } else {
      return this.http.get<Category[]>(environment.host + `admin/get-categories`).pipe(
        map(data => {
          this.categories = deleteRepeatElement(data)
          return deleteRepeatElement(data)

        })
      );
    }


  }


  updateOptionsGroup(data:{products:Product[] | any[], group:OptionProduct, variations:OptionProduct[]}){
    
    data.products = data.products.map(p => p.id)
    console.log(data);
    
    return this.http.put(environment.host + 'admin/options-group', data)

  }





  cleanCategories(products: Product[]) {

    const categories = products.map((e) => {
      return { name: e.category_name, image: e.category_image, id: e.category_id };
    });

    return deleteRepeatElement(categories);
  }


}
