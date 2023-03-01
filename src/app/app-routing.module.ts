import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainCategoryComponent } from './category/components/main-category/main-category.component';
import { MainHomeComponent } from './home/components/main-home/main-home.component';

const routes: Routes = [
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



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
