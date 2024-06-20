import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }


  formatTimeElapsed(date:Date) {
    console.log(date);
    
    const now = new Date();
    const dateOrder = new Date(date)
    const difference = now.getTime() - dateOrder.getTime(); // Use getTime() to get the time in milliseconds

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
        return ` ${seconds} segundo${seconds === 1 ? '' : 's'}`;
    } else if (minutes < 60) {
        return ` ${minutes} minuto${minutes === 1 ? '' : 's'}`;
    } else if (hours < 24) {
        return ` ${hours} hora${hours === 1 ? '' : 's'}`;
    } else {
        return ` ${days} día${days === 1 ? '' : 's'}`;
    }
}
}
