import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainCategoryComponent } from '../category/components/main-category/main-category.component';
import { MainDetailComponent } from '../detail/components/main-detail/main-detail.component';
import { MainHomeComponent } from './components/main-home/main-home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':local',
        component: MainHomeComponent,
        data: {
          animation:'home',
        },
      },
      {
        path: ':local/:category',
        component: MainCategoryComponent,
        data: { animation: 'detail', page: 'detail' },
      },
      {
        path: ':local/:category/:product',
        component: MainDetailComponent,
        data: { animation: 'detail', page: 'detail' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutesHomeModule {}
