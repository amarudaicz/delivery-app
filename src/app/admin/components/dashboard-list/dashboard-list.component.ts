import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, catchError, take } from 'rxjs';
import { Category } from 'src/app/interfaces/category-interfaz';
import { OptionProduct } from 'src/app/interfaces/optionProduct-interface';
import { Product } from 'src/app/interfaces/product-interface';
import { AdminService } from 'src/app/services/admin/admin.service';
import { DinamicListService } from 'src/app/services/dinamic-list/dinamic-list.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { CdkDragDrop, CdkDragStart, moveItemInArray } from '@angular/cdk/drag-drop';
import { handleError } from 'src/app/utils/handle-error-http';
import { NotificationsAdminService } from 'src/app/services/notifications-admin/notifications-admin.service';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss'],

})
export class DashboardListComponent implements OnInit {

  categories: Category[] = []
  optionsGroup: OptionProduct[] = []
  products: Product[] = []
  currentSection: string = ''
  activeIndex?: number = 0
  flagInitial:boolean = true



  constructor(private adminService: AdminService, public dinamicList: DinamicListService, private dialog:MatDialog, private notificationsAdmin:NotificationsAdminService) {

    this.dinamicList.section.subscribe(section => {
      if (!section) return
      section === 'products' ? this.activeIndex = 0 : this.activeIndex = 1
      this.currentSection = section
    })
  

  }
 

  ngOnInit(): void {
    this.adminService.categories$.subscribe(categories => {
      
      this.categories = this.dinamicList.sortCategories(categories)  
    })


    this.getProducts()

    this.adminService.optionsGroup.subscribe((options) => {
      this.optionsGroup = options
    })

  }

  getProducts(){
    this.adminService.products$.subscribe(products => {
      console.log(products);
      
      this.products = products
    })
  }

  getCategories(): void {
    this.adminService.getCategories().subscribe(data => {
    });
  }


  getProductsByCat(category: Category) {
    return this.products.filter(p => p.category_id === category.id).length
  }


  isCatSelected(category: Category) {
    return category.id === this.dinamicList.categoryId
  }


  emitCategorySelected(item: Category|undefined) {
    if (!item) {
      this.dinamicList.section.next('products')
      return
    }

    this.dinamicList.categoryId = item.id
    this.dinamicList.category.next(item)
    this.dinamicList.section.next('products')
  }


 
  newCategory(){
    this.dialog.open(NewCategoryComponent, {
      width:window.innerWidth < 600 ? '90%' : ' 60%'
    })
  }

  handleStartDrag(event:CdkDragStart){
    console.log(event);
  }

  
  handleDragDrop(event:CdkDragDrop<any[]>){
    const {previousIndex, currentIndex} = event
    const categoriesModified = structuredClone(this.categories)
    
    moveItemInArray(this.categories, previousIndex, currentIndex);

    this.categories.forEach((c, i)=>{
      c.sort_order = i
    })
    
    this.adminService.putOrderCategories(this.categories).pipe(
      catchError(({error})=> handleError(error, this.notificationsAdmin))
    ).subscribe(res=> this.notificationsAdmin.new('Orden de categorías actualizado'))
    
  }


}
