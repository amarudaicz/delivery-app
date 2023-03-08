import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/app/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalDataService {

  constructor( private http:HttpClient) {

  }

  public local = new BehaviorSubject<object|boolean>(false)

  nextLocal(local:any){
    this.local.next(local)
  }

  getLocal(name:string){
    return this.http.get(environment.host + 'locals/1')
  }






  
}
