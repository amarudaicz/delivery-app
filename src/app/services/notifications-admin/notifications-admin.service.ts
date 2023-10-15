import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsAdminService {

  constructor(private toast: MatSnackBar) {
    this.notifications = (JSON.parse(localStorage.getItem('notifications-admin')!) || [])
    this.allNotifications$.next(JSON.parse(localStorage.getItem('notifications-admin')!) )

    this.allNotifications$.subscribe(noti => {
      console.log(noti);

    })
  }

  notifications: any[] = []
  allNotifications$ = new BehaviorSubject<any[]>([])

  new(message: string, action?: string, 
    config: {
    push?: boolean,
    duration?: number
    section?: string,
    panelClass?: string} = {duration:4000}) {

      console.log(config);
      
    const notification = { id: new Date().getTime().toString(), message, action, section:config?.section, timestamp: new Date().getTime() };
  
    console.log(this.notifications);
    
    if (!this.notifications.some(e=> e.message === message) && config?.push) {
      this.notifications.push(notification); // Agregar la notificación al principio del array
      this.allNotifications$.next(this.notifications);
    }
    
    return this.toast.open(message, action, config);
  }


  getTimeNotification() {
    const timestampCreacion = 1624379645000; // Ejemplo de timestamp de creación

    const timestampActual = new Date().getTime(); // Obtener el timestamp actual

    const diferenciaMilisegundos = timestampActual - timestampCreacion;
    const diferenciaDias = Math.floor(diferenciaMilisegundos / 86400000); // Convertir de milisegundos a días

    console.log(`Han pasado ${diferenciaDias} días desde la creación de la notificación.`);
  }


}
