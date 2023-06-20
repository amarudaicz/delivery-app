import { Component, Inject, OnInit } from '@angular/core';
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


  constructor(private adminService: AdminService, private alert:NotificationsAdminService, private toast: MatSnackBar, private dialog: MatDialog, private dinamicList: DinamicListService) {

  }



  ngOnInit(): void {
    this.adminService.optionsGroup.subscribe((options: OptionProduct[]) =>{

      this.groupOptions = copy(options)
      this.respaldGroupOptions = copy(options)

    })
  }

  getOptions(optionsArray: any[]) {
    return optionsArray.map(e => e.nameOption).join(', ')
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.groupOptions, event.previousIndex, event.currentIndex);
  }

  isAccordionExpanded(group: any): boolean {

    return group.nameVariation === this.acordionOpen?.nameVariation

  }

  toogleGroup(group: OptionProduct) {

    if (this.acordionOpen?.nameVariation === group.nameVariation)
      this.acordionOpen = undefined
    else
      this.acordionOpen = group

  }

  toogleOption(option: DetailsOptions) {
    option.active = !option.active
  }


  updateGroupOption(group: OptionProduct){
    const previousGroup = this.respaldGroupOptions.find(e=> e.nameVariation === group.nameVariation)
    console.log(group, previousGroup);


    if (JSON.stringify(group) === JSON.stringify(previousGroup)){
      this.alert.new('No se han detectado cambios en el grupo')
      // this.toast.open('No se han detectado cambios en el grupo', '', { duration: 3000 });
    return
    }

    if (!group.options.filter(o => o.active).length) {
      this.alert.new('Debes tener como minimo una opcion activa en el grupo. De lo contrario no se podra definir el precio final', 'Ok',{push:true, panelClass:'w-8rem', section:'Grupo de opciones' })
      return
    }
      

    this.adminService.getProductsAdmin().pipe(
      map(products => products.filter(e => e.variations.some(e =>
        e.nameVariation === group.nameVariation))
      )).subscribe(products => {

        console.log(products);

        if (products.length) {

          window.history.pushState({modal:true}, 'modal');

          const dialogRef = this.dialog.open(SelectProductsGroupComponent, {
            data: { products, group: group }
          })
  
          dialogRef.afterClosed().subscribe((data: { products: Product[], group: OptionProduct }) => {
            console.log(data);

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
        
        
    })
  }


  private updateOptionsGroupAndNotify(data: any) {

    this.adminService.updateOptionsGroup(data).subscribe((res:any)=>{

      this.toast.open('Grupo de opciones actualizado', '', { duration: 3000 });
      this.toast.open(res.info, '', { duration: 3000 });

      this.adminService.products = undefined;
      this.adminService.optionsGroup.next(this.groupOptions);
    })
  }

}
