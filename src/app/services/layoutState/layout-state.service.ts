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
    menuMobile:false,
    navigation:true,
  }
  
  stateSubject = new BehaviorSubject<any>(this.state)
  
  updateState(){
    console.log('emitingSTate****++++');
    
    this.stateSubject.next(this.state)
  }

  blockBody(){
    document.body.style.overflow = 'hidden'

  }

  unblockBody(){
    document.body.style.overflow = ''


  }


}
