import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.scss']
})
export class MainHomeComponent implements OnInit {
  constructor(private route:ActivatedRoute, private themeService:ThemesService){}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:Params)=>{
      this.local = params['params'].local
      console.log(this.local);
    });


    this.local = {
      name:'Punto Pizza',
      ubication:'Rio Ceballos, Alem 99',
      theme:1
    }
    
    this.theme = this.themeService.getTheme(this.local.theme)
    
  }
  
  local?:{name:string, ubication:string, theme:number}
  
  theme:any

  categories:any[] = [
    {
      name:'Pizzas',
      image:'https://i.pinimg.com/564x/0e/53/1b/0e531b8da1676679b9afede96537fa4f.jpg',
    },
    {
      name:'Hamburgesas',
      image:'https://i.pinimg.com/564x/73/9e/c0/739ec0afdb95c73ac566f2311a454d13.jpg',
    },
    {
      name:'Hamburgesas',
      image:'https://i.pinimg.com/564x/73/9e/c0/739ec0afdb95c73ac566f2311a454d13.jpg',
    },
    {
      name:'Pizzas',
      image:'https://i.pinimg.com/564x/0e/53/1b/0e531b8da1676679b9afede96537fa4f.jpg',
    },{
      name:'Hamburgesas',
      image:'https://i.pinimg.com/564x/73/9e/c0/739ec0afdb95c73ac566f2311a454d13.jpg',
    },
    {
      name:'Pizzas',
      image:'https://i.pinimg.com/564x/0e/53/1b/0e531b8da1676679b9afede96537fa4f.jpg',
    },
    
  ] 
 

  

}
