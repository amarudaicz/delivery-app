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
import { CardCategoryComponent } from 'src/app/home/components/card-category/card-category.component';
import { LoaderHttpService } from 'src/app/services/loader-http/loader-http.service';

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
  products?: Product[];
  refDialog?: DynamicDialogRef;
  selectedProducts: Product[] = [];
  loadingUpdate: boolean = false;
  dataCategory?: Category;
  productsByCategory: Product[] = [];
  newProduct: boolean = false;
  dataReady:boolean = false
 

  modelConfigCategory: any[] = [
    {
      label: 'Categoría',
      items: [
        {
          label: 'Editar',
          icon: 'pi pi-pencil',
          command: () => this.editCategory(),
        },
        {
          label: 'Eliminar',
          icon: 'pi pi-trash',
          command: () => this.deleteCategory(),
        },
        {
          label: '',
          icon: 'fa-solid fa-toggle-on',
          visible: false,
          command: () =>
            this.setStateCategory(
              this.dataCategory!,
              this.dataCategory!.active
            ),
        },
      ],
    },
  ];

  updateListSubscription?: Subscription;
  currentSectionSubscription?: Subscription;
  produtsAdminSubscription?: Subscription;
  dashboard = Inject(DashboardListComponent);
  laoderProducts = true

  constructor(
    private confirmService: ConfirmationService,
    private adminService: AdminService,
    private dinamicList: DinamicListService,
    private toast: MatSnackBar,
    private notificationsAdmin: NotificationsAdminService,
    private dialog: MatDialog,
    public loaderHttp:LoaderHttpService
  ) {} 

  ngOnInit(): void { 
  
    this.dinamicList.category.subscribe(
      (category) => {
        this.dataCategory = category;
        this.getProducts(category!);

        this.modelConfigCategory[0]['label'] = category?.category_name;
        if (window.innerWidth < 576) {
          this.modelConfigCategory[0].items[2].visible = true;
          this.modelConfigCategory[0].items[2].label = category?.active
            ? 'Desactivar'
            : 'Activar';
        }

      }
    );

    this.loaderHttp.isLoading.subscribe(loader=>{
    })
  }

  getProducts(category:Category) {

    if (!category) {
      this.laoderProducts = false
      return
    }

    this.produtsAdminSubscription = this.adminService.products$
      .pipe(
        map((products) => {
          return products.map((e: any) => ({ editing: false, ...e }))
        })
      )
      .subscribe((products) => {
        this.products = products;
        this.productsByCategory = this.products.filter(
          (e) => e.category_id === category.id
        );
      });
  }

  editProduct(product: any) {
    product.editing = true;
  }

  deleteProduct(id: number) {
    //CONFIRMATION

    this.confirmService.confirm({
      message: `Realmente quiere eliminar el producto ${this.products!.find(e => e.id === id )?.name}`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass: 'p-button-outlined',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {

        this.adminService
          .deleteProduct(id)
          .pipe(
            catchError(({error}) => handleError(error, this.notificationsAdmin))
          )
          .subscribe((res) => {
            this.toast.open(`Producto ${id} eliminado`, '', { duration: 3000 });
            this.adminService.getProductsAdmin();
            this.adminService.getCategories().subscribe();
          });
      },
      reject: () => {},
    });
  }

  setStockProduct(product: Product, stock: number) {
    product.stock = stock ? 0 : 1;

    this.adminService.stockProduct(product.id, stock ? 0 : 1).pipe(
      catchError(({error})=>{
        product.stock = product.stock ? 0 : 1;
        return handleError(error, this.notificationsAdmin) 
      })
    ).subscribe(
      (res) => {
        this.notificationsAdmin.new(
          `Stock del producto ${product.name} actualizado a ${
            stock ? 'No disponible' : 'Disponible'
          }`,
          'Ok',
          { push: true, section: 'Products' }
        );
      },
    );
  }

  //CATEGORIES
  editCategory() {
    const ref = this.dialog.open(NewCategoryComponent, {
      width: window.innerWidth < 600 ? '90%' : ' 60%',
      data: this.dataCategory,
    });

    ref.afterClosed().subscribe(close=>this.ngOnInit())
  }

  deleteCategory() {
    const category = this.dataCategory!;

    this.confirmService.confirm({
      message: `Realmente quiere eliminar la categoría ${category.category_name}? si hace esto se borraran todos los productos que se encuentren en la lista ${category.category_name}`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      rejectButtonStyleClass: 'p-button-outlined',
      accept: () => {
        this.adminService
          .deleteCategory(category.id)
          .pipe(
            catchError(({error}) => handleError(error, this.notificationsAdmin))
          )
          .subscribe((res) => {
            this.dinamicList.categoryId = undefined
            this.adminService.getCategories().subscribe();
            this.notificationsAdmin.new(
              `Categoría ${this.dataCategory?.category_name} eliminada con éxito`,
              'Ok',
              { push: true }
            );
          });
      },
      reject: () => {},
    });
  }

  setStateCategory(category: Category, state: number) {
    category.active = state ? 0 : 1;

    this.adminService
      .categoryState(category.id, state ? 0 : 1)
      .pipe(
        catchError(({error}) => {
          category.active = category.active ? 0 : 1;
          return handleError(error, this.notificationsAdmin);
        })
      )
      .subscribe((res) => {
        this.modelConfigCategory[0].items[2].label = this.dataCategory!.active
          ? 'Desactivar'
          : 'Activar';
        this.notificationsAdmin.new(
          `Categoría ${category.category_name} actualizada a ${
            state
              ? 'No disponible, no se mostrara en el inicio de su tienda'
              : 'Disponible, se mostrara en el inicio de su tienda'
          }`,
          'Ok',
          { push: true, section: 'Products' }
        );
      });
  }

  pinUpProduct(product:Product){

    const fixedProducts = this.products!.filter(p=>p.fixed)
    const fixed = product.fixed ? 0 : 1
    console.log(fixed, !fixed);
    

    if (fixedProducts.length >= 6 && fixed) {

      let nameProductsFixed = ''
      fixedProducts.forEach((p, i) => nameProductsFixed += p.name +`${i === fixedProducts.length ? '' : ', '} ` )

      this.toast.open(`Solo puedes destacar 6 productos como máximo. Tus productos fijados son: ${nameProductsFixed}`, '', {duration:6000})
      return
    }

    product.fixed = fixed
    
    this.adminService.fixedProduct(product.id, product.fixed).pipe(
      catchError((err)=>{
        this.toast.open('A ocurrido un error, intente nuevamente', '', {duration:5000})
        return throwError(()=> new Error(err))
      })
    ).subscribe(res => {
      this.toast.open('Producto actualizado con éxito', '', {duration:3000})
      // this.adminService.products = undefined
      // this.adminService.getProductsAdmin()
    })
  }

  

  ngOnDestroy(): void {
    this.currentSectionSubscription?.unsubscribe();
    this.produtsAdminSubscription?.unsubscribe();
  }
}
