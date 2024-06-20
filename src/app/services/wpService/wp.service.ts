import { Injectable } from '@angular/core';
import { FuzzySearchResponse, FuzzySearchResult } from '@tomtom-international/web-sdk-services';
import { OptionProduct } from 'src/app/interfaces/optionProduct-interface';
import { ProductCart } from 'src/app/interfaces/product-interface';
import { v4 as uuidv4 } from 'uuid';
import { LocalDataService } from '../localData/local-data.service';
import { Local } from 'src/app/interfaces/local-interface';
import { CartService } from '../cartData/cart.service';
import { Router } from '@angular/router';
interface Item {
  name: string;
  productPrice: number;
  especifications: string;
  options: string;
  category_name: string;
  quantity: number;
  total:number;
  userOptions:Array<any>
}
@Injectable({
  providedIn: 'root',
})
export class WpService {
  constructor(private localService:LocalDataService, private router: Router,
    private cartService: CartService) {
      this.localService.local$.subscribe(local=>{
        this.local = local
      })

  }
  local?:Local
  products: string = '';
  generarMensaje(cart: any[], userData: any, subtotal: number) {
    const locationUser = userData.ubication;
    const shipping = userData.shippingMethod === 'Envío a domicilio';
    const productsByCategory = this.groupByCategory(cart);
    const transfer = userData.payMethod === 'Transferencia'; 


    let mensaje = `*¡Hola!, te envío el resumen de mi compra*\n\n`;
    mensaje += `*Pedido*: ${this.genIdOrder()}\n`;
    mensaje += `*Nombre*: ${userData.name}\n`;
    mensaje +=  userData.email ? `*Email:* ${userData.email}\n\n` : '\n' ; 

    userData.payMethod ? mensaje += `*Forma de pago*: ${userData.payMethod}\n` : null;
    mensaje += `*Total*: ${this.formatNumber(subtotal)}\n`;
    userData.amountReceived && !transfer ? mensaje += `*Pago con*: ${this.formatNumber(userData.amountReceived)} \n` : '\n';
    mensaje += transfer ? '' : '\n' ;
    mensaje += transfer ? `*Datos de transferencia*:\n ►_${this.local?.pay_methods?.transfer?.nameAccount}_\n _CBU: ${this.local?.pay_methods?.transfer?.cbu}_\n _Alias: ${this.local?.pay_methods?.transfer?.alias}_\n _${this.local?.pay_methods?.transfer?.entity}_\n\n` : '';


    userData.shippingMethod ? mensaje += `*Entrega*: ${userData.shippingMethod}\n\n` : '';

    if (shipping) {
        mensaje += `*Dirección*: ${this.formatUbicationName(userData, locationUser.address)}\n`;
        userData.reference ? mensaje += `*Referencia*: ${userData.reference}\n` : null;
        mensaje += `*Ubicación:* https://www.google.com/maps/place/${locationUser.position.lat},${locationUser.position.lng}\n`;
        mensaje +=  locationUser.address.postalCode || userData.postalCode ? `*Código postal:* ${locationUser.address.postalCode ?? userData.postalCode} \n\n` : '\n'
    }

    mensaje += `_Mi pedido es_:\n\n`;

    Object.keys(productsByCategory).forEach(category => {
        mensaje += `*-----------------------*\n`;
        mensaje += `*${category.toUpperCase()}:*\n\n`;
        productsByCategory[category].forEach((product: ProductCart, i:number, arr:any[]) => {
            mensaje += ` x${product.quantity} *${product.name.toUpperCase()}*${!this.getOptionType1(product) ? ':' :` (${this.getOptionType1(product)}):`} *${this.formatNumber(product.total)}*`;
            mensaje += `${this.readUserOptions(product.userOptions)}`;

            mensaje += i + 1 === arr.length ? '\n' : '\n\n' ;
            // mensaje += this.readUserOptions(product.userOptions).length ? '\n\n' : '\n';
        });
        
        mensaje += `*-----------------------*\n\n`;
    });

    mensaje += `*TOTAL${userData.costShipping && shipping ? ` + envío` : ''}: ${this.formatNumber(subtotal)}*\n`;
    mensaje += !userData.costShipping && shipping && userData.defineCostShipping ? `_Costo de envío a definir de acuerdo a distancia_\n\n` : '\n';

    mensaje += `_Espero tu respuesta para confirmar mi pedido_`;
 
    const encodedText = encodeURIComponent(mensaje).replace(/%0A/g, '%0A%20');

    console.log(mensaje);
    return encodedText;
}


groupByCategory(products:ProductCart[]){
  const groupedProducts:any = {};

  products.forEach((product) => {
    const { category_name } = product;

    if (!groupedProducts[category_name]) {
      groupedProducts[category_name] = [];
    }

    groupedProducts[category_name].push(product);
  });

  return groupedProducts;


}


readUserOptions(userOptions:OptionProduct[]):string{
  let text:string = ''
  
  userOptions.forEach(e =>{

    if (e.typePrice === 1) {
      return
    }

    if (!e.multiple){
      return text += `\n  ${e.nameVariation}: ${e.nameOption}`
      return 
    }

    let multiples = ''

    e.multipleOptions?.forEach((e,i) => {
      multiples += `\n    - ${e.nameOption}${e.price ? ': *'+ this.formatNumber(e.price) + '*' : ''}`
    })

    return text += `\n  ${e.nameVariation}:${multiples}`
  })

  return text.toLocaleUpperCase()
}

getOptionType1(product:ProductCart){
  return product.userOptions.find(o => o.typePrice === 1)?.nameOption ?? null
}
  
genIdOrder(): string {
    let codigo = '';
    const caracteres =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const longitud = 5;
    for (let i = 0; i < longitud; i++) {
      codigo += caracteres.charAt(
        Math.floor(Math.random()*caracteres.length)
      );
    }
  return codigo;
}


redirectWp(encodedText:string, phone:number){

  window.open(`https://api.whatsapp.com/send?phone=+${phone}&text=${encodedText}`)
  this.router.navigate([this.local?.name_url!]);
  this.cartService.clearCart();
}

clearMessage(){
  this.products = ''
}


formatUbicationName(userData:any,ubication:any){

  return `${ubication.streetName} ${userData.streetNumber ?? ubication.streetNumber}, ${ubication.localName ? ubication.localName : ubication.countrySecondarySubdivision }, ${ubication.countrySubdivision ? ubication.countrySubdivision : ubication.country}`
}


formatNumber(n:number){
  if (!n) return ''
  
  return Intl.NumberFormat('es-AR', {style:'currency', currency:'ARS', minimumFractionDigits: 0}).format(n)
}



contactSoporte(){
  window.open(`https://wa.me/${3543655547}`)
}

}