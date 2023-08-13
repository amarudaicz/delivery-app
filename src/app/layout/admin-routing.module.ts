import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAdminComponent } from '../admin/components/main-admin/main-admin.component';
import { MainConfigComponent } from '../admin/components/main-config/main-config.component';
import { MainNewProductComponent } from '../admin/components/main-new-product/main-new-product.component';
import { MainOptionsComponent } from '../admin/components/main-options/main-options.component';
import { MainProductsComponent } from '../admin/components/main-products/main-products.component';
import { AppLayoutComponent } from './app.layout.component';
import { MainSchedulesComponent } from '../admin/components/main-schedules/main-schedules.component';
import { LinksSocialComponent } from '../admin/components/links-social/links-social.component';

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
            path:'config',
            component:MainConfigComponent
          },
          {
            path:'schedules',
            component:MainSchedulesComponent
          },
          {
            path:'links',
            component:LinksSocialComponent
          },
          
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
