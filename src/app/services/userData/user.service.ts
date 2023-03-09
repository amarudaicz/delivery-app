import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  saveUserShipping(userData: any): void {
    localStorage.setItem('userShipping', JSON.stringify(userData));
  }
  
  getUser(): any {
    const savedUser = localStorage.getItem('userShipping');
    return savedUser ? JSON.parse(savedUser) : null;
  }

}
