import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'src/app/interfaces/product-interface';
import { FavoritesService } from 'src/app/services/favorites/favorites.service';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { RatingService } from 'src/app/services/rating/rating.service';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  constructor(
    public theme: ThemesService,
    private localService: LocalDataService,
    private formBuilder: FormBuilder,
    private ratingService: RatingService,
    private routeData: RouteDataService,
    private favService: FavoritesService
  ) {}

  ngOnInit(): void {
  }

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
