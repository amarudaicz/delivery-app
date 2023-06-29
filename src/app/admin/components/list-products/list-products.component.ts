import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { Product } from 'src/app/interfaces/product-interface';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { NewProductComponent } from '../new-product/new-product.component';
import { AdminService } from 'src/app/services/admin/admin.service';
import {
  Observable,
  Subscription,
  catchError,
  map,
  take,
  throwError,
} from 'rxjs';
import { enterRight } from 'src/app/animations/main-animations';
import { MatIcon } from '@angular/material/icon';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { Table } from 'primeng/table';
import { DinamicListService } from 'src/app/services/dinamic-list/dinamic-list.service';
import { ConfirmationService } from 'primeng/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationsAdminService } from 'src/app/services/notifications-admin/notifications-admin.service';
import { Category } from 'src/app/interfaces/category-interfaz';
import { handleError } from 'src/app/utils/handle-error-http';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
  providers: [DialogService, DynamicDialogConfig, MatIcon, ConfirmationService],
  animations: [enterRight, fadeIn],
})
export class ListProductsComponent implements OnInit, OnDestroy {
  @ViewChild('listProducts') lisProducts?: Table;

  window: Window = window;
  categoryId?: number;
  products: Product[] = [];
  filtredProducts: Product[] = [];
  refDialog?: DynamicDialogRef;
  selectedProducts: Product[] = [];
  loadingUpdate: boolean = false;
  dataCategory?: Category;
  productsByCategory:Product[] = []
  newProduct:boolean = false

  
  updateListSubscription: Subscription;
  currentSectionSubscription?: Subscription;
  produtsAdminSubscription?: Subscription;

  constructor(
    private localService: LocalDataService,
    private confirmService: ConfirmationService,
    private adminService: AdminService,
    private dinamicList: DinamicListService,
    private toast: MatSnackBar,
    private notificationsAdmin:NotificationsAdminService
  ) {
    this.updateListSubscription = this.dinamicList.updateDinamicList.subscribe(
      (update) => {
        if (update) {
          this.ngOnInit();
        }
      }
    );
  }

  ngOnInit(): void {
    this.currentSectionSubscription = this.dinamicList.currentSection.subscribe(
      (data) => {

        if (data.category) {

          this.dataCategory = data.category;
          console.log(this.dataCategory);

          this.produtsAdminSubscription = this.adminService
            .getProductsAdmin()
            .pipe(
              map((products) =>
                products.map((e: any) => ({ editing: false, ...e }))
              )
            )
            .subscribe((products) => {
              this.products = products;
              this.productsByCategory = this.products.filter(
                (e) => e.category_id === this.dataCategory?.id
              ); 

              this.filtredProducts = this.products.filter(
                (e) => e.category_id === this.dataCategory?.id
              );
            });
        } else {
          return;
        }
      }
    );
  }

  editProduct(product: any) {
    product.editing = true;
    console.log(product);
  }

  filter(data: string) {
    const text = data.toLowerCase();
    if (text === '') {
      this.filtredProducts = this.productsByCategory
      return      
    }

    this.filtredProducts = this.productsByCategory.filter((elemento:any) => {
      for (let prop of ['id', 'name', 'price']) {
        console.log(elemento);
        console.log(elemento[prop]);
        
        
        if (
          elemento[prop]
            .toString()
            .toLowerCase()
            .includes(text)
        ){
          return true;
        }
      }
      return false;
    });
  }

  deleteProduct(id: number) {
    //CONFIRMATION

    const as = this.confirmService.confirm({
      message: `Realmente quiere eliminar el producto ${id}`,
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'p-button-outlined',
      accept: () => {
        this.adminService
          .deleteProduct(id)
          .pipe(
            catchError(() => handleError(undefined, this.notificationsAdmin))
          )
          .subscribe((res) => {
            this.toast.open(`Producto ${id} eliminado`, '', { duration: 3000 });
            this.adminService.products = undefined;
            this.dinamicList.updateDashboardList.next(true);
            this.dinamicList.updateDinamicList.next(true);
          });
      },
      reject: () => {},
    });
  }


  setStateCategory(category:Category, state:number){
    console.log(state);
    category.active = state ? 0 : 1
    console.log(this.dataCategory);

    this.adminService.categoryState(category.id, state ? 0 : 1).pipe(
      catchError(()=>{
        console.log(this.dataCategory);
        category.active = category.active ? 0 : 1
        return handleError(undefined, this.notificationsAdmin)
      })
    ).subscribe( res => {
        this.notificationsAdmin.new(`Categoria ${category.category_name} actualizada a ${state ? 'No disponible, no se mostrara en el inicio de su tienda' : 'Disponible, se mostrara en el inicio de su tienda'}, `, 'Ok', {push:true, section:'Products'})
      }
    )


  }


  setStockProduct(product:Product, stock:number){
    console.log(product.stock);
    
    product.stock = stock ? 0 : 1  

    this.adminService.stockProduct(product.id, stock ? 0 : 1).subscribe(
      (res)=>{
        this.notificationsAdmin.new(`Stock del producto ${product.name} actualizado a ${stock ? 'No disponible' : 'Disponible'}`, 'Ok', {push:true, section:'Products'})
      },
      (err)=>{
        product.stock = product.stock ? 0 : 1
        this.notificationsAdmin.new(`A ocurrido un error intente nuevamente`)
      }
    )

  }


  ngOnDestroy(): void {
    this.updateListSubscription.unsubscribe();
    this.currentSectionSubscription?.unsubscribe();
    this.produtsAdminSubscription?.unsubscribe();
  }
}
