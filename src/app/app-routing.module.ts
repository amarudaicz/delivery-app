import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainCategoryComponent } from './category/components/main-category/main-category.component';
import { MainDetailComponent } from './detail/components/main-detail/main-detail.component';
import { MainHomeComponent } from './home/components/main-home/main-home.component';

const routes: Routes = [

  {
    path:'', 
    redirectTo:'asd',
    pathMatch:'full'
  },
  {
    path:':local', 
    component:MainHomeComponent,
    data: { animation: 'home' }
  },
  {
    path:':local/:category',
    component:MainCategoryComponent,
    data: { animation: 'category' }
  },
  {
    path:':local/:category/:product', 
    component:MainDetailComponent,
    data: { animation: 'detail' }
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
