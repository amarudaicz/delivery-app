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
import { LowestPricePipe } from '../pipes/getLowestPrice';
import { ModalInfoLocalComponent } from './components/modal-info-local/modal-info-local.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent,
    ProductCardComponent,
    LoaderFullComponent,
    FlotantCartComponent, 
    NewselterBoxComponent,
    ButtonInstallComponent,
    SelectUbicationMapComponent,
    PricingCardsComponent,
    LowestPricePipe,
    ModalInfoLocalComponent    
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
    MatButtonModule
  ],
  exports:[
    NavigationComponent,
    HeaderComponent,
    ProductCardComponent,
    LoaderFullComponent,
    FlotantCartComponent,
    ButtonInstallComponent,
    SelectUbicationMapComponent,
    PricingCardsComponent


  ]
})
export class SharedModule { }
