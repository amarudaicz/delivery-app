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


@NgModule({
  declarations: [
    PrimaryCardsComponent,
    MainAdminComponent,
    ListProductsComponent,
    ChartComponent,
    ModalEditProductComponent,
    NewProductComponent,
    
  ],
  imports: [
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
    MatSelectModule,
    MatAutocompleteModule
    
  ]
})
export class AdminModule { }
