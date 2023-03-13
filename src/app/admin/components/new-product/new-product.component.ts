import { Component,OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { Category } from 'src/app/interfaces/category-interfaz';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss'],
  providers:[MatAutocomplete]
})
export class NewProductComponent implements OnInit {
  categories?:Category[]
  constructor(public theme:ThemesService, private localService:LocalDataService){

  }
  myControl = new FormControl('');

  ngOnInit(): void {
    this.categories = this.localService.getCategories()
    console.log(this.categories);
    
  }



}
