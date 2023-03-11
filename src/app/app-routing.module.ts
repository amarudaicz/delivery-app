import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainCategoryComponent } from './category/components/main-category/main-category.component';
import { MainDetailComponent } from './detail/components/main-detail/main-detail.component';
import { MainHomeComponent } from './home/components/main-home/main-home.component';
import { MainPromotionsComponent } from './promotions/components/main-promotions/main-promotions.component';
import { MainUserComponent } from './user/components/main-user/main-user.component';

const routes: Routes = [ 
  {
    path:'',
    redirectTo:'pun',
    pathMatch:'full'
  },

  {
    path:'user',
    redirectTo:'user',
    pathMatch:'full'
  },

  {
    path:'cart',
    redirectTo:'cart',
    pathMatch:'full'
  },

  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule),
  },

  {
    path:'user',
    component:MainUserComponent
  },
  
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  

  {
  path: '**',
  component:MainDetailComponent
  },

]; 

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
