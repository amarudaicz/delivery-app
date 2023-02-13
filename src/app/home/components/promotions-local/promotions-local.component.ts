import { Component,OnInit } from '@angular/core';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-promotions-local',
  templateUrl: './promotions-local.component.html',
  styleUrls: ['./promotions-local.component.scss']
})
export class PromotionsLocalComponent implements OnInit {

  constructor(private themeService:ThemesService){

  }
  ngOnInit(): void {
    this.theme = this.themeService.getTheme(1)
    
  }
  
  theme:any

}
