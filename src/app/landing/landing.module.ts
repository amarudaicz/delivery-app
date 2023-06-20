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



@NgModule({
  declarations: [
    MainLandingComponent,
    BannerComponent,
    RecentsComponent,
    HeaderLandingComponent,
    CardLocalComponent,
    AlertLocalClosedComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    SkeletonModule,
    MatRippleModule,
    MatDialogModule
  ] 
})
export class LandingModule { }
