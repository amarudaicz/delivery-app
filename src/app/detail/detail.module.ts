import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDetailComponent } from './components/main-detail/main-detail.component';
import { InfoProductComponent } from './components/info-product/info-product.component';
import { AddProductCartComponent } from './components/add-product-cart/add-product-cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { CartService } from '../services/cartData/cart.service';
import { RouterModule } from '@angular/router';
import {MatRippleModule} from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    MainDetailComponent,
    InfoProductComponent,
    AddProductCartComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatRadioModule,
    MatCheckboxModule,
    MatInputModule,
    MatRippleModule,
    MatSnackBarModule,
    RouterModule

  ],
  providers:[
    CartService
  ]
})
export class DetailModule { }
