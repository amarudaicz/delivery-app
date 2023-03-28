import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { RouterLink, RouterModule } from '@angular/router';
import { LoaderFullComponent } from './components/loader-full/loader-full.component';
import { FlotantCartComponent } from './components/flotant-cart/flotant-cart.component';
import { HomeModule } from '../home/home.module';
import { NewselterBoxComponent } from './components/newselter-box/newselter-box.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent,
    ProductCardComponent,
    LoaderFullComponent,
    FlotantCartComponent,
    NewselterBoxComponent
    
  ],
  imports: [
    CommonModule,
    RouterLink,
    
  ],
  exports:[
    NavigationComponent,
    HeaderComponent,
    ProductCardComponent,
    LoaderFullComponent,
    FlotantCartComponent

  ]
})
export class SharedModule { }
