import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product-interface';


@Pipe({
  name: 'lowestPrice'
})
export class LowestPricePipe implements PipeTransform {
  transform(product: Product): number | null {
    let lowestPrice: number = Infinity;
    const existType1 = product.variations?.findIndex((v) => v.typePrice === 1);

    console.log(existType1);
    
    if (existType1 === -1) return null;

    for (const option of product.variations[existType1].options) {
      if (option.price < lowestPrice && option.active) {
        
        console.log(option.price);
        lowestPrice = option.price;
      }
    }

    return lowestPrice === Infinity ? null : lowestPrice;
  }
}



@Pipe({
  name: 'maxPrice'
})
export class MaxPricePipe implements PipeTransform {
  transform(product: Product): number | null {
    let lowestPrice: number = Infinity;
    const existType1 = product.variations?.findIndex((v) => v.typePrice === 1);

    console.log(existType1);
    
    if (existType1 === -1) return null;

    for (const option of product.variations[existType1].options) {
      if (option.price > lowestPrice && option.active) {
        
        console.log(option.price);
        lowestPrice = option.price;
      }
    }

    return lowestPrice === Infinity ? null : lowestPrice;
  }
}
