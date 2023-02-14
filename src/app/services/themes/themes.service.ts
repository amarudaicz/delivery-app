import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  constructor() { }


  themes:any[]=[
    {
      id:1,
      background:'#ff7b37',
      bgSec:'#404040',
      colorText:'#303030',
      colorPrimary:'#fff',
      background_page: '#edf2f4'
      
    },
    {
      id:2,
      background:'blue',
      colorText:'#784511'
    }
  ]

  getTheme(id:number){
    console.log(id);
    
    const theme = this.themes.filter((t:any) => t.id === id)
    console.log(theme);
    return theme[0]

    
  }
}
