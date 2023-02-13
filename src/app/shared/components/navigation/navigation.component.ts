import { Component, OnInit } from '@angular/core';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private themeService:ThemesService){

  }

  ngOnInit(){

    this.theme = this.themeService.getTheme(1)
  }


  location:string = ''
  theme:any
  setNavigation(){




  }

}
