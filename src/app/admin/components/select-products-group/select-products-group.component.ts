import { Component, HostListener, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OptionProduct } from 'src/app/interfaces/optionProduct-interface';
import { Product } from 'src/app/interfaces/product-interface';

@Component({
  selector: 'app-select-products-group',
  templateUrl: './select-products-group.component.html',
  styleUrls: ['./select-products-group.component.scss'],
})
export class SelectProductsGroupComponent {


  productIds:number[] = []
  selectedAll:boolean = false

  constructor( 
    public dialogRef: MatDialogRef<SelectProductsGroupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {products:Product[], group:OptionProduct},
    ){
    console.log(data);
    
    data.products.forEach((e:Product | any) => {
      e.variations = e.variations.filter((e:any) => 
        e.nameVariation === data.group.nameVariation)
        e.selected = false //Propiedad para manejar estado
    })


    console.log(data);
    
      
  }


  toogleProduct(productId:number){
    const index = this.productIds.findIndex(e => e === productId)

    if (index !== -1) {
      this.productIds.splice(index, 1)
    }else{
      this.productIds = [productId , ...this.productIds]
    }

    
  }

  saveSelectedProducts(){
    console.log(this.data);
    this.data.products = this.data.products.filter(e => e.selected)
    this.dialogRef.close(this.data)

  }

  
  closeModal(){
    this.dialogRef.close(undefined)
  }



  selectAll(){
    
    console.log(this.selectedAll);
    
    if (!this.selectedAll) {
      this.selectedAll = true
      this.data.products.forEach(e => e.selected = true)
    }else{
      this.selectedAll = false
      this.data.products.forEach(e => e.selected = false)
      console.log(this.selectedAll);
    }
  }

  @HostListener('window:popstate')
  onPopState() {
    // Detectar el evento de retroceso del historial
    this.closeModal();
  }
}
