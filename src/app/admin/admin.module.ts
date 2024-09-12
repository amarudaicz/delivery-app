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
import { MenuModule } from 'primeng/menu';
import { AccordionModule } from 'primeng/accordion';

// Material
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
import { SelectProductsGroupComponent } from './components/select-products-group/select-products-group.component';
import { BannerQrComponent } from './components/banner-qr/banner-qr.component';
import { BannerLinkComponent } from './components/banner-link/banner-link.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { MatButtonModule } from '@angular/material/button';
import { MainSchedulesComponent } from './components/main-schedules/main-schedules.component';
import { LinksSocialComponent } from './components/links-social/links-social.component';
import { ShippingConfigComponent } from './components/shipping-config/shipping-config.component';
import { PaymentsMethodsConfigComponent } from './components/payments-methods-config/payments-methods-config.component';
import { SubscriptionStateComponent } from './components/subscription-state/subscription-state.component';
import { InfoPlanBasicComponent } from './components/subscription-state/components/info-plan-basic/info-plan-basic.component';
import {MatDialogModule } from '@angular/material/dialog';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { ScrollSpyDirective } from '../directives/scroll-spy.directive';
import { HomeModule } from '../home/home.module';
import { DirectivesModule } from '../directives/directives.module';
import { AccountComponent } from './components/account/account.component';
import { MainOrdersComponent } from './orders/presentation/main-orders/main-orders.component';
import {MatTableModule} from '@angular/material/table';
import { ModalDetailsOrderComponent } from './orders/presentation/modal-details-order/modal-details-order.component';
import { ListComponent } from './orders/presentation/list/list.component';
import { CapitalizePipe } from './orders/presentation/capitalize-pipe';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FastModeComponent } from './orders/presentation/fast-mode/fast-mode.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { SetBuyerFieldsComponent } from './orders/presentation/set-buyer-fields/set-buyer-fields.component';
import {NativeDateAdapter} from '@angular/material/core';
import { TomtomService } from '../services/tomtom-service/tomtom.service';
import { WhatsappConectionComponent } from './components/whatsapp-conection/whatsapp-conection.component';

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
    SelectProductsGroupComponent,
    BannerQrComponent,
    BannerLinkComponent,
    SchedulesComponent,
    MainSchedulesComponent, 
    LinksSocialComponent,
    ShippingConfigComponent,
    PaymentsMethodsConfigComponent,
    SubscriptionStateComponent,
    InfoPlanBasicComponent,
    DocumentationComponent,
    ScrollSpyDirective, 
    AccountComponent, 
    MainOrdersComponent, 
    ModalDetailsOrderComponent,
    ListComponent,
    CapitalizePipe,
    FastModeComponent,
    SetBuyerFieldsComponent,
    WhatsappConectionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    SharedModule,
    HomeModule,
    DirectivesModule,

    // PrimeNG
    AutoFocusModule,
    ButtonModule,
    ChartModule,
    ConfirmDialogModule,
    DynamicDialogModule,
    FileUploadModule,
    MenuModule,
    AccordionModule,
    ConfirmPopupModule,

    // Material
    MatDialogModule,
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
    MatSlideToggleModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatChipsModule,
    MatDatepickerModule,
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
  providers:[
    NativeDateAdapter,
    TomtomService
  ]
})
export class AdminModule { }
