import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHomeComponent } from './components/main-home/main-home.component';
import { CardCategoryComponent } from './components/card-category/card-category.component';
import { SharedModule } from '../shared/shared.module';
import { PromotionsLocalComponent } from './components/promotions-local/promotions-local.component';
import { RouterModule } from '@angular/router';
import { ProductsSetComponent } from './components/products-set/products-set.component';
import { NewselterBoxComponent } from './components/newselter-box/newselter-box.component';
import { RoutesHomeModule } from './routes-home.module';

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
  ] ,
  exports:[
    NewselterBoxComponent
  ]
})
export class HomeModule { }
