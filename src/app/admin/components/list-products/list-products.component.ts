import { Component, Input, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Product } from 'src/app/interfaces/product-interface';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NewProductComponent } from '../new-product/new-product.component';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Observable, Subscription, catchError, map, take, throwError } from 'rxjs';
import { enterRight } from 'src/app/animations/main-animations';
import { MatIcon } from '@angular/material/icon';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { Table } from 'primeng/table';
import { DinamicListService } from 'src/app/services/dinamic-list/dinamic-list.service';
import { ConfirmationService } from 'primeng/api';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss'],
  providers: [DialogService, DynamicDialogConfig, MatIcon, ConfirmationService],
  animations: [enterRight, fadeIn],
})

export class ListProductsComponent implements OnInit, OnDestroy {

  @ViewChild('listProducts') lisProducts?: Table

  window: Window = window
  categoryId?: number
  products: Product[] = []
  filtredProducts: Product[] = []
  refDialog?: DynamicDialogRef
  selectedProducts: Product[] = []
  loadingUpdate: boolean = false
  dataCategory: any

  updateListSubscription: Subscription
  currentSectionSubscription?:Subscription
  produtsAdminSubscription?:Subscription

  constructor(private localService: LocalDataService,
    private confirmService: ConfirmationService,
    private adminService: AdminService,
    private dinamicList: DinamicListService,
    private toast: MatSnackBar) {

    this.updateListSubscription = this.dinamicList.updateDinamicList.subscribe(update => {
      if (update) {
        this.ngOnInit()
      }
    })
  }


  ngOnInit(): void {

   this.currentSectionSubscription = this.dinamicList.currentSection.subscribe(data => {

      if (data.category) {
        console.log(data);

        this.dataCategory = data.category
        console.log(this.dataCategory);


        this.produtsAdminSubscription = this.adminService.getProductsAdmin().pipe(map(products => products
          .map((e: any) => ({ editing: false, ...e }))))
          .subscribe(products => {

            this.products = products
            this.filtredProducts = this.products.filter(e => e.category_id === this.dataCategory.id)
          })

      } else {
        return
      }
    })

  }

  editProduct(product: any) {
    product.editing = true
    console.log(product);
  }


  deleteProduct(id: number, event: Event) {
    //CONFIRMATION

    const as = this.confirmService.confirm({
      message:`Realmente quiere eliminar el producto ${id}`,
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      rejectButtonStyleClass:'p-button-outlined',
      accept: () => {
        this.adminService.deleteProduct(id).pipe(catchError((error: any) => {
          // Aquí puedes manejar el error de acuerdo a tus necesidades
          console.log('Ocurrió un error:', error);
          this.toast.open(`A ocurrido un error intenta nuevamente`, 'Ok')
          return throwError('Error personalizado');

        })).subscribe(res => {
          this.toast.open(`Producto ${id} eliminado`, '', { duration: 3000 })
          this.adminService.products = undefined
          this.dinamicList.updateDashboardList.next(true)
          this.dinamicList.updateDinamicList.next(true)
        });
      },
      reject: () => {

      }
    })

  }


  ngOnDestroy(): void {
    this.updateListSubscription.unsubscribe()
    this.currentSectionSubscription?.unsubscribe()
    this.produtsAdminSubscription?.unsubscribe()

  }

}
