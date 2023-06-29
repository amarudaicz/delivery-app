import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { Category } from 'src/app/interfaces/category-interfaz';
import { OptionProduct } from 'src/app/interfaces/optionProduct-interface';
import { Product } from 'src/app/interfaces/product-interface';
import { AdminService } from 'src/app/services/admin/admin.service';
import { DinamicListService } from 'src/app/services/dinamic-list/dinamic-list.service';
import { NewCategoryComponent } from '../new-category/new-category.component';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent implements OnInit {

  categories: Category[] = []
  optionsGroup: OptionProduct[] = []
  products: Product[] = []
  currentSection: string = ''
  activeIndex?: number


  constructor(private adminService: AdminService, private dinamicList: DinamicListService, private dialog:MatDialog) {

    this.dinamicList.currentSection.subscribe(data => {
      if (!data) return
      this.currentSection = data.section
      data.section === 'products' ? this.activeIndex = 0 : this.activeIndex = 1
    })
    
    this.dinamicList.updateDashboardList.subscribe(update => {
      if (update) {
        this.ngOnInit()
      }
    })

  }





  ngOnInit(): void {

    this.adminService.getCategories().subscribe(categories => {
      this.categories = categories
      this.dinamicList.setSection({section:'products', category:this.categories[0]})
    })


    this.adminService.getProductsAdmin().subscribe(products => {
      this.products = products
    })


    this.adminService.optionsGroup.subscribe((options) => {
      this.optionsGroup = options
      console.log(this.optionsGroup);
    })

  }



  getProductsByCat(category: Category) {
    return this.products.filter(p => p.category_id === category.id).length
  }


  isCatSelected(category: Category) {
    return category.id === this.dinamicList.categoryId
  }


  emitSelected(item: any) {
    console.log(item);

    if (item.id) {
      this.dinamicList.setSection({
        section: 'products',
        category:item
      })
    } else {
      this.currentSection = 'groups'
      this.dinamicList.setSection({
        section: 'groups',
      })
    }


  }


  newCategory(){
    this.dialog.open(NewCategoryComponent, {
      
    })


  }

}
