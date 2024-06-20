import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MainCategoryComponent } from './components/main-category/main-category.component';
import { ProductsByCategoryComponent } from './components/products-by-category/products-by-category.component';
import { HomeModule } from '../home/home.module';
import { MatRippleModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MainCategoryComponent,
    ProductsByCategoryComponent,
  ],
  imports: [
    CommonModule, 
    SharedModule,
    MatRippleModule,
    RouterModule
  ],
  exports: [ 
  ]  
})
export class CategoryModule { }
