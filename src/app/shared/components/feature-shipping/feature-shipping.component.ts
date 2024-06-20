import { Component } from '@angular/core';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-feature-shipping',
  templateUrl: './feature-shipping.component.html',
  styleUrls: ['./feature-shipping.component.scss']
})

export class FeatureShippingComponent {
  constructor(public localService:LocalDataService, public theme:ThemesService){

  }

}
