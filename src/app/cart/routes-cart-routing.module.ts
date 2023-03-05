import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainCartComponent } from './main-cart/main-cart.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MainCartComponent,
        data: { animation: 'detail', page: 'detail' },

      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutesCartRoutingModule {}
