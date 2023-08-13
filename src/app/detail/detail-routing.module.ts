import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDetailComponent } from './components/main-detail/main-detail.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path: '',
        component: MainDetailComponent,
        data: { animation: 'detail', page: 'detail' },
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailRoutingModule {}
