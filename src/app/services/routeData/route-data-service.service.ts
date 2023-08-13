import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class RouteDataService {
  constructor() {
    this.orign = sessionStorage.getItem('origin')
  }

  orign:string|null
  origin$ = new BehaviorSubject<any>('')
  current = new BehaviorSubject<any>('')


  setOrigin(origin:string) {
    sessionStorage.setItem('origin', origin)
    this.orign = origin
  }

  setCurrent(current:string){
    sessionStorage.setItem('current', current )
    this.current.next(current)
  }

  getOrigin(){
    return this.orign
  }

  
  getCurrent(){
    return this.current
  }

}
