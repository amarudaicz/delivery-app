import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainUserComponent } from './user/components/main-user/main-user.component';
import { adminGuard, loginGuard } from './utils/auth-guard.guard';


const routes: Routes = [

  {
    path: 'admin',
    data: { page: 'admin' },
    canActivate:[adminGuard],
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
    data: { animation: 'user', page: 'user' },
    component: MainUserComponent,
  },

  {
    path:'',
    loadChildren:()=> import('./landing/landing.module').then(m => m.LandingModule),
  },
  
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',     
    anchorScrolling: 'enabled',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
