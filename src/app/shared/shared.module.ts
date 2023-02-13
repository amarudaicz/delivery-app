import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [
    NavigationComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    NavigationComponent,
    HeaderComponent

  ]
})
export class SharedModule { }
