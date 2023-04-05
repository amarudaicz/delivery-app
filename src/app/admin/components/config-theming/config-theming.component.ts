import { Component,OnInit,OnDestroy } from '@angular/core';
import { Theme } from 'src/app/interfaces/theme-interface';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-config-theming',
  templateUrl: './config-theming.component.html',
  styleUrls: ['./config-theming.component.scss']
})
export class ConfigThemingComponent implements OnInit {
  editing:boolean=false
  currentTheme:any|Theme
  currentProp:string[]=[]
  allThemes?:any[]
  
  constructor(private theme:ThemesService){}

  ngOnInit(): void {

    this.theme.getCurrent().subscribe((data)=>{
      console.log(data);
      this.currentTheme = data
      this.currentProp = Object.keys(data).splice(2,20)
      this.allThemes = this.theme.getAllThemes()
      console.log(this.allThemes);
      
    })

      
  }
  

  saveThemeLocal(){
    this.editing = false
  }

  editThemeLocal(){
    this.editing = true    
  }
  



}
