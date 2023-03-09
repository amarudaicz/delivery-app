import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainCartComponent } from './main-cart/main-cart.component';
import { RoutesCartRoutingModule } from './routes-cart-routing.module';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MainCartComponent, CartItemsComponent, CheckoutComponent],
  imports: [
    CommonModule,
    RoutesCartRoutingModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CartModule {}
