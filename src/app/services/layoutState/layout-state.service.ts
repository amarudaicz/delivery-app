import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutStateService {

  constructor() {
   }


  
  state = {
    header:true,
    menuMobile:false
  }
  
  stateSubject = new BehaviorSubject<any>(this.state)
  
  updateState(){
    this.stateSubject.next(this.state)
  }


}
