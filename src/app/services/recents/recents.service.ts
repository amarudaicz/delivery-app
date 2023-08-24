import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, of } from 'rxjs';
import { environment } from 'src/app/environment';
import { Local } from 'src/app/interfaces/local-interface';

@Injectable({
  providedIn: 'root'
})
export class RecentsService {

  constructor(private http:HttpClient) {

    this.recents = JSON.parse(localStorage.getItem('recents')!) || []
  }
 
  recents: number[]
  localsRecents:Local[]=[]
  public recents$ = new BehaviorSubject<Local[] | undefined>(undefined)


  addRecent(local: Local) {

    const exist = this.recents?.find(e => e === local.id)
    console.log(exist);

    if (exist) {
      return
    } 
      
    this.recents.push(local.id)
    localStorage.setItem('recents', JSON.stringify(this.recents))
    console.log(this.localsRecents, local);
    
    this.recents$.next([...this.localsRecents, local])
    return
    


    

  }

  getLsRecents() {
    if (this.recents) return this.recents
    else return []
  }

  getRecents(){

    return this.http.post<Local[]>(environment.host + 'locals/get-recents', {recents:this.getLsRecents()}).pipe(
      map(res=>{
        this.localsRecents = res
        this.recents$.next(res)
      })
    )

  }
  
  

}

