import { Injectable } from '@angular/core';
import { OptionProduct } from 'src/app/interfaces/optionProduct-interface';
import { ProductCart } from 'src/app/interfaces/product-interface';
import { v4 as uuidv4 } from 'uuid';
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
  constructor() {}
  products: string = '';


  
  encodeText(cart: any[], userData: any, subtotal: number) {
    const categories = cart.map((e) => e.category_name);

    
    const cleanCategories = categories.filter((elemento, indice) => {
      return categories.indexOf(elemento) === indice;
    });


    cleanCategories.forEach((cat) => {
    const categoryItems: Item[] = cart.filter((e) => e.category_name === cat);



    categoryItems.forEach((e: Item, index: number) => {
this.products += `${index === 0 ? e.category_name.toUpperCase()+`
---------
`: ''}X${e.quantity} ${e.name} ${Intl.NumberFormat('es-AR', {style:'currency', currency:'ARS'}).format(e.total)}
${this.readUserOptions(e.userOptions).trim()}\n
${e.especifications !== '' ? `Especificaciones: ${e.especifications}` : ''}`}); 
});

const text: string = `
*Hola, te envio el resumen de mi compra*

*Pedido*: ${this.genIdOrder()} 
*Nombre*: ${userData.name}

*Forma de pago*: ${userData.payMethod}
*Total*: $${subtotal}.00 ${userData.shippingMethod === 'Delivery'?'+ ENVIO':''}
${userData.shippingMethod === 'Delivery' && userData.amountReceived ? `*Pago con*: ${this.formatNumber(userData.amountReceived)}` : ''}

*Entrega*: ${userData.shippingMethod}
${userData.shippingMethod === 'Delivery' ? 
`*Dirección*: ${userData.direction}`: ' '}

*Mi compra es*:

${this.products}

*Espero tu respuesta para confirmar mi pedido*`;

console.log(text);
const encodedText = encodeURIComponent(text).replace(/%0A/g, '%0A%20');

this.clearMessage()
return encodedText
}

// {name:string, payMethod:string}
generarMensaje(cart:any[], userData:any , subtotal: number) {
  console.log(userData);
  const categoriesRead:any[] = []
  
  let mensaje = `*¡Hola!, te envío el resumen de mi compra*\n\n`;
  const envio = userData.shippingMethod === 'Delivery' ? '+ ENVIO' : '';
  

  mensaje += `*Pedido*: ${this.genIdOrder()}\n`
  mensaje += `*Nombre*: ${userData.name}\n\n`;
  // mensaje += `*Telefono*: ${userData.name}\n\n`;

  mensaje += `*---------------------------*\n`;
  mensaje += `*Forma de pago*: ${userData.payMethod}\n`;
  mensaje += `*Total*: ${this.formatNumber(subtotal)}\n`;
  userData.amountReceived ? mensaje += `*Pago con*: ${this.formatNumber(userData.amountReceived)} \n` : '';
  mensaje += `*---------------------------*\n\n`;


  mensaje += `*Entrega*: ${userData.shippingMethod}\n`;
  userData.shippingMethod === 'Delivery' ? mensaje += `*Dirección*: ${userData.direction}\n\n` : mensaje += '\n';
  
  mensaje += `_Mi compra es_:\n\n`; 

  cart.forEach((product, i) => {
    console.log(product);
    if (!categoriesRead.includes(product.category_name)) {
      mensaje += `*${product.category_name.toUpperCase()}*\n`;
      mensaje += `*---------------*\n`;
      categoriesRead.push(product.category_name)
    }

    mensaje += `x${product.quantity} *${product.name.toUpperCase()}${this.getOptionType1(product) ? ` (${this.getOptionType1(product)?.nameOption?.toUpperCase()})` : ''}:* ${this.formatNumber(product.total)}\n`;
    if (!product.userOptions.length) {
      mensaje += `\n`;
      return
    }

    mensaje += `${this.readUserOptions(product.userOptions)}\n\n`
  });

  mensaje += `\n*TOTAL: ${this.formatNumber(subtotal)}${userData.shippingMethod === 'Delivery' ? ' *' : ''}*\n`
  mensaje += userData.shippingMethod === 'Delivery' ? `► _* Costo de envío a definir de acuerdo a distancia_\n\n` : '\n'

  mensaje += `_Espero tu respuesta para confirmar mi pedido_`;

  const encodedText = encodeURIComponent(mensaje).replace(/%0A/g, '%0A%20');
  
  console.log(mensaje);
  return encodedText
}


readUserOptions(userOptions:OptionProduct[]){
  let text:any = ''
  
  userOptions.forEach(e =>{
    if (e.typePrice===1) {
      return
    }

    if (!e.multiple){
      text += ` ${e.nameVariation}: ${e.nameOption}\n`
      return
    }


    let multiples = ''
    
    e.multipleOptions?.forEach(e => {
      multiples += ` \n - ${e.nameOption} ${this.formatNumber(e.price)}`
    })

    text += ` ${e.nameVariation}:${multiples}`
    return

  })

  return text.toLocaleUpperCase()
}

getOptionType1(product:ProductCart){
  return product.userOptions.find(o => o.typePrice === 1) || null
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

}

clearMessage(){
  this.products = ''
}




formatNumber(n:number){
  return Intl.NumberFormat('es-AR', {style:'currency', currency:'ARS', minimumFractionDigits: 0}).format(n)
}

}

`
*¡Hola!, te envío el resumen de mi compra*
 
 *Pedido*: V17DD
 *Nombre*: Amaru Daicz
 
 *---------------------------*
 *Forma de pago*: Transferencia
 *Total*: $ 1.084
 *---------------------------*
 
 *Entrega*: Local
 
 _Mi compra es_:
 
 *PIZZAS*
 *---------------*
 x1 *PALMITOS (Media):* $ 450
  AGREGA UNA BEBIDA: 
  - COCACOLA $ 150
 
 x1 *NAPOLITANA (Completa):* $ 600
 
 
 *HAMBURGESAS*
 *---------------*
 x1 *BIG MAC:* $ 34
  SALSAS: 
  - MAYONESA CON CHIMI - $ 150 
  - SALSA CRIOLLA - $ 0
 
 
 *TOTAL: $ 1.084*
 
 _Espero tu respuesta para confirmar mi pedido_`