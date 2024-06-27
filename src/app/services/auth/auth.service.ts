import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, map, of, throwError } from 'rxjs';
import { environment } from 'src/app/environment';
import { User } from 'src/app/interfaces/user-interface';
import { handleError } from 'src/app/utils/handle-error-http';

interface UserLogin{
  username:string,
  password:string
}

interface UserRegister{
  email:string,
  username:string,
  password:string,
  repeatPassword:string
}



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  private token: string|null = null;


  getUser(id?:number){
    return this.http.get<User>(environment.host + `users`)
  }

  setToken(token: string, exp:number): void {
    localStorage.setItem('jwt', token);
    localStorage.setItem('exp', String(exp))
    this.token = token;
  }

  getToken(): string|null {
    if (!this.token) {
      this.token = localStorage.getItem('jwt')!
    }
    return this.token;
  }

  deleteToken(): void {
    localStorage.removeItem('jwt');
    localStorage.removeItem('exp');
    this.token = null;
  }

  async isLogged(){
    const token = localStorage.getItem('jwt')
    if(!token) return false;

    const isLogged = await this.verifyToken(token);
    if (!isLogged) return false;
    
    return isLogged;
  }    
  verifyToken(token:string){
    return firstValueFrom(
      this.http.get<any>(`${environment.host}login/verify_token?token=${token}`)
    )

  }

  logIn(user:UserLogin){
    return this.http.post<any>(environment.host + 'login', user)
  }

  signIn(user:UserRegister){
    return this.http.post<any>(environment.host + 'admin', user)
  }


  sendEmailToResetPassword(email:string){
    return this.http.post(`${environment.host}login/send_reset_password`, email)
  }

  resetPassword({password, token}:{password:string, token:string}){
    return this.http.post(`${environment.host}login/reset_password`, {password}, {headers:{'Authorization':`Bearer ${token}`}})
  }


  


}