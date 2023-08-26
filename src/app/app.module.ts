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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserModule } from './user/user.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { AdminModule } from './admin/admin.module';
import { ToastrModule } from 'ngx-toastr';
import { AppConfigComponent } from './config/app-config/app-config.component';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpInterceptorService } from './services/iterceptor-jwt/interceptorJwt';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CartService } from './services/cartData/cart.service';

@NgModule({ 
  declarations: [
    AppComponent,
    AppConfigComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    UserModule,
    CartModule,
    DetailModule,
    SharedModule,
    CategoryModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    
     ServiceWorkerModule.register('ngsw-worker.js', {
       enabled: !isDevMode(),
       // Register the ServiceWorker as soon as the application is stable
       // or after 30 seconds (whichever comes first).
       registrationStrategy: 'registerWhenStable:30000'
     }),

   
    
    
  ],
  providers: [ 
    DynamicDialogConfig,
    DialogService,
    DynamicDialogRef,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }

  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
