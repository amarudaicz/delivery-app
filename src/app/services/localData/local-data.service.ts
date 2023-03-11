import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/app/environment';
import { Local } from 'src/app/interfaces/local-interface';
import { Product } from 'src/app/interfaces/product-interface';
import { ThemesService } from '../themes/themes.service';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  constructor( private http:HttpClient, private theme:ThemesService) {


  }

  public local = new BehaviorSubject<Local|undefined>(undefined)
  private products = new BehaviorSubject<Product[]>([])
  

  setLocal(name:string|null){
    this.http.get<Local>(environment.host + 'locals/1').subscribe((data:any)=>{
      this.theme.setTheme(data.themeId)//this.local.theme
      this.local.next(data)
    })
  }

  setProducts(local:string|null){
    this.http.get<Product[]>(environment.host + 'products').subscribe((data:Product[])=>{
      this.products.next(data)
    })
  }

  getProducts(){
    return this.products
  }











  
}
