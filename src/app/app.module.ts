import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryModule } from './category/category.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { DetailModule } from './detail/detail.module';
import { Router, RouterModule, Scroll } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy, ViewportScroller } from '@angular/common';
import { CartModule } from './cart/cart.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserModule } from './user/user.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { AdminModule } from './admin/admin.module';
import { AppConfigComponent } from './config/app-config/app-config.component';
import { DialogService, DynamicDialogConfig, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { HttpInterceptorService, LoaderInterceptor } from './services/iterceptor-jwt/interceptorJwt';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { CartService } from './services/cartData/cart.service';
import { ScrollSpyDirective } from './directives/scroll-spy.directive';
import { PoliciesModule } from './policies/policies.module';
import { filter } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

@NgModule({ 
  declarations: [
    AppComponent,
    AppConfigComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SharedModule,
    PoliciesModule,
    HttpClientModule,
    MatSnackBarModule,
    MatNativeDateModule,
     ServiceWorkerModule.register('ngsw-worker.js', {
       enabled: !isDevMode,
       // Register the ServiceWorker as soon as the application is stable
       // or after 30 seconds (whichever comes first).
       registrationStrategy: 'registerWhenStable:30000'
     }),

   
    
    
  ],
  providers: [ 
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {horizontalPosition:'center', verticalPosition:'bottom'}},
    DynamicDialogConfig,
    DialogService,
    DynamicDialogRef,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
   },

  ],
  bootstrap: [AppComponent],

})
export class AppModule { 
  // constructor(router: Router, viewportScroller: ViewportScroller) {
  //   viewportScroller.setOffset([0, 50]);
  //   router.events.pipe(filter(e => e instanceof Scroll)).subscribe((e: any) => {
  //     if (e.anchor) {
  //       // anchor navigation
  //       /* setTimeout is the core line to solve the solution */
  //       setTimeout(() => {
  //         viewportScroller.scrollToAnchor(e.anchor);
  //       })
  //     } else if (e.position) {
  //       // backward navigation
  //       viewportScroller.scrollToPosition(e.position);
  //     } else {
  //       // forward navigation
  //       viewportScroller.scrollToPosition([0, 0]);
  //     }
  //   });
  // }
}
