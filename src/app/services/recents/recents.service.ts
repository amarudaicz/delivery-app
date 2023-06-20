import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { environment } from 'src/app/environment';
import { Local } from 'src/app/interfaces/local-interface';

@Injectable({
  providedIn: 'root'
})
export class RecentsService {

  constructor(private http:HttpClient) {

    this.recents = JSON.parse(localStorage.getItem('recents') || '[]')
    console.log(this.recents);

  }

  recents: number[]
  localsRecents:Local[]=[]


  addRecent(local: Local) {

    const exist = this.recents?.find(e => e === local.id)
    console.log(exist);


    console.log(this.recents);
    if (exist) {
      return
    } else if (this.recents) {
      this.recents.push(local.id)
      localStorage.setItem('recents', JSON.stringify(this.recents))
      return
    }



  }

  getLsRecents() {
    if (this.recents) return this.recents
    else return []
  }

  getRecents(){

    if (!this.getLsRecents().length) return of([])
    
    if (!this.localsRecents.length) return this.http.post<Local[]>(environment.host + 'locals/get-recents', {recents:this.getLsRecents()})

    return of(this.localsRecents)
  }

}

