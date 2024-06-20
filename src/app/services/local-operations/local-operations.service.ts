import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment';
import { Local, NewLocal } from 'src/app/interfaces/local-interface';

@Injectable({
  providedIn: 'root'
})
export class LocalOperationsService {

  constructor(private http:HttpClient) { 

  }


  postLocal(local:NewLocal){
    return this.http.post(`${environment.host}locals`, local)
  }

  isAvailableName(name_path:string){
    return this.http.get(`${environment.host}locals/is-path-available/${name_path}`, )
  }
}
