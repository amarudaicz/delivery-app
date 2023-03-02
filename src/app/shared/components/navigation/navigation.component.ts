import { Component, OnInit } from '@angular/core';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(public theme:ThemesService){

  }

  ngOnInit(){

  }


  location:string = 'home'

  setNavigation(location:string){
  

  }

}
