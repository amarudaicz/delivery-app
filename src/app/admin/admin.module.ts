// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// PrimeNG
import { AutoFocusModule } from 'primeng/autofocus';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { MessagesModule } from 'primeng/messages';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { VirtualScrollerModule } from 'primeng/virtualscroller';
import { AccordionModule } from 'primeng/accordion';

// Material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


// Componentes
import { PrimaryCardsComponent } from './components/primary-cards/primary-cards.component';
import { MainAdminComponent } from './components/main-admin/main-admin.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ChartComponent } from './components/chart/chart.component';
import { ModalEditProductComponent } from './components/modal-edit-product/modal-edit-product.component';
import { NewProductComponent } from './components/new-product/new-product.component';
import { MainProductsComponent } from './components/main-products/main-products.component';
import { MainNewProductComponent } from './components/main-new-product/main-new-product.component';
import { MainConfigComponent } from './components/main-config/main-config.component';
import { ConfigLocalComponent } from './components/config-local/config-local.component';
import { ConfigThemingComponent } from './components/config-theming/config-theming.component';
import { NewCategoryComponent } from './components/new-category/new-category.component';
import { MainOptionsComponent } from './components/main-options/main-options.component';
import { AddGroupOptionComponent } from './components/add-group-option/add-group-option.component';
import { SetOptionsProductComponent } from './components/set-options-product/set-options-product.component';
import { MainEditProductComponent } from './components/main-edit-product/main-edit-product.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SharedModule } from '../shared/shared.module';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';
import { DashboardListComponent } from './components/dashboard-list/dashboard-list.component';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ImageFallbackDirective } from '../directives/image-fallback/image-fallback.directive';
import { SelectProductsGroupComponent } from './components/select-products-group/select-products-group.component';
import { BannerQrComponent } from './components/banner-qr/banner-qr.component';
import { BannerLinkComponent } from './components/banner-link/banner-link.component';

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
    NewCategoryComponent,
    MainOptionsComponent,
    AddGroupOptionComponent,
    SetOptionsProductComponent,
    MainEditProductComponent,
    ListCategoriesComponent,
    DashboardListComponent,
    ImageFallbackDirective,
    SelectProductsGroupComponent,
    BannerQrComponent,
    BannerLinkComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    DragDropModule,
    SharedModule,

    // PrimeNG
    AutoFocusModule,
    ButtonModule,
    ChartModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    FileUploadModule,
    InputTextModule,
    MenuModule,
    MessagesModule,
    RippleModule,
    TableModule,
    ToastModule,
    VirtualScrollerModule,
    AccordionModule,
    ConfirmPopupModule,

    // Material
    MatAutocompleteModule,
    MatCheckboxModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatSlideToggleModule
  ],
  exports:[
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
    NewCategoryComponent,
    MainOptionsComponent,
    AddGroupOptionComponent,
    SetOptionsProductComponent,
    MainEditProductComponent

  ],
})
export class AdminModule { }
