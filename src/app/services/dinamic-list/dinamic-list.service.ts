import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdminService } from '../admin/admin.service';
import { Category } from 'src/app/interfaces/category-interfaz';

@Injectable({
  providedIn: 'root'
})
export class DinamicListService {

  
  currentSection = new BehaviorSubject<any>({ });
  categoryId?:number
  category = new BehaviorSubject<Category|undefined>(undefined);
  section = new BehaviorSubject<string>('products');
  initalEmitCategory:boolean = true

  updateDinamicList = new BehaviorSubject<any>(false);
  updateDashboardList = new BehaviorSubject<any>(false);

  
  constructor(private adminService:AdminService) { 
    
    this.initDasboard()
    
  }

  
  
  initDasboard(){

    this.adminService.categories$.subscribe(categories=>{
      console.log(categories);
      
      if (!categories.length) {
    
      }

      this.emitCategory(categories[this.indexLastCategorySelected(categories)])
    })



  }


  indexLastCategorySelected(categories:any[]){
    if (!categories.length || !this.categoryId) return 0
    return categories.findIndex(c=> c.id === this.categoryId)
  }

  emitCategory(category:Category){
    this.category.next(category)
    this.section.next('products')
    this.categoryId = category?.id
  }

  sortCategories(categories:Category[]) {
    return categories.sort((a, b) => a.sort_order - b.sort_order);
  }
  
}
