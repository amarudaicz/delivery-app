import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, map, BehaviorSubject, catchError, Subject } from 'rxjs';
import { environment } from 'src/app/environment';
import { Category } from 'src/app/interfaces/category-interfaz';
import { Local, Schedules } from 'src/app/interfaces/local-interface';
import { OptionProduct } from 'src/app/interfaces/optionProduct-interface';
import { Product } from 'src/app/interfaces/product-interface';
import { deleteRepeatElement } from 'src/app/utils/deleteRepeatElement';
import { handleError } from 'src/app/utils/handle-error-http';
import { NotificationsAdminService } from '../notifications-admin/notifications-admin.service';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  constructor(
    private http: HttpClient,
    private notificationsAdmin: NotificationsAdminService
  ) {

  }

  public local?: Local;
  products?: Product[];
  categories?: any[];
  updateListProducts = new BehaviorSubject<boolean>(false);
  optionsGroup = new BehaviorSubject<OptionProduct[]>([]);
  categories$ = new BehaviorSubject<any[]>([]);
  products$ = new BehaviorSubject<Product[]>([]);
  local$ = new BehaviorSubject<Local | undefined>(undefined);

  stats$ = new BehaviorSubject<{date:string, total_visits:number}[] | undefined>(undefined)
  sales$ = new BehaviorSubject<{date:string, ammount:number}[] | undefined>(undefined)
  loaderProducts = new Subject<boolean>()

  //PRODUCTSS!°!°°!°!
  postProduct(product: any) {
    return this.http.post(environment.host + `products`, product);
  }

  updateProduct(product: any) {
    return this.http.put(environment.host + `products`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(environment.host + `products/${id}`);
  }

  getProductsAdmin() {
    this.http
      .get<{local:Local, products:Product[]}>(environment.host + `locals`)
      .pipe(
        map((data) => {
          this.products$.next(data.products);
          this.products = data.products;
          return data;
        })
      ) 
      .subscribe();
  }

  stockProduct(id: number, stock: number) {
    return this.http.put(environment.host + 'products/update-stock', {
      id,
      stock,
    });
  }

  
  fixedProduct(id: number, fixed: number) {
    return this.http.put(environment.host + 'products/update-fixed', {
      id,
      fixed,
    });
  }

  //LOCAL!!!!!!!!

  public getLocal(): Observable<any> {
    return this.http.get<{local:Local, products:Product[]}>(environment.host + `locals`).pipe(
      map((data) => {
        this.local$.next(data.local);
        window.document.title = `Admin | ${data.local.name_url}`
        this.optionsGroup.next(data.local.options_group);
        this.products$.next(data.products);
        this.products = data.products;
        return data.local;   
      })
    );
  }

  updateLocal(data:any){
    return this.http.put(`${environment.host}locals`, data)
  }

  updateSchedules(data: Schedules) {
    return this.http.put(environment.host + 'locals/put-schedules', {
      schedules: data,
    });
  }

  updateLinks(links: { name: string; url: string }) {
    return this.http.put(environment.host + 'locals/put-links', links);
  }

  //CATEGORIASSS !!!!!!!!!!!
  postCategory(category: any) {
    return this.http.post(environment.host + `admin/categories`, category, {});
  }

  editCategory(category: { name: string; description: string; image: string | File } | any) {
    return this.http.put(environment.host + `admin/categories`, category, {});
  }


  putOrderCategories(categories:Category[]){
    return this.http.put(`${environment.host}admin/categories/sort-order`, {categories})
  }



  deleteCategory(id: number) {
    return this.http.delete(environment.host + `admin/categories/${id}`);
  }

  getCategories() {
    return this.http
      .get<Category[]>(environment.host + `admin/get-categories`)
      .pipe(
        map((data) => {
          this.categories = deleteRepeatElement(data);
          this.categories$.next( this.sortCategories(deleteRepeatElement(data)));
          return deleteRepeatElement(data);
        })
      );
  }

  categoryState(category_id: number, state: number) {
    return this.http.put(environment.host+'admin/categories/set-active', {
      category_id,
      state,
    });
  }

  //OPTIONS-GROUP!!!!!!!
  postOptionGroup(data: any) {
    return this.http.post(environment.host + 'admin/options-group', data);
  }

  updateOptionGroup(data: {
    products: Product[] | any[];
    group: OptionProduct;
    variations: OptionProduct[];
  }) {
    data.products = data.products.map((p) => p.id);
    return this.http.put(environment.host + 'admin/options-group', data);
  }

  deleteOptionGroup(id: number) {
    return this.http.delete(environment.host + 'admin/options-group/' + id);
  }

  cleanCategories(products: Product[]) {
    const categories = products.map((e) => {
      return {
        name: e.category_name,
        image: e.category_image,
        id: e.category_id,
      };
    });

    return deleteRepeatElement(categories);
  }

  //STATSSS!!!!!!!!!!!!

  getStats(){
    this.http.get<any[]>(`${environment.host}stats`).subscribe(res=>{
      this.stats$.next(res)
    })
  }


  //SALESSS!!!!!
  getSales(){
    this.http.get<any[]>(`${environment.host}sales`).subscribe(res=>{
      this.sales$.next(res)
    })
  }


  sortCategories(categories:Category[]) {
    return categories.sort((a, b) => a.sort_order - b.sort_order);
  }



  //!!!!! THEMES
  setTheme(id:number){
    return this.http.put(`${environment.host}locals/set-theme`, {id})
  }




  //Account
  deleteAccount(){
    return this.http.delete(`${environment.host}admin/delete-account`)
  }

  resetPassword(values:{currentPassword:string, password:string,}){
    return this.http.put(`${environment.host}admin/reset-password`, {...values})
  }

  updateAccount(values:{username:string, email:string, phone:number}){
    return this.http.put(`${environment.host}users`, {...values})

  }

  resetAdmin(){
    this.resetData()
  }

  resetData(){
    this.products = undefined
    this.local = undefined
    this.categories=undefined
    this.products$.next([])
    this.local$.next(undefined)
    this.sales$.next(undefined)
    this.stats$.next(undefined)
    this.categories$.next([])
  }


  
}






