import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, of, throwError } from 'rxjs';
import { environment } from 'src/app/environment';
import { User } from 'src/app/interfaces/user-interface';

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

  constructor(private http:HttpClient, private cookie:CookieService) { }

  private token: string|null = null;


  getUser(id?:number){
    return this.http.get<User>(environment.host + `users`)
  }

  setToken(token: string, exp:number): void {
    this.cookie.set('jwt', token);
    this.cookie.set('exp', String(exp))
    this.token = token;
  }

  getToken(): string|null {
    if (!this.token) {
      this.token = this.cookie.get('jwt')

    }
    return this.token;
  }

  deleteToken(): void {
    this.cookie.delete('jwt');
    this.cookie.delete('exp');
    this.cookie.deleteAll() 
    console.log(this.cookie.getAll());
    this.token = null;
  }

  isLogged(){
    const token = this.cookie.get('jwt')
    const exp = this.cookie.get('exp');

    const expDate = new Date(Number(exp) * 1000)
    const currentDate = new Date();
    
    console.log(expDate);
    console.log(currentDate);
    if (!token || !exp) return false
    
    console.log(currentDate < expDate);
    
    return currentDate < expDate;

  }    

  logIn(user:UserLogin){
    return this.http.post<any>(environment.host + 'login', user)
  }

  signIn(user:UserRegister){
    return this.http.post<any>(environment.host + 'admin', user)
  }

  verifyToken(token:string){
    return this.http.get<any>(`${environment.host}login/verify_token?token=${token}`)
  }

  sendEmailToResetPassword(email:string){
    return this.http.post(`${environment.host}login/send_reset_password`, email)
  }

  resetPassword({password, token}:{password:string, token:string}){
    return this.http.post(`${environment.host}login/reset_password`, {password}, {headers:{'Authorization':`Bearer ${token}`}})
  }
}