import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class RouteDataService {
  constructor(private route:ActivatedRoute) {
    this.orign = localStorage.getItem('origin')

  }

  orign:string|null

  setOrigin(origin:string) {
    localStorage.setItem('origin', origin)
  }

  getOrigin(){
    return this.orign

  }

}
