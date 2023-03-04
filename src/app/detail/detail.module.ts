import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDetailComponent } from './components/main-detail/main-detail.component';
import { InfoProductComponent } from './components/info-product/info-product.component';
import { AddProductCartComponent } from './components/add-product-cart/add-product-cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    MainDetailComponent,
    InfoProductComponent,
    AddProductCartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DetailModule { }
