import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Theme } from 'src/app/interfaces/theme-interface';
export type themeProperty = 'background'|'backgroundSec'|'name'|'id'|'colorPrimary'|'colorSecondary'| 'colorTextSecondary'|'colorText'|'backgroundPage'
@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  constructor(){}

  public currentTheme:any
  public stateTheme = new BehaviorSubject<boolean>(false)

  public themes:Theme[]=[
    {
      id:1,
      name:'Default',
      background:'#ff725e',
      backgroundSec:'#480af3',
    },
    {
      id:2,
      name:'Vibe',
      background:'#5457cd',
      backgroundSec:'#023047',
    },
    {
      id:3,
      name:'Crazy',
      background:'#EF233C',
      backgroundSec:'#2B2D42',
    },
    {
      id:4,
      name:'Seven',
      background:'#bc6c25',
      backgroundSec:'#283618',
    },
    {
      id:5,
      name:'Lato',
      background:'#ee6c4d',
      backgroundSec:'#293241',
    },
    {
      id:6,
      name:'Puna',
      background:'#f7b801',
      backgroundSec:'#3d348b',
    },
    {
      id:7,
      name:'Cali',
      background:'#ff8552',
      backgroundSec:'#297373',
    }, {
      id:8,
      name:'Colibrí',
      background:'#6F0E07',
      backgroundSec:'#242F40',
    },

    
  ]
  
  setTheme(id:any){

    if (!isNaN(id)){
      const theme = this.themes.filter((t:any) => t.id === Number(id))
      this.currentTheme = theme[0]
      this.stateTheme.next(true)
      return
    }

    this.currentTheme = JSON.parse(id)
    this.stateTheme.next(true)

  }

  getTheme(id:number){

    const theme = this.themes.filter((t:any) => t.id === Number(id))
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

  
  get(property:themeProperty){
    if (this.currentTheme) {
      return this.currentTheme[property]
    }
  }
  
  changeThemeAdmin(){
    //HTTP PARA EL UPDATE
    
  }
  
  
}