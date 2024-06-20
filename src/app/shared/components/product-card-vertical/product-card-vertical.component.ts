import { Component, Input } from '@angular/core';
import { Product } from 'src/app/interfaces/product-interface';

@Component({
  selector: 'app-product-card-vertical',
  templateUrl: './product-card-vertical.component.html',
  styleUrls: ['./product-card-vertical.component.scss']
})
export class ProductCardVerticalComponent {
  
  @Input() product: Product | any;
  @Input() linkMode?: 'name' | 'category-name';
  
  getOptionWithLowestPrice(product: Product): any | null {
    let lowestPrice: number = Infinity;
    const existType1 = product.variations?.findIndex((v) => v.typePrice === 1);

    if (existType1 === -1) return 0; 

    for (const option of product.variations[existType1].options) {
      if (option.price < lowestPrice && option.active) {
        lowestPrice = option.price;
      }
    }

    console.log(lowestPrice);
    return lowestPrice === Infinity ? 0 : lowestPrice;
  }
}
