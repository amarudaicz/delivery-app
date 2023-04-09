import { Component,OnInit } from '@angular/core';
import { Theme } from 'src/app/interfaces/theme-interface';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-loader-full',
  templateUrl: './loader-full.component.html',
  styleUrls: ['./loader-full.component.scss']
})
export class LoaderFullComponent implements OnInit {
  theme?:Theme
  
  constructor(public themeService:ThemesService){

  }

  ngOnInit(): void {
    this.theme = this.themeService.getTheme(1)
  }
    
    

}
