import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdminService } from '../admin/admin.service';

@Injectable({
  providedIn: 'root'
})
export class DinamicListService {


  currentSection = new BehaviorSubject<any>({ });
  categoryId?:number

  updateDinamicList = new BehaviorSubject<any>(false);
  updateDashboardList = new BehaviorSubject<any>(false);

  public resetDashboard:boolean=true
  
  constructor(private adminService:AdminService) { 
    
  }
 
 
 
 
  setSection(section:any){
    
    if (section.category) {
      
      this.categoryId = section.category.id

    }else{
      this.categoryId = undefined
    }

    this.currentSection.next(section)
  }



}
