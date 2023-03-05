import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainCartComponent } from './main-cart/main-cart.component';
import { RoutesCartRoutingModule } from './routes-cart-routing.module';



@NgModule({
  declarations: [
    MainCartComponent
  ],
  imports: [
    CommonModule,
    RoutesCartRoutingModule
  ]
})
export class CartModule { }
