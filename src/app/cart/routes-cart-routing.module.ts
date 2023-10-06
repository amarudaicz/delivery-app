import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MainCartComponent } from './main-cart/main-cart.component';

const routes: Routes = [
      {
        path: '',
        component: MainCartComponent,
        data: { animation: 'cart', page: 'cart' },
        children:[
          {
            path:'',
            component:CartItemsComponent,
            data: { animation: 'cart', page: 'cart' },

          },
          {
            path:'checkout',
            component:CheckoutComponent,
            data: { animation: 'cart', page: 'cart' },

          }
        ]

      },
    ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutesCartRoutingModule {}
