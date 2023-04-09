import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LayoutStateService {

  constructor() { }



  state = {
    header:true,
    menuMobile:false
  }
}
