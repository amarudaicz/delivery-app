import {
  Component,
  Inject,
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
import { MatDialog } from '@angular/material/dialog';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { DashboardListComponent } from '../dashboard-list/dashboard-list.component';

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
  refDialog?: DynamicDialogRef;
  selectedProducts: Product[] = [];
  loadingUpdate: boolean = false;
  dataCategory?: Category;
  productsByCategory: Product[] = [];
  newProduct: boolean = false;

  modelConfigCategory:any[] = [
    {
      label:'Categoria',
      items: [
        { label: 'Editar', icon: 'pi pi-pencil',command: () => this.editCategory()},
        { label: 'Eliminar', icon: 'pi pi-trash' ,command: () => this.deleteCategory()},
        {label:'', icon:'fa-solid fa-toggle-on', visible:false, command: () => this.setStateCategory(this.dataCategory!, this.dataCategory!.active) }
      ],
    },
  ];

  updateListSubscription?: Subscription;
  currentSectionSubscription?: Subscription;
  produtsAdminSubscription?: Subscription;
  dashboard = Inject(DashboardListComponent)
  
  constructor(
    private localService: LocalDataService,
    private confirmService: ConfirmationService,
    private adminService: AdminService,
    private dinamicList: DinamicListService,
    private toast: MatSnackBar,
    private notificationsAdmin: NotificationsAdminService,
    private dialog:MatDialog
  ) {






  }

  ngOnInit(): void {
    this.currentSectionSubscription = this.dinamicList.currentSection.subscribe((data) => {

        if (data.category) {
          this.dataCategory = data.category;
          this.modelConfigCategory[0]['label'] = this.dataCategory!.category_name
          if (window.innerWidth < 576 ) {
            this.modelConfigCategory[0].items[2].visible = true
            this.modelConfigCategory[0].items[2].label = this.dataCategory!.active ? 'Desactivar' : 'Activar'

          }

          this.getProducts()
     
        } else {
          return;
        }
      }
    );
  }


  getProducts(){
    this.produtsAdminSubscription = this.adminService
    .products$
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
    });

  }

  editProduct(product: any) {
    product.editing = true;
  }


  deleteProduct(id: number) {
    //CONFIRMATION

   this.confirmService.confirm({
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
            this.adminService.getProductsAdmin()
          });
      },
      reject: () => {},
    });
  }



  setStockProduct(product: Product, stock: number) {
    console.log(product.stock);

    product.stock = stock ? 0 : 1;

    this.adminService.stockProduct(product.id, stock ? 0 : 1).subscribe(
      (res) => {
        this.notificationsAdmin.new(
          `Stock del producto ${product.name} actualizado a ${
            stock ? 'No disponible' : 'Disponible'
          }`,
          'Ok',
          { push: true, section: 'Products' }
        );
      },
      (err) => {
        product.stock = product.stock ? 0 : 1;
        this.notificationsAdmin.new(`A ocurrido un error intente nuevamente`);
      }
    );
  }




  //CATEGORIES
  editCategory(){
      this.dialog.open(NewCategoryComponent, {
        width:window.innerWidth < 600 ? '90%' : ' 60%',
        data:this.dataCategory
      })
  
  
  }

  deleteCategory(){

    const category = this.dataCategory!

    this.confirmService.confirm({
      message: `Realmente quiere eliminar la categoria ${category.category_name} si hace esto se borraran todos los productos que se encuentren en la lista ${category.category_name}`,
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'Si',
      rejectLabel:'No',
      rejectButtonStyleClass: 'p-button-outlined',
      accept: () => {
        this.adminService.deleteCategory(category.id).pipe(
          catchError(err => handleError(undefined, this.notificationsAdmin))
        ).subscribe(res=>{
          this.dinamicList.resetDashboard = true
          this.adminService.getCategories().subscribe(res => res )
          this.notificationsAdmin.new(`Categoria ${this.dataCategory?.category_name} eliminada con exito`, 'Ok', {push:true})
        })
      },
      reject: () => {},
    });    
    
  }

  setStateCategory(category: Category, state: number) {
    console.log(state);
    category.active = state ? 0 : 1;
    
    console.log(this.dataCategory);
    
    this.adminService.categoryState(category.id, state ? 0 : 1)
    .pipe(
      catchError(() => {
        console.log(this.dataCategory);
          category.active = category.active ? 0 : 1;
          return handleError(undefined, this.notificationsAdmin);
        })
        )
        .subscribe((res) => {
        this.modelConfigCategory[0].items[2].label = this.dataCategory!.active ? 'Desactivar' : 'Activar'
        this.notificationsAdmin.new(
          `Categoria ${category.category_name} actualizada a ${
            state
              ? 'No disponible, no se mostrara en el inicio de su tienda'
              : 'Disponible, se mostrara en el inicio de su tienda'
          }, `,
          'Ok',
          { push: true, section: 'Products' }
        );
      });
  }


  
  ngOnDestroy(): void {
    this.currentSectionSubscription?.unsubscribe();
    this.produtsAdminSubscription?.unsubscribe();
  }
}
