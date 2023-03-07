import { Component,OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.scss']
})
export class MainHomeComponent implements OnInit {
  constructor(private route:ActivatedRoute, public theme:ThemesService, private routeService:RouteDataService){}

  ngOnInit(): void {
    this.routeService.setCurrent('home')

    this.route.paramMap.subscribe((params:Params)=>{
      console.log(params['params'].local);
      
      this.local = params['params'].local
      this.routeService.setOrigin(params['params'].local)
    });


    this.local = {
      name:'Punto Pizza',
      ubication:'Rio Ceballos, Alem 99',
      theme:1
    }

    this.text = encodeURIComponent(this.text)
    // location.assign('https://wa.me/543543578188?text='+this.text)

    console.log(this.text);
    console.log('asdsadsd');

    
    
    
  }
  
  local?:{name:string, ubication:string, theme:number}
  

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



  text:any = `
  𝗛𝗼𝗹𝗮 𝘁𝗲 𝗽𝗮𝘀𝗼 𝗲𝗹 𝗿𝗲𝘀𝘂𝗺𝗲𝗻 𝗱𝗲 𝗺𝗶 𝗽𝗲𝗱𝗶𝗱𝗼:

  𝗡𝗼𝗺𝗯𝗿𝗲: Amaru
  𝗗𝗶𝗿𝗲𝗰𝗰𝗶𝗼𝗻: Ortiz de ocampo 298
  
  𝗙𝗼𝗿𝗺𝗮 𝗗𝗲 𝗣𝗮𝗴𝗼: Efectivo
  𝗧𝗼𝘁𝗮𝗹: $1.500
  𝗣𝗮𝗴𝗼 𝗖𝗼𝗻: $2.000
  
  𝗠𝗶 𝗽𝗲𝗱𝗶𝗱𝗼 𝗲𝘀:
  
  𝗣𝗶𝘇𝘇𝗮𝘀: x1 Mozzarella
  
  𝗧𝗢𝗧𝗔𝗟: $1.500
  
  𝗘𝘀𝗽𝗲𝗿𝗼 𝘁𝘂 𝗿𝗲𝘀𝗽𝘂𝗲𝘀𝘁𝗮 𝗽𝗮𝗿𝗮 𝗰𝗼𝗻𝗳𝗶𝗿𝗺𝗮𝗿 𝗺𝗶 𝗽𝗲𝗱𝗶𝗱𝗼
  
  `

 


}
