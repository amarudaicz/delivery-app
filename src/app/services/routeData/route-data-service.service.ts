import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class RouteDataService {
  constructor() {
    this.orign = sessionStorage.getItem('origin')
    this.current = sessionStorage.getItem('current')
  }

  orign:string|null
  origin$ = new BehaviorSubject<any>('')
  current:string|null


  setOrigin(origin:string) {
    sessionStorage.setItem('origin', origin)
    this.orign = origin
  }

  setCurrent(current:string){
    sessionStorage.setItem('current', current )
    this.current = current
  }

  getOrigin(){
    return this.orign
  }

  
  getCurrent(){
    return this.current
  }

}
