import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsComponent } from './terms/terms.component';
import { RouterModule } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { PrivacyComponent } from './privacy/privacy.component';



@NgModule({
  declarations: [
  TermsComponent,
  PrivacyComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatRippleModule 
  ]
})
export class PoliciesModule { }
