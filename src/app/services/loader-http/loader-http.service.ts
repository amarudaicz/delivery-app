import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderHttpService {

  constructor() { }
 

  isLoading = new BehaviorSubject<boolean>(true);

  show() {
     this.isLoading.next(true);
  }

  hide() {
     this.isLoading.next(false);
  }
}
