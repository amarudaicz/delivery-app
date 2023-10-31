import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsComponent } from './terms/terms.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
  TermsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ]
})
export class PoliciesModule { }
