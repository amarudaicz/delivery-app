import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryModule } from './category/category.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { DetailModule } from './detail/detail.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { CartModule } from './cart/cart.module';

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    SharedModule,
    BrowserAnimationsModule,
    CategoryModule,
    DetailModule,
    ReactiveFormsModule,
    CartModule,

    
    
  ],
  providers: [ 
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
