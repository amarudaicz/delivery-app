import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { RouterLink, RouterModule } from '@angular/router';
import { LoaderFullComponent } from './components/loader-full/loader-full.component';



@NgModule({
  declarations: [
    NavigationComponent,
    HeaderComponent,
    ProductCardComponent,
    LoaderFullComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports:[
    NavigationComponent,
    HeaderComponent,
    ProductCardComponent,
    LoaderFullComponent

  ]
})
export class SharedModule { }
