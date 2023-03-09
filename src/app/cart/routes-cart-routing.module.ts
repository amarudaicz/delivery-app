import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MainCartComponent } from './main-cart/main-cart.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MainCartComponent,
        data: { animation: 'detail', page: 'detail' },
        children:[
          {
            path:'',
            component:CartItemsComponent,
          },
          {
            path:'checkout',
            component:CheckoutComponent
          }
        ]

      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutesCartRoutingModule {}
