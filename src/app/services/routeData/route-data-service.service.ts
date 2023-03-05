import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class RouteDataService {
  constructor() {
    this.orign = localStorage.getItem('origin')
    this.current = localStorage.getItem('current')
  }

  orign:string|null
  current:string|null

  setOrigin(origin:string) {
    localStorage.setItem('origin', origin)
    this.orign = origin

  }

  setCurrent(current:string){
    localStorage.setItem('current', current )
    this.current = current
  }

  getOrigin(){
    return this.orign
  }

  
  getCurrent(){
    console.log(this.current);
    
    return this.current
  }

}
