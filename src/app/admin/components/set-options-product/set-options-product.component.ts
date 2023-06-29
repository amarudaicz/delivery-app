import { CdkDragDrop, CdkDragStart, moveItemInArray } from '@angular/cdk/drag-drop';
import { S } from '@angular/cdk/keycodes';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Local } from 'src/app/interfaces/local-interface';
import { DetailsOptions, OptionProduct } from 'src/app/interfaces/optionProduct-interface';
import { Product } from 'src/app/interfaces/product-interface';
import { AdminService } from 'src/app/services/admin/admin.service';
import { copy } from 'src/app/utils/copyElement';

@Component({
  selector: 'app-set-options-product',
  templateUrl: './set-options-product.component.html',
  styleUrls: ['./set-options-product.component.scss']
})
export class SetOptionsProductComponent {
  
  @Output() emitterSelectedOptions = new EventEmitter<OptionProduct[]>()
  @Input() product?:Product
  
  groupOptions: OptionProduct[] = []
  currentGroupOption: OptionProduct[] = []

  selectedOptions: OptionProduct[] = [];
  searchGroup: string = ''
  draggin: boolean = false
  acordionState: OptionProduct[] = []
  


  constructor(private adminService: AdminService, private toast: MatSnackBar) {

  }


  ngOnInit(): void {

    if (this.product) {
      this.selectedOptions = this.product.variations
      console.log(this.selectedOptions);

      this.adminService.optionsGroup.subscribe((data) => {
        console.log(data);
  
        //eliminar los q estan en seleected
          this.currentGroupOption = this.removeSelectedOfCurrent(copy(data), this.selectedOptions)
      })

    }else{
      this.adminService.optionsGroup.subscribe((data: OptionProduct[]) => {
  
        this.currentGroupOption = copy(data)
        
      })
    }

  }

  getOptions(optionsArray: any[]) {
    return optionsArray.map(e => e.nameOption).join(', ')
  }


  toggleGroup(index: number, group: OptionProduct) {
    const i = this.selectedOptions.findIndex(item => this.areObjectsEqual(item, group));
    const existTypePrice1 = this.selectedOptions.findIndex(e => e.typePrice === 1);
    const indexAcordeon = this.acordionState.findIndex(e => this.areObjectsEqual(e, group))
    const groupInList = this.currentGroupOption.findIndex(e => this.areObjectsEqual(e, group))
    const newGroup = JSON.parse(JSON.stringify(group));
    console.log(index);
    

    if (existTypePrice1 !== -1 && group.typePrice === 1 && this.selectedOptions[existTypePrice1].nameVariation !== group.nameVariation) {
      this.toast.open('Solo Puedes agregar un Grupo que determine el precio final', '', { duration: 3000 })

      const typeInCurrent = this.currentGroupOption.findIndex(e => this.areObjectsEqual(e, this.selectedOptions[existTypePrice1]))
      
      
      console.log( typeInCurrent, groupInList);
      
      // this.currentGroupOption = [this.selectedOptions[existTypePrice1], ...this.currentGroupOption];
      this.currentGroupOption.splice(groupInList, 1);
      this.currentGroupOption.splice(0, 0, this.selectedOptions[existTypePrice1]);
      
      this.selectedOptions.splice(existTypePrice1, 1);
      this.selectedOptions = [newGroup, ...this.selectedOptions];
      

      this.acordionState.splice(indexAcordeon, 1);
      
      this.emitterSelectedOptions.emit(this.selectedOptions)
      return
    }
  
    
    if (i !== -1) {

      console.log('IFF');
      this.currentGroupOption = [this.selectedOptions[i], ...this.currentGroupOption, ]
      this.selectedOptions.splice(i, 1);
      this.acordionState.splice(index, 1);


    } else {

      console.log('ELSE');
      this.selectedOptions.splice(group.typePrice !== 1 ? this.selectedOptions.length + 1 : 0, 0, newGroup);
      this.currentGroupOption.splice(index, 1)
      this.acordionState.push(group);


    }

    this.emitterSelectedOptions.emit(this.selectedOptions)

  }

  toogleAcordeon(i: number, group: OptionProduct, bySwitch?: boolean) {
    const index = this.acordionState.findIndex(e => this.areObjectsEqual(e, group));
    const indexSelected = this.selectedOptions.findIndex(item => this.areObjectsEqual(item, group));
    const existTypePrice1 = this.selectedOptions.some(e => e.typePrice === 1);

    console.log(indexSelected, index, bySwitch);
    

    if (indexSelected === -1 && index !== -1) {
      this.acordionState.splice(index, 1);
      return
    }
    else if (index !== -1 && !bySwitch) {
      this.acordionState.splice(index, 1);
    }
    else if (indexSelected !== -1) {
      this.acordionState.push(group);
    }


  }

  toogleOption(indexSelected: number, indexOption: number) {

    const optionActive = this.selectedOptions[indexSelected].options[indexOption].active

    console.log(indexOption);

    
    if (optionActive) {
      this.selectedOptions[indexSelected].options[indexOption].active = false;
    }
    else {
      this.selectedOptions[indexSelected].options[indexOption].active = true
    }


    this.emitterSelectedOptions.emit(this.selectedOptions)


  }

  isAccordionExpanded(i: number, group: any, active?: boolean): boolean {
    return active ? this.selectedOptions.some(item => this.areObjectsEqual(item, group))
      : this.acordionState.some(item => this.areObjectsEqual(item, group));
  }


  isOptionSelected(indexGroup: number, group: OptionProduct, option: DetailsOptions) {
    const indexOptions = this.selectedOptions.findIndex(e => this.areObjectsEqual(e, group));

    if (indexOptions !== -1) {
      return this.selectedOptions[indexOptions].options.some(option => option.nameOption === option.nameOption);
    }
    return false
  }

  updatePriceOption(group: OptionProduct, option: DetailsOptions, newPrice: string) {


    const indexOptions = this.selectedOptions.findIndex(e => this.areObjectsEqual(e, group));
    const indexOption = this.selectedOptions[indexOptions].options.findIndex(e => e.nameOption === option.nameOption);

    console.log(newPrice, indexOption, indexOptions);
    this.selectedOptions[indexOptions].options[indexOption].price = Number(newPrice)
    this.emitterSelectedOptions.emit(this.selectedOptions)


  }



  removeSelectedOfCurrent(all:OptionProduct[], selected:OptionProduct[]) {
    const itemsFaltantes = all.filter(a => !selected.some(b =>  this.areObjectsEqual(a, b)));

    return itemsFaltantes;//ESTO ES CUADNO EDITAS

  }


  resetOptions(){
    this.adminService.getLocal().subscribe((data: Local) => {
      console.log(data.options_group);

      this.currentGroupOption = copy(data.options_group)
    })  
    this.selectedOptions = []
  }

  filterGroup() {
    if (this.searchGroup) {
      this.currentGroupOption = this.groupOptions.filter(item => item.nameVariation.toLowerCase().includes(this.searchGroup.toLowerCase()));
    } else {
      this.currentGroupOption = this.groupOptions.slice(0, 3);
    }
  }
  areObjectsEqual(obj1: any, obj2: any): boolean {
    // Comparar todas las propiedades excepto la propiedad 'excludedProperty'
    const excludedProperty = 'options';

    for (const prop in obj1) {
      if (prop !== excludedProperty && obj1[prop] !== obj2[prop]) {
        return false;
      }
    }
    return true;
  }


  drop(event: CdkDragDrop<any[]>){
    const prevIndex = event.previousIndex 
    const currIndex = event.currentIndex 
    
    if (this.selectedOptions[prevIndex].typePrice !== 1 && this.selectedOptions[currIndex].typePrice === 1 && currIndex === 0 )  {
      return      
    }

    moveItemInArray(this.selectedOptions, event.previousIndex, event.currentIndex);
    this.emitterSelectedOptions.emit(this.selectedOptions)
    this.draggin = false

  }


  dragStart(event: any) {
    console.log('START');
    this.draggin = true
    this.acordionState = []
    console.log(this.draggin);

  }


}
