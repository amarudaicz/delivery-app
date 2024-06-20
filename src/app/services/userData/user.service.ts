import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  saveUserData(userData: any): void {
    localStorage.setItem('userData', JSON.stringify(userData ));
  }
  saveUserShipping(shipping:any): void {
    localStorage.setItem('userShipping', JSON.stringify(shipping));
  }
  getUserData(): any {
    const savedUser = localStorage.getItem('userData');
    return savedUser ? JSON.parse(savedUser) : null;
  }
  getUserShipping(): any {
    const savedUser = localStorage.getItem('userShipping');
    return savedUser ? JSON.parse(savedUser) : null;
  }

  clearUserShipping(){
    localStorage.removeItem('userShipping')
  }

  getGeolocation(): Observable<any | null> {
    return from(
      new Promise<any>((resolve, reject) => {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve(position.coords);
            },
            (error) => {
              reject(error);
            }
          );
        } else {
          reject(new Error('Geolocation is not available in this browser.'));
        }
      })
    );
  }



}
