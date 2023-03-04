import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainCategoryComponent } from './category/components/main-category/main-category.component';
import { MainDetailComponent } from './detail/components/main-detail/main-detail.component';
import { MainHomeComponent } from './home/components/main-home/main-home.component';

const routes: Routes = [

  {
    path:'',
    redirectTo:'punto',
    pathMatch:'full'
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
