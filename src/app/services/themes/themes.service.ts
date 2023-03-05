import { Injectable } from '@angular/core';
import { Theme } from 'src/app/interfaces/theme-interface';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  constructor() { }

  currentTheme:any

  themes:Theme[]=[
    {
      id:1,
      background:'#645bff',
      backgroundSec:'#2c3e50',
      backgroundPage: '#edede9',
      colorText:'#303030',
      colorTextSecondary: '#fff',
      colorPrimary:'',
      colorBorderPrimary: 'string',
      colorBorderSecondary: 'string',
      colorSecondary: 'string'
    },
    {
      id:2,
      background:'#645bff',
      backgroundSec:'#2c3e50',
      backgroundPage: '#edede9',
      colorText:'#303030',
      colorPrimary:'#fff',
      colorTextSecondary: 'string',
      colorBorderPrimary: 'string',
      colorBorderSecondary: 'string',
      colorSecondary: 'string'
    }
  ]


  setTheme(idTheme:number){
    const theme = this.themes.filter((t:any) => t.id === idTheme)
    this.currentTheme=theme[0]
  }

  getTheme(id:number){
    const theme = this.themes.filter((t:any) => t.id === id)
    return theme[0]
  }

  get(property:string){
    return this.currentTheme[property]
  }


}
