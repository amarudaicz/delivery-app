import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  constructor() { }

  currentTheme:any

  themes:any[]=[
    {
      id:1,
      background:'#645bff',
      bgSec:'#2c3e50',
      colorText:'#303030',
      colorPrimary:'#fff',
      background_page: '#edede9'
      
    },
    {
      id:2,
      background:'blue',
      colorText:'#784511'
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
