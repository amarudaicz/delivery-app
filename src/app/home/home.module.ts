//MODULES
import { NgModule } from '@angular/core';
import { RoutesHomeModule } from './routes-home.module';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatSnackBarModule } from '@angular/material/snack-bar';
import {MatRippleModule} from '@angular/material/core';
//COMPONENTS
import { CardCategoryComponent } from './components/card-category/card-category.component';
import { MainHomeComponent } from './components/main-home/main-home.component';
import { NewselterBoxComponent } from './components/newselter-box/newselter-box.component';
import { PromotionsLocalComponent } from './components/promotions-local/promotions-local.component';
import { ProductsSetComponent } from './components/products-set/products-set.component';
import { PreviewCategoryComponent } from './components/preview-category/preview-category.component';
import { SkeletonModule } from 'primeng/skeleton';
import { SearchProductsComponent } from './components/search-products/search-products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectivesModule } from '../directives/directives.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { AlertClosedComponent } from './components/alert-closed/alert-closed.component';
import { FeaturesLocalComponent } from './components/features-local/features-local.component';

@NgModule({ 
  declarations: [
    MainHomeComponent,
    CardCategoryComponent,
    PromotionsLocalComponent,
    ProductsSetComponent,
    NewselterBoxComponent,
    PreviewCategoryComponent,
    SearchProductsComponent,
    CategoriesComponent,
    AlertClosedComponent,
    FeaturesLocalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RoutesHomeModule,
    RouterModule,
    MatSnackBarModule,
    MatRippleModule,
    SkeletonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule
  ] ,
  exports:[
    NewselterBoxComponent,
    ProductsSetComponent,
    CardCategoryComponent
  ],
  entryComponents:[]  
})
export class HomeModule { }
