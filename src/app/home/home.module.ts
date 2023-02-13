import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHomeComponent } from './components/main-home/main-home.component';
import { CardCategoryComponent } from './components/card-category/card-category.component';
import { SharedModule } from '../shared/shared.module';
import { PromotionsLocalComponent } from './components/promotions-local/promotions-local.component';

@NgModule({ 
  declarations: [
    MainHomeComponent,
    CardCategoryComponent,
    PromotionsLocalComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    
  ] 
})
export class HomeModule { }
