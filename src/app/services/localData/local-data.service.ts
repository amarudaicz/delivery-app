import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/app/environment';
import { Category } from 'src/app/interfaces/category-interfaz';
import { Local } from 'src/app/interfaces/local-interface';
import { Product } from 'src/app/interfaces/product-interface';
import { deleteRepeatElement } from 'src/app/utils/deleteRepeatElement';
import { ThemesService } from '../themes/themes.service';

@Injectable({
  providedIn: 'root',
})
export class LocalDataService {
  constructor(private http: HttpClient, private theme: ThemesService) {
    
  }

  
  public local = new BehaviorSubject<any>(undefined);
  private products = new BehaviorSubject<Product[]>([]);
  private categories = new BehaviorSubject<Category[]>([])


  setLocal(name: string | null) {
    this.http
      .get<Local>(environment.host + 'locals/1')//puntopizza
      .subscribe((data) => {
        this.theme.setTheme(data.theme);
        this.local.next(data);
      });
  }

  setProducts(local: string | null) {
    console.log(local);
    this.http
      .get<Product[]>(environment.host + local)
      .subscribe((data) => { 
        this.products.next(data);
        this.categories.next(this.cleanCategories(data))
      });
  }

  getProducts() {    
    return this.http.get<Product[]>(environment.host + localStorage.getItem('admin-local'), {})
  }

  getProducts$() {
    return this.products;
  }

  getCategories(){
    return this.categories
  }

  private cleanCategories(products:Product[]) {
    
    const categories = products.map((e) => {
      return { name: e.category, image: e.categoryImage, id: e.categoryId };
    });
    
    return deleteRepeatElement(categories);
  }




}
