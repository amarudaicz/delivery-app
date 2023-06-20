import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAdminComponent } from '../admin/components/main-admin/main-admin.component';
import { MainConfigComponent } from '../admin/components/main-config/main-config.component';
import { MainNewProductComponent } from '../admin/components/main-new-product/main-new-product.component';
import { MainOptionsComponent } from '../admin/components/main-options/main-options.component';
import { MainProductsComponent } from '../admin/components/main-products/main-products.component';
import { AppLayoutComponent } from './app.layout.component';

const routes: Routes = [
  
  {
    path:'',
    children:[
      {
        path:'',
        component:AppLayoutComponent,
        children:[
          {
            path:'',
            component:MainAdminComponent
          },
          {
            path:'products',
            component:MainProductsComponent
          },
          {
            path:'new-product',
            component:MainNewProductComponent
          },
          {
            path:'config',
            component:MainConfigComponent
          },
          {
            path:'options-group',
            component:MainOptionsComponent
          }
        ]
      },
    ]

  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutesAdmingModule { }
