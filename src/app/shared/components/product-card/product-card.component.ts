import { Component, Input, OnInit } from '@angular/core';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements OnInit {
  constructor(public themeService:ThemesService){
  
  }

  ngOnInit(): void {
    
  }

  @Input() product:any






}
