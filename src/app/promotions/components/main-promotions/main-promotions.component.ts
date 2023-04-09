import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product-interface';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-main-promotions',
  templateUrl: './main-promotions.component.html',
  styleUrls: ['./main-promotions.component.scss']
})
export class MainPromotionsComponent implements OnInit {
  promotions?:Product[]

  constructor(
    private theme:ThemesService,
    private localService:LocalDataService,
  ){


  }

  ngOnInit(){

    this.localService.getProducts$().subscribe(data => {
      this.promotions = data.filter(e => e.category === 'promotion')
      console.log(this.promotions);
      
    })


    
  }

}
