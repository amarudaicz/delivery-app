import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLandingComponent } from './components/main-landing/main-landing.component';
import { FaqComponent } from '../policies/faq/faq.component';
import { LayoutLandingComponent } from './components/layout-landing/layout-landing.component';
import { PrivacyComponent } from '../policies/privacy/privacy.component';
import { TermsComponent } from '../policies/terms/terms.component';
import { MainInfoAppComponent } from './components/main-info-app/main-info-app.component';
import { RegisterComponent } from '../login/components/register/register.component';
import { MainHistoryComponent } from '../history-orders/main-history/main-history.component';

const routes: Routes = [
  {
    path: '',
    component:LayoutLandingComponent,
    

    children: [
      {
        path:'',
        component:MainInfoAppComponent
      },
      {
        path: 'recientes',
        component: MainLandingComponent,
      },
      {
        path: 'history',
        component: MainHistoryComponent,
      },
      {
        path: 'preguntas-frecuentes',
        component: FaqComponent,
      },
      {
        path: 'register',
        loadComponent: () => import('../login/components/register/register.component').then(m => m.RegisterComponent)
      },
      {
        path: 'politicas-de-privacidad',
        component: PrivacyComponent,
      }, 
      {
        path: 'terminos-y-condiciones',
        component: TermsComponent,
      },
    
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
