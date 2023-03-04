import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainCategoryComponent } from './category/components/main-category/main-category.component';
import { MainDetailComponent } from './detail/components/main-detail/main-detail.component';
import { MainHomeComponent } from './home/components/main-home/main-home.component';

const routes: Routes = [

  {
    path:'', 
    redirectTo:'puntopizza',
    pathMatch:'full'
  },
  {
    path:'',
    loadChildren:()=>import('./home/home.module').then(m => m.HomeModule),
  },
  {
    path:':local/:category',
    component:MainCategoryComponent,
    data: { animation: 'category' }
  },
  {
    path:':local/:category/:product', 
    component:MainDetailComponent,
    data: { animation: 'detail', page:'detail' }
  },
  


];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
