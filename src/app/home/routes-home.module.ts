import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainCategoryComponent } from '../category/components/main-category/main-category.component';
import { MainDetailComponent } from '../detail/components/main-detail/main-detail.component';
import { MainHomeComponent } from './components/main-home/main-home.component';
import { MainLandingComponent } from '../landing/components/main-landing/main-landing.component';

const routes: Routes = [
  
  {
    path: '',
    children: [
      {
        path:'',
        component:MainLandingComponent,
      },

      {path:'faq', component:MainCategoryComponent},
      {
        path: ':local',
        component: MainHomeComponent,
        data: {
          animation:'home',
          page:'home'
        },
      },
      {
        path: ':local/:category',
        component: MainCategoryComponent,
        data: { page: '' },
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutesHomeModule {}
