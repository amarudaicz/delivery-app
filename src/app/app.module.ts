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
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { UserModule } from './user/user.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { AdminModule } from './admin/admin.module';
import { ToastrModule } from 'ngx-toastr';
import { AppConfigComponent } from './config/app-config/app-config.component';

@NgModule({ 
  declarations: [
    AppComponent,
    AppConfigComponent,
    
  ],
  imports: [
    AdminModule,
    RouterModule,
    
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,  
    BrowserAnimationsModule,
    CategoryModule,
    DetailModule,
    ReactiveFormsModule,
    CartModule,
    HttpClientModule,
    UserModule,
    AppLayoutModule,
    
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),


    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-center',
      progressBar:true,
      closeButton:true,
      maxOpened:1,
      preventDuplicates:true,
      resetTimeoutOnDuplicate:true

    })

    
    
  ],
  providers: [ 
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
