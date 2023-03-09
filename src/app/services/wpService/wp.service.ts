import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
interface Item {
  name: string;
  price: number;
  especifications: string;
  options: string;
  category: string;
  quantity: number;
}
@Injectable({
  providedIn: 'root',
})
export class WpService {
  constructor() {}
  
  products: string = '';
  encodeText(cart: any[], userData: any, subtotal: number) {
    const categories = cart.map((e) => e.category);


    const cleanCategories = categories.filter((elemento, indice) => {
      return categories.indexOf(elemento) === indice;
    });

    cleanCategories.forEach((cat) => {
    const categoryItems: Item[] = cart.filter((e) => e.category === cat);



    categoryItems.forEach((e: Item, index: number) => {
this.products += `${index === 0 ? e.category.toUpperCase()+`
---------
`: ''}X${e.quantity} ${e.name} $${e.price}.00

`}); 

});




const text: string = `
𝗛𝗼𝗹𝗮 𝘁𝗲 𝗽𝗮𝘀𝗼 𝗲𝗹 𝗿𝗲𝘀𝘂𝗺𝗲𝗻 𝗱𝗲 𝗺𝗶 𝗽𝗲𝗱𝗶𝗱𝗼:

𝗣𝗲𝗱𝗶𝗱𝗼: ${this.genIdOrder()}
𝗡𝗼𝗺𝗯𝗿𝗲: ${userData.name}

𝗙𝗼𝗿𝗺𝗮 𝗗𝗲 𝗣𝗮𝗴𝗼: ${userData.payMethod}
𝗧𝗼𝘁𝗮𝗹: $${subtotal}.00
${userData.shippingMethod === 'delivery'? '𝗣𝗮𝗴𝗼 𝗖𝗼𝗻: $'+userData.amountReceived+'.00' + `
`: ' '}
𝗘𝗻𝘁𝗿𝗲𝗴𝗮: ${userData.shippingMethod}
${userData.shippingMethod === 'delivery'? '𝗗𝗶𝗿𝗲𝗰𝗰𝗶𝗼𝗻: '+userData.direction+ `
`: ' '}
𝗠𝗶 𝗽𝗲𝗱𝗶𝗱𝗼 𝗲𝘀:

${this.products}
𝗘𝘀𝗽𝗲𝗿𝗼 𝘁𝘂 𝗿𝗲𝘀𝗽𝘂𝗲𝘀𝘁𝗮 𝗽𝗮𝗿𝗮 𝗰𝗼𝗻𝗳𝗶𝗿𝗺𝗮𝗿 𝗺𝗶 𝗽𝗲𝗱𝗶𝗱𝗼`;


    console.log(text);
    const encodedText = encodeURIComponent(text);
    this.clearMessage()
    return encodedText
  }

  
  genIdOrder(): string {
    let codigo = '';
    const caracteres =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const longitud = 5;
    for (let i = 0; i < longitud; i++) {
      codigo += caracteres.charAt(
        Math.floor(Math.random() * caracteres.length)
      );
    }
    return codigo;
  }


  redirectWp(encodedText:string, telephone:number){

    location.assign(`https://api.whatsapp.com/send?phone=+${telephone}&text=${encodedText}`)

  }

  clearMessage(){
    this.products = ''
  }
}
