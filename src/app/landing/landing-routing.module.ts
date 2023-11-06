import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLandingComponent } from './components/main-landing/main-landing.component';
import { FaqComponent } from '../policies/faq/faq.component';
import { LayoutLandingComponent } from './components/layout-landing/layout-landing.component';
import { PrivacyComponent } from '../policies/privacy/privacy.component';
import { TermsComponent } from '../policies/terms/terms.component';

const routes: Routes = [
  {
    path: '',
    component:LayoutLandingComponent,
    children: [
      {
        path: '',
        component: MainLandingComponent,
      },
      {
        path: 'preguntas-frecuentes',
        component: FaqComponent,
      },
      {
        path: 'politicas-de-privacidad',
        component: PrivacyComponent,
      }, {
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
