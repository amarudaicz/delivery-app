import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'src/app/interfaces/product-interface';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { RatingService } from 'src/app/services/rating/rating.service';
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
    private ratingService:RatingService
  ) {
    this.ratingForm = this.formBuilder.group({
      rating: null,
    });
  }

  ngOnInit(): void {}

  ratingForm: FormGroup;

  @Input() product: Product | any;
  localName?: string;
  fav: boolean = false;

  toogleFav() {
    this.fav = !this.fav;
  }

  saveRating() {
    console.log(this.product);

    this.ratingService.setLSRating(this.ratingForm.get('rating'))
    
    this.ratingForm.reset();
  }
}
