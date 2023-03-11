//MODULES
import { NgModule } from '@angular/core';
import { RoutesHomeModule } from './routes-home.module';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//COMPONENTS
import { CardCategoryComponent } from './components/card-category/card-category.component';
import { MainHomeComponent } from './components/main-home/main-home.component';
import { NewselterBoxComponent } from './components/newselter-box/newselter-box.component';
import { PromotionsLocalComponent } from './components/promotions-local/promotions-local.component';
import { ProductsSetComponent } from './components/products-set/products-set.component';
import {MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({ 
  declarations: [
    MainHomeComponent,
    CardCategoryComponent,
    PromotionsLocalComponent,
    ProductsSetComponent,
    NewselterBoxComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    RoutesHomeModule,
    RouterModule,
    MatSnackBarModule
  ] ,
  exports:[
    NewselterBoxComponent
  ]
})
export class HomeModule { }
