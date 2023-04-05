import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimaryCardsComponent } from './components/primary-cards/primary-cards.component';
import { MainAdminComponent } from './components/main-admin/main-admin.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ChartComponent } from './components/chart/chart.component';

import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { NgChartsModule } from 'ng2-charts';
import { ChartModule } from 'primeng/chart';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { ModalEditProductComponent } from './components/modal-edit-product/modal-edit-product.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SharedModule } from '../shared/shared.module';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatRadioModule} from '@angular/material/radio';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MatRippleModule } from '@angular/material/core';
import { RippleModule } from 'primeng/ripple';
import { FileUploadModule } from 'primeng/fileupload';
import { MainProductsComponent } from './components/main-products/main-products.component';
import { InputTextModule } from 'primeng/inputtext';
import { MainNewProductComponent } from './components/main-new-product/main-new-product.component';
import { MainConfigComponent } from './components/main-config/main-config.component';
import { ConfigLocalComponent } from './components/config-local/config-local.component';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { ConfigThemingComponent } from './components/config-theming/config-theming.component';

@NgModule({
  declarations: [
    PrimaryCardsComponent,
    MainAdminComponent,
    ListProductsComponent,
    ChartComponent,
    ModalEditProductComponent,
    NewProductComponent,
    MainProductsComponent,
    MainNewProductComponent,
    MainConfigComponent,
    ConfigLocalComponent,
    ConfigThemingComponent,
    
  ],
  imports: [
    SharedModule,
    CommonModule,
    TableModule,
    ButtonModule,
    StyleClassModule,
    NgChartsModule,
    ChartModule,
    DynamicDialogModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule,
    RippleModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatIconModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTooltipModule,
    MatSnackBarModule,
    ConfirmDialogModule,
    FileUploadModule,
    InputTextModule,
    ToastModule    

    
  ]
})
export class AdminModule { }
