import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainHistoryComponent } from './main-history/main-history.component';
import { CardOrderComponent } from './card-order/card-order.component';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../directives/directives.module';



@NgModule({
  declarations: [
    MainHistoryComponent,
    CardOrderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DirectivesModule
  ]
})
export class HistoryModule { }
