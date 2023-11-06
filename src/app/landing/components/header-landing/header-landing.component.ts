import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { enterLeft } from 'src/app/animations/main-animations';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header-landing',
  templateUrl: './header-landing.component.html',
  styleUrls: ['./header-landing.component.scss'],
  animations:[fadeIn, enterLeft]
})

export class HeaderLandingComponent {
  menuLanding:boolean = false
  routeActive?:string
  fixedHeader:boolean = false
    
  constructor(private layout:LayoutService, private router: Router){

    this.router.events.subscribe(event => {
      
      if (event instanceof NavigationEnd) {
        this.menuLanding = false
        // Aquí puedes realizar acciones cuando se completa una navegación
        console.log('Se ha completado una navegación');
        this.routeActive = this.router.url;
      }
    });

    console.log('HEADER');
    
 
  }


  
  @HostListener('document:scroll', ['$event'])
  onScroll(event:any) {
    if (window.scrollY > 0) {
      this.fixedHeader = true
    }else{
      this.fixedHeader = false
    }
    
 

  }
  

}
