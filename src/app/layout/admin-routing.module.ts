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
import { SubscriptionStateComponent } from '../admin/components/subscription-state/subscription-state.component';
import { DocumentationComponent } from '../admin/components/documentation/documentation.component';
import { ShippingConfigComponent } from '../admin/components/shipping-config/shipping-config.component';
import { PaymentsMethodsConfigComponent } from '../admin/components/payments-methods-config/payments-methods-config.component';
import { AccountComponent } from '../admin/components/account/account.component';
import { MainOrdersComponent } from '../admin/orders/presentation/main-orders/main-orders.component';
import { WhatsappConectionComponent } from '../admin/components/whatsapp-conection/whatsapp-conection.component';

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
            path:'shipping',
            component:ShippingConfigComponent
          },
          {
            path:'pay-methods',
            component:PaymentsMethodsConfigComponent
          },
          {
            path:'schedules',
            component:MainSchedulesComponent
          },
          {
            path:'links',
            component:LinksSocialComponent
          },
          {
            path:'payments',
            component:SubscriptionStateComponent
          },
          {
            path:'account',
            component:AccountComponent
          },
          {
            path:'docs',
            component:DocumentationComponent
          },
          {
            path:'orders',
            component:MainOrdersComponent
          },
          {
            path:'whatsapp',
            component:WhatsappConectionComponent
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
