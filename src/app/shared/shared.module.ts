import { NgModule } from '@angular/core';
import { CommonModule, LowerCasePipe } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { RouterLink, RouterModule } from '@angular/router';
import { LoaderFullComponent } from './components/loader-full/loader-full.component';
import { FlotantCartComponent } from './components/flotant-cart/flotant-cart.component';
import { HomeModule } from '../home/home.module';
import { NewselterBoxComponent } from './components/newselter-box/newselter-box.component';
import { ButtonInstallComponent } from './components/button-install/button-install.component';
import { SkeletonModule } from 'primeng/skeleton';
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { SelectUbicationMapComponent } from './components/select-ubication-map/select-ubication-map.component';
import { PricingCardsComponent } from './components/pricing-cards/pricing-cards.component';
import { LowestPricePipe, MaxPricePipe } from '../pipes/getLowestPrice';
import { ModalInfoLocalComponent } from './components/modal-info-local/modal-info-local.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ImageFallbackDirective } from '../directives/image-fallback/image-fallback.directive';
import { DirectivesModule } from '../directives/directives.module';
import { ProductCardVerticalComponent } from './components/product-card-vertical/product-card-vertical.component';
import { FeatureShippingComponent } from './components/feature-shipping/feature-shipping.component';
import { FeatureCreditDebitComponent } from './components/feature-credit-debit/feature-credit-debit.component';
import { FeatureInHomeComponent } from './components/feature-in-home/feature-in-home.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent,
    ProductCardComponent,
    LoaderFullComponent,
    FlotantCartComponent, 
    NewselterBoxComponent,
    ButtonInstallComponent ,
    SelectUbicationMapComponent,
    PricingCardsComponent,
    LowestPricePipe,
    MaxPricePipe,
    ModalInfoLocalComponent,
    ProductCardVerticalComponent,
    FeatureShippingComponent,
    FeatureCreditDebitComponent,
    FeatureInHomeComponent
    ,
  ],
  imports: [
    CommonModule,
    RouterLink,
    SkeletonModule,
    RatingModule,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule,
    MatDialogModule,
    MatButtonModule,
    DirectivesModule
  ],
  exports:[
    NavigationComponent,
    HeaderComponent,
    ProductCardComponent,
    LoaderFullComponent,
    FlotantCartComponent,
    ButtonInstallComponent,
    SelectUbicationMapComponent,
    PricingCardsComponent,
    MaxPricePipe,
    LowestPricePipe,
    ProductCardVerticalComponent,
    FeatureShippingComponent,
    FeatureCreditDebitComponent,
    FeatureInHomeComponent
  ]
})

export class SharedModule { }
