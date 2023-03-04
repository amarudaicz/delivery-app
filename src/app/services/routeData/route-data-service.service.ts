import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class RouteDataService {
  constructor(private route:ActivatedRoute) {

  }

  public page:any

  getRouteData() {
    return this.page;
  }

}
