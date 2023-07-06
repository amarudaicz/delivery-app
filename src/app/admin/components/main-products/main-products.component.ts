import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AdminService } from 'src/app/services/admin/admin.service';
import { DinamicListService } from 'src/app/services/dinamic-list/dinamic-list.service';

@Component({
  selector: 'app-main-products',
  templateUrl: './main-products.component.html',
  styleUrls: ['./main-products.component.scss']
})
export class MainProductsComponent {


  data:any

  constructor(private adminService:AdminService, private dinamicList:DinamicListService, private layoutService:LayoutService){

    this.dinamicList.currentSection.subscribe((data:any)=>{
      console.log(data);
      
      this.data = data

    })

    this.layoutService.state.staticMenuDesktopInactive = true
    

  }

}
