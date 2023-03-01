import { Component, OnInit } from '@angular/core';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-products-set',
  templateUrl: './products-set.component.html',
  styleUrls: ['./products-set.component.scss']
})
export class ProductsSetComponent implements OnInit {
  constructor(public themeService:ThemesService){

  }

  ngOnInit(): void {
    this.themeService.setTheme(1)

  }





}
