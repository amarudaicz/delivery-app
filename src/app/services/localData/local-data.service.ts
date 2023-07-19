import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'src/app/environment';
import { Category } from 'src/app/interfaces/category-interfaz';
import { Local, Schedules } from 'src/app/interfaces/local-interface';
import { Product } from 'src/app/interfaces/product-interface';
import { deleteRepeatElement } from 'src/app/utils/deleteRepeatElement';
import { ThemesService } from '../themes/themes.service';
import { RecentsService } from '../recents/recents.service';

@Injectable({
  providedIn: 'root',
})
export class LocalDataService {
  constructor(
    private http: HttpClient,
    private theme: ThemesService,
    private recents: RecentsService
  ) {}

  public load: boolean = true;
  public local = new BehaviorSubject<any>(undefined);
  private products = new BehaviorSubject<Product[]>([]);
  private categories = new BehaviorSubject<Category[]>([]);

  initDataLocal(local: string | null) {
    this.setLocal(local);
    this.setProducts(local);
  }

  setLocal(name_url: string | null) {
    console.log(this.load);

    if (this.load)
      this.http
        .get<Local[]>(environment.host + `locals/${name_url}`) //puntopizza
        .subscribe((data) => {
          console.log(data);
          const local = data[0];
          this.setSessionLocal(local);
          this.theme.setTheme(local.theme);
          this.recents.addRecent(local);
          this.local.next(local);
        });
  }

  setProducts(table: string | null) {
    if (this.load)
      this.http
        .get<Product[]>(environment.host + `products/${table}`)
        .subscribe((data) => {
          console.log(data);
          this.products.next(data);
          this.categories.next(this.cleanCategories(data));
          this.load = false;
        });
  }

  getProducts$() {
    return this.products;
  }

  getCategories() {
    return this.categories;
  }

  resetData() {
    this.categories.next([]);
    this.products.next([]);
  }

  private cleanCategories(products: any[]) {
    console.log(products);

    const categories = products.map((e) => {
      return {
        name: e.category_name,
        image: e.category_image,
        id: e.category_id,
      };
    });

    return deleteRepeatElement(categories);
  }

  setSessionLocal(data: any) {
    sessionStorage.setItem('commerce', JSON.stringify(data));
  }

  getSessionLocal() {
    const local = sessionStorage.getItem('commerce');

    if (local) {
      return JSON.parse(local);
    } else return false;
  }

  islocalOpen(schedule: Schedules) {

    if(!schedule) return null

    const currentDate = new Date();
    const currentDay = currentDate.toLocaleDateString('es-AR', { weekday: 'short' }).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const currentTime = currentDate.getHours() + ':' + currentDate.getMinutes();
  
    const currentDaySchedule = schedule.days.find(day => day.name === currentDay);
  
    console.log(currentDay);
    console.log(currentDaySchedule);
    
    if (currentDaySchedule && currentDaySchedule.open) {
      if (currentDaySchedule.shifts.length === 0) {
        console.log('NO SHIFTS');
        
        return true; // El negocio está abierto todo el día en el día actual
      }
  
      for (const shift of currentDaySchedule.shifts) {
        if (this.isTimeWithinRange(currentTime, shift.start, shift.end)) {
          return true; // El negocio está abierto en el horario actual
        }
      }
    }

    console.log('FALSE');
    
  
    return false; // El negocio está cerrado en el horario actual
  }

  getCurrentShift(schedule:Schedules) {
    if(!schedule) return null

    const currentDate = new Date();
    const currentDay = currentDate.toLocaleDateString('es-AR', { weekday: 'short' }).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const currentTime = currentDate.getHours() + ':' + currentDate.getMinutes();
  
    const currentDaySchedule = schedule.days.find(day => day.name === currentDay);
  
    if (currentDaySchedule && currentDaySchedule.open) {
      if (currentDaySchedule.shifts.length === 0) {
        return { start: '00:00', end: '23:59' }; // El negocio está abierto todo el día en el día actual
      }
  
      for (const shift of currentDaySchedule.shifts) {
        if (this.isTimeWithinRange(currentTime, shift.start, shift.end)) {
          return shift; // Retorna el turno correspondiente a la hora actual
        }
      }
    }
  
    return null; // No se encontró un turno para la hora y día actual
  }

  isTimeWithinRange(time:any, start:any, end:any) {
    const [currentHour, currentMinute] = time.split(':');
    const [startHour, startMinute] = start.split(':');
    const [endHour, endMinute] = end.split(':');

    const currentTimestamp = parseInt(currentHour) * 60 + parseInt(currentMinute);
    const startTimestamp = parseInt(startHour) * 60 + parseInt(startMinute);
    const endTimestamp = parseInt(endHour) * 60 + parseInt(endMinute);

    return currentTimestamp >= startTimestamp && currentTimestamp <= endTimestamp;
  }

}
