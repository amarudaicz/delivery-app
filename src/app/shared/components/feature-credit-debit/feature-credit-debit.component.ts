import { Component } from '@angular/core';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-feature-credit-debit',
  templateUrl: './feature-credit-debit.component.html',
  styleUrls: ['./feature-credit-debit.component.scss']
})
export class FeatureCreditDebitComponent {
  constructor(public localService:LocalDataService, public theme:ThemesService){

  }
}
