import { Component, OnInit } from '@angular/core';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private themeService:ThemesService){


  }

  ngOnInit(): void {
   this.theme = this.themeService.getTheme(1)
  }

  theme:any

}
