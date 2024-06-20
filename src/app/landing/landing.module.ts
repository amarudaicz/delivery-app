import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from './components/banner/banner.component';
import { MainLandingComponent } from './components/main-landing/main-landing.component';
import { RecentsComponent } from './components/recents/recents.component';
import { HeaderLandingComponent } from './components/header-landing/header-landing.component';
import { SkeletonModule } from 'primeng/skeleton';
import { CardLocalComponent } from './components/card-local/card-local.component';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertLocalClosedComponent } from './components/alert-local-closed/alert-local-closed.component';
import { LandingRoutingModule } from './landing-routing.module';
import { LayoutLandingComponent } from './components/layout-landing/layout-landing.component';
import { BannerInitComponent } from './components/banner-init/banner-init.component';
import { MainInfoAppComponent } from './components/main-info-app/main-info-app.component';
import { HowToBuyComponent } from './components/how-to-buy/how-to-buy.component';
import { PricingComponent } from './components/pricing/pricing.component';
import { SharedModule } from '../shared/shared.module';
import { PoliciesModule } from '../policies/policies.module';
import { FooterLandingComponent } from './components/footer-landing/footer-landing.component';
import { HowCreateAcountComponent } from './components/how-create-acount/how-create-acount.component';
import { HistoryModule } from '../history-orders/history.module';
import { DirectivesModule } from '../directives/directives.module';



@NgModule({
  declarations: [
    MainLandingComponent,
    BannerComponent,
    RecentsComponent,
    HeaderLandingComponent,
    CardLocalComponent,
    AlertLocalClosedComponent,
    LayoutLandingComponent,
    BannerInitComponent, 
    MainInfoAppComponent,
    HowToBuyComponent,
    PricingComponent,
    FooterLandingComponent,
    HowCreateAcountComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    LandingRoutingModule,
    SkeletonModule,
    MatRippleModule,
    MatDialogModule,
    SharedModule,
    PoliciesModule,
    HistoryModule,
    DirectivesModule
  ] 
})
export class LandingModule { }
