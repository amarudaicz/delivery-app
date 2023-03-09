import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.scss'],
  animations:[
    fadeIn
  ]
})
export class MainHomeComponent implements OnInit {

  local: any;
  appInstalled:any = false

  constructor(
    public theme: ThemesService,
    private routeService: RouteDataService,
    private localData: LocalDataService
  ) {}

  ngOnInit(): void {
    this.routeService.setCurrent('home');


    this.localData.local.subscribe((localData:object|boolean)=>{
      this.local = localData
    })


    if (window.matchMedia('(display-mode: standalone)').matches){
      this.appInstalled = true
      console.log('stanDLONE');
      
    } 

    

    console.log('asd');
    



    // this.text = encodeURIComponent(this.text);
    // location.assign('https://wa.me/543543578188?text='+this.text)

    
 
}
  


  categories: any[] = [
    {
      name: 'Pizzas',
      image:
        'https://i.pinimg.com/564x/0e/53/1b/0e531b8da1676679b9afede96537fa4f.jpg',
    },
    {
      name: 'Hamburgesas',
      image:
        'https://i.pinimg.com/564x/73/9e/c0/739ec0afdb95c73ac566f2311a454d13.jpg',
    },
    {
      name: 'Hamburgesas',
      image:
        'https://i.pinimg.com/564x/73/9e/c0/739ec0afdb95c73ac566f2311a454d13.jpg',
    },
    {
      name: 'Pizzas',
      image:
        'https://i.pinimg.com/564x/0e/53/1b/0e531b8da1676679b9afede96537fa4f.jpg',
    },
    {
      name: 'Hamburgesas',
      image:
        'https://i.pinimg.com/564x/73/9e/c0/739ec0afdb95c73ac566f2311a454d13.jpg',
    },
    {
      name: 'Pizzas',
      image:
        'https://i.pinimg.com/564x/0e/53/1b/0e531b8da1676679b9afede96537fa4f.jpg',
    },
  ];


}
