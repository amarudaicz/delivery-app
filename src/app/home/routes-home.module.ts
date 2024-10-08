import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainCategoryComponent } from '../category/components/main-category/main-category.component';
import { MainHomeComponent } from './components/main-home/main-home.component';

const routes: Routes = [
  
  {
    path: ':local',
    component: MainHomeComponent,
    data: {
      animation: 'home',
      page: 'home'
    },
  },
  {
    path: ':local/:category',
    component: MainCategoryComponent,
    data: { animation: 'byCategories' },
  },
  {
    path: ':local/:category/:product',
    loadChildren: () => import('./../detail/detail.module').then((m) => m.DetailModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutesHomeModule { }
