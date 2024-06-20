import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainCartComponent } from './main-cart/main-cart.component';
import { RoutesCartRoutingModule } from './routes-cart-routing.module';
import { CartItemsComponent } from './cart-items/cart-items.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import  {MatDialogModule} from '@angular/material/dialog';
import { ModalInfoWpComponent } from './modal-info-wp/modal-info-wp.component'
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DetailsCheckoutComponent } from './details-checkout/details-checkout.component';
import { TomtomService } from '../services/tomtom-service/tomtom.service';

@NgModule({
  declarations: [MainCartComponent, CartItemsComponent, CheckoutComponent, ModalInfoWpComponent, DetailsCheckoutComponent],
  imports: [
    MatRippleModule,
    CommonModule,
    RoutesCartRoutingModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatCheckboxModule,

  ],
  providers:[TomtomService],
  exports:[
    CheckoutComponent
  ]
})
export class CartModule {}
