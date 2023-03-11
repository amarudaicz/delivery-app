import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponentComponent } from './components/main-component/main-component.component';
import { MainPromotionsComponent } from './components/main-promotions/main-promotions.component';



@NgModule({
  declarations: [
    MainComponentComponent,
    MainPromotionsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PromotionsModule { }
