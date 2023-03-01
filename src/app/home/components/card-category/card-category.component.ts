import { Component,Input, OnInit } from '@angular/core';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-card-category',
  templateUrl: './card-category.component.html',
  styleUrls: ['./card-category.component.scss']
})



export class CardCategoryComponent implements OnInit {

  constructor(private themeService:ThemesService){


  }

  ngOnInit(): void {
    this.theme = this.themeService.getTheme(1)
  }

  
  theme?:any
    
  @Input() category?:any



}