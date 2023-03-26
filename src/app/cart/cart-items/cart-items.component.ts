import { Component } from '@angular/core';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { ItemCart } from 'src/app/interfaces/itemCart-interfaz';
import { Product } from 'src/app/interfaces/product-interface';
import { CartService } from 'src/app/services/cartData/cart.service';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';
import { deleteRepeatElement } from 'src/app/utils/deleteRepeatElement';

@Component({
  selector: 'app-cart-items',
  templateUrl: './cart-items.component.html',
  styleUrls: ['./cart-items.component.scss'],
  animations:[
    fadeIn
  ]
})
export class CartItemsComponent {
  itemsCart: ItemCart[]=[]; // products will be stored as an array of objects
  subtotal = 0;
  multipleOptions:any
  finalGroup:any[] = []

  constructor(private cartService: CartService, public theme: ThemesService, public routeService:RouteDataService) {}


  ngOnInit(): void {
    this.routeService.setCurrent('cart')
    
    this.cartService.getCartItems().subscribe((items:ItemCart[]) => {
      this.itemsCart = items;     
       
      if (items.length === 0){
        this.subtotal = 0
        return
      }
      
      this.subtotal = items.map(e => e.total*e.quantity).reduce((prev, act)=>prev + act)

      this.multipleOptions = this.multipleOptionsGroup()
      console.log(this.multipleOptions);
      
    });
  }

  clearCart() {
    this.itemsCart = [];
    this.subtotal = 0;
    this.cartService.clearCart()
  }


  // This method removes a product from the cart and updates the subtotal
  removeProduct(id: number) {
    this.cartService.removeFromCart(id)
    console.log(this.subtotal);
    
  
  }

  setQuantity(id: number, number: number, currentValue: any) {
    console.log(id);
    
    if (number === 1) {
      this.cartService.updateQuantity(id, number);
    } else {
      if (Number(currentValue) > 1) {
        this.cartService.updateQuantity(id, number);
      }
    }
  }



  multipleOptionsGroup(){
    const group = this.itemsCart!.map(e => e.userOptions)
    const groupFiltred = this.filtrarObjetos(group, ['nameVariation', 'multiple'])
    console.log(groupFiltred);
    
    groupFiltred.forEach(e =>{
      const index = this.finalGroup.findIndex((h:any) => h.nameVariation === e.nameVariation)
      
      if (index !== -1 ) {
        this.finalGroup[index].options.push({nameOption:e.nameOption, price:e.price})
      }else{
        this.finalGroup.push({nameVariation:e.nameVariation, options:[{nameOption:e.nameOption, price:e.price}]})
      }
      
    })
    return deleteRepeatElement(this.finalGroup)
  }

  filtrarObjetos(arrObjetos: any[][], propiedadesComunes: string[]): any[] {
    let objetosFiltrados = [];
    
    for(let i=0; i<arrObjetos.length; i++){
      for(let j=0; j<arrObjetos[i].length; j++){
        let objetoActual = arrObjetos[i][j];
        let cumpleConPropiedades = true;
  
        for(let k=0; k<propiedadesComunes.length; k++){
          if(!objetoActual[propiedadesComunes[k]]){
            cumpleConPropiedades = false;
            break;
          }
        }
  
        if(cumpleConPropiedades){
          objetosFiltrados.push(objetoActual);
        }
      }
    }
  
    return objetosFiltrados;
  }
}
