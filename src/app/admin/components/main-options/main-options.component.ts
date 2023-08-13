import { Component, ComponentRef, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray, CdkDragHandle } from '@angular/cdk/drag-drop';
import { AdminService } from 'src/app/services/admin/admin.service';
import { Local } from 'src/app/interfaces/local-interface';
import { DetailsOptions, OptionProduct } from 'src/app/interfaces/optionProduct-interface';
import { copy } from 'src/app/utils/copyElement';
import { enterRight } from 'src/app/animations/main-animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { SelectProductsGroupComponent } from '../select-products-group/select-products-group.component';
import { DialogRef } from '@angular/cdk/dialog';
import { map } from 'rxjs';
import { Product } from 'src/app/interfaces/product-interface';
import { DinamicListService } from 'src/app/services/dinamic-list/dinamic-list.service';
import { Location } from '@angular/common';
import { NotificationsAdminService } from 'src/app/services/notifications-admin/notifications-admin.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { LayoutStateService } from 'src/app/services/layoutState/layout-state.service';

@Component({
  selector: 'app-main-options',
  templateUrl: './main-options.component.html',
  styleUrls: ['./main-options.component.scss'],
  animations: [enterRight]
})
export class MainOptionsComponent implements OnInit {

  activeCreateGroup: boolean = false
  groupOptions: OptionProduct[] = []
  respaldGroupOptions:OptionProduct[] = []

  acordionOpen: any
  draggin: boolean = false
  groupEditing?: OptionProduct
  products:Product[] = []
  
  

  constructor(private adminService: AdminService, private alert:NotificationsAdminService, private toast: MatSnackBar, private dialog: MatDialog, private dinamicList: DinamicListService, private layoutService:LayoutStateService) {

    this.adminService.products$.subscribe(products=>{
      this.products = products
    })
  }



  ngOnInit(): void {
    this.adminService.optionsGroup.subscribe((options: OptionProduct[]) =>{

      options = options.map(e=> {
        return {...e, editing:false}
      })

      this.groupOptions = copy(options)
        console.log(this.groupOptions);
        
      this.respaldGroupOptions = copy(options)

    })
  }

  getOptions(optionsArray: any[]) {
    return optionsArray.filter(e=> e.active).map(e => e.nameOption).join(', ')
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.groupOptions, event.previousIndex, event.currentIndex);
  }

  isAccordionExpanded(group: any): boolean {

    return group.id === this.acordionOpen?.id

  }

  toogleGroup(group: OptionProduct) {

    if (this.acordionOpen?.id === group.id)
      this.acordionOpen = undefined
    else
    this.acordionOpen = group

  }

  toogleOption(option: DetailsOptions) {
    option.active = !option.active
  }

  
  modalCreateGroup(){
    window.history.pushState({modal:true}, 'modal');
    this.activeCreateGroup = true
    this.layoutService.blockBody()
  }
  
  closeModalCreateGroup(){
    this.activeCreateGroup = false
    this.layoutService.unblockBody()
  }


  updateGroupOption(group: OptionProduct){
    const previousGroup = this.respaldGroupOptions.find(e=> e.id === group.id)

    if (JSON.stringify(group) === JSON.stringify(previousGroup)){
      this.alert.new('No se han detectado cambios en el grupo')
      // this.toast.open('No se han detectado cambios en el grupo', '', { duration: 3000 });
    return
    }

    if (!group.options.filter(o => o.active).length) {
      this.alert.new('Debes tener como minimo una opcion activa en el grupo de opciones. De lo contrario no se mostrara el grupo.', 'Ok',{push:true, panelClass:'w-8rem', section:'Grupo de opciones' })
      return
    }
    
    const productsWhitGroup = this.products.filter(e => e.variations.some(e => e.id === group.id))
    
      if (productsWhitGroup.length) {

        window.history.pushState({modal:true}, 'modal');

        const dialogRef = this.dialog.open(SelectProductsGroupComponent, {
          height:'90%',
          data: { products:productsWhitGroup, group: group }
        })

        dialogRef.afterClosed().subscribe((data: { products: Product[], group: OptionProduct }) => {
          if (!data) {
            this.ngOnInit()
            return
          }
         
          if (data.products.length) {
            this.updateOptionsGroupAndNotify({...data, variations: this.groupOptions })
          }else{
            this.updateOptionsGroupAndNotify({products: [], group, variations: this.groupOptions})
          }
        })
        
      }else{
        this.updateOptionsGroupAndNotify({products: [], group, variations: this.groupOptions})
      }
  }

  deleteGroupOption(group:any, index:number){
    const productsWhitGroup = this.products.filter(e => e.variations.some(e => e.id === group.id))
    if (productsWhitGroup.length) {
      const idProducts = productsWhitGroup.map(e => e.name).join(', ')
      this.alert.new(`No es posible eliminar un grupo de opciones si existen productos que hacen uso de el. Ver productos (${idProducts})`, 'Ok',{push:true, section:'Grupo de opciones',panelClass:'w-12rem'})
      return
    }
      this.adminService.deleteOptionGroup(group.id).subscribe(
        (res)=>{
          this.alert.new(`El grupo ${group.nameVariation} a sido eliminado con exito`, 'Ok', {push:true} )
          const optionsUpdates = this.groupOptions.filter(e=> e.id !== group.id)
          this.adminService.optionsGroup.next(optionsUpdates)
          
        },
        (err)=>{
          console.log(err);
          this.alert.new(`A ocurrido un error intente nuevamente`, 'Ok')
        }
      )
  }

  private updateOptionsGroupAndNotify(data: any) {

    this.adminService.updateOptionGroup(data).subscribe((res:any)=>{
      this.toast.open('Grupo de opciones actualizado', '', { duration: 3000 });
      setTimeout(() => {
        this.toast.open(`${res.affectedRows} Productos han sido actualizados `, '', { duration: 3000 });
      }, 3000);

      this.adminService.products = undefined;
      this.adminService.getProductsAdmin()
      this.adminService.optionsGroup.next(this.groupOptions);
    })
  }

}
