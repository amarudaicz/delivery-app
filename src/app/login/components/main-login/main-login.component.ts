import { Component } from '@angular/core';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';

@Component({
  selector: 'app-main-login',
  templateUrl: './main-login.component.html',
  styleUrls: ['./main-login.component.scss']
})
export class MainLoginComponent {
  constructor(private routeService:RouteDataService){
    this.routeService.setCurrent('login')

  }

}
