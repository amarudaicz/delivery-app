import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainAdminComponent } from './admin/components/main-admin/main-admin.component';
import { MainConfigComponent } from './admin/components/main-config/main-config.component';
import { MainNewProductComponent } from './admin/components/main-new-product/main-new-product.component';
import { MainProductsComponent } from './admin/components/main-products/main-products.component';
import { CartItemsComponent } from './cart/cart-items/cart-items.component';
import { MainCategoryComponent } from './category/components/main-category/main-category.component';
import { MainDetailComponent } from './detail/components/main-detail/main-detail.component';
import { MainHomeComponent } from './home/components/main-home/main-home.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { MainPromotionsComponent } from './promotions/components/main-promotions/main-promotions.component';
import { MainUserComponent } from './user/components/main-user/main-user.component';
import { AuthGuard } from './utils/auth-guard.guard';
import { MainLoginComponent } from './login/components/main-login/main-login.component';
import { MainOptionsComponent } from './admin/components/main-options/main-options.component';
import { MainSchedulesComponent } from './admin/components/main-schedules/main-schedules.component';
import { LinksSocialComponent } from './admin/components/links-social/links-social.component';

const routes: Routes = [

  {
    path: 'admin',
    data: { page: 'admin' },
    canActivate:[AuthGuard],
    loadChildren: () =>
      import('./layout/app.layout.module').then((m) => m.AppLayoutModule),
  },

  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },

  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
  },

  {
    path: 'user',
    component: MainUserComponent,
  },

  {
    path: ':local/:category/:product',
    loadChildren:()=> import('./detail/detail.module').then((m) => m.DetailModule)
  },

  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
