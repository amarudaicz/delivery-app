import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Theme } from 'src/app/interfaces/theme-interface';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  constructor() { 

  }

  public currentTheme:any
  private stateTheme = new BehaviorSubject<boolean>(false)

  themes:Theme[]=[
    {
      id:1,
      name:'Default',
      background:'#FF6262',
      backgroundSec:'#480AF3',
      backgroundPage: '#edede9',
      colorPrimary:'#2c3e24',
      colorSecondary: '#2c3e50',
      colorText:'#303030',
      colorTextSecondary: '#fff',
    },
    {
      id:2,
      name:'Vibe',
      background:'#ffb703',
      backgroundSec:'#023047',
      backgroundPage: '#edede9',
      colorText:'#303030',
      colorTextSecondary: 'string',
      colorPrimary:'#fff',
      colorSecondary: 'string',
    },
    {
      id:3,
      name:'Like Crazy',
      background:'#EF233C',
      backgroundSec:'#2B2D42',
      colorPrimary:'#EDF2F4',
      colorSecondary: 'string',
      colorText:'#D90429',
      colorTextSecondary: 'string',
      backgroundPage: '#8D99AE',
    }
  ]


  setTheme(id:number){
    const theme = this.themes.filter((t:any) => t.id === id)
    console.log(id);
    this.currentTheme = theme[0]
    this.stateTheme.next(true)
  }

  getTheme(id:number){
    const theme = this.themes.filter((t:any) => t.id === id)
    return theme[0]
  }

  getCurrentTheme(){
    return this.currentTheme
  }

  getThemeState(){
    console.log(this.stateTheme);
    return this.stateTheme
  }

  getAllThemes(){
    if (this.currentTheme) {
      return this.themes.filter(t => t.id !== this.currentTheme?.id)
    }else{
      return []
    }
  }

  get(property:string){
    if (this.currentTheme) {
      return this.currentTheme[property]
      
    }
  }

  changeThemeAdmin(){
    //HTTP PARA EL UPDATE
    
  }


}
