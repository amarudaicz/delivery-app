import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, throwError } from 'rxjs';
import { environment } from 'src/app/environment';
import { Category } from 'src/app/interfaces/category-interfaz';
import { Local, Schedules } from 'src/app/interfaces/local-interface';
import { Product } from 'src/app/interfaces/product-interface';
import { deleteRepeatElement } from 'src/app/utils/deleteRepeatElement';
import { ThemesService } from '../themes/themes.service';
import { RecentsService } from '../recents/recents.service';
import { RouteDataService } from '../routeData/route-data-service.service';
import { handleError } from 'src/app/utils/handle-error-http';
import { Router } from '@angular/router';
import { CartService } from '../cartData/cart.service';

@Injectable({
  providedIn: 'root',
})
export class LocalDataService {
  constructor(
    private http: HttpClient,
    private theme: ThemesService,
    private recents: RecentsService,
    private routeService: RouteDataService,
    private route: Router,
  ) {}

  public load: boolean = true;
  public local$ = new BehaviorSubject<Local|undefined>(undefined);
  private local?: Local;
  public products$ = new BehaviorSubject<Product[]>([]);
  public categories$ = new BehaviorSubject<Category[]>([]);

  initDataLocal(local: string | null) {
    this.setLocal(local);
    this.setProducts(local);
  }

  setLocal(name_url: string | null) {
    if (!this.load) return;
    
    this.http
      .get<Local[]>(environment.host + `locals/${name_url}`)
      .pipe(
        catchError((err) => {
          this.route.navigate(['/']);
          return throwError(() => new Error(err));
        })
      ) //puntopizza
      .subscribe((data) => {
        console.log(data);
        const local = data[0];
        this.setSessionLocal(local);
        this.theme.setTheme(local.theme);
        this.recents.addRecent(local);
        this.local$.next(local);
        this.local = local;
        this.routeService.setOrigin(local.name_url);
        this.postView(data[0].id)
      });

  }

  setProducts(table: string | null) {
    if (!this.load) return;

    this.http
      .get<Product[]>(environment.host + `products/${table}`)
      .subscribe((data) => {
        console.log(data);
        this.products$.next(this.cleanProducts(data));
        this.categories$.next(this.cleanCategories(data));
        this.load = false;
      });
  }

  getProducts() {
    return this.products$;
  }

  getCategories() {
    return this.categories$;
  }

  resetData() {
    this.load = true;
    this.categories$.next([]);
    this.products$.next([]);
  }

  private cleanCategories(products: Product[] | any[]) {
    const categories = products
      .filter((p) => p.category_active && p.stock)
      .sort((a, b) => a.category_sort - b.category_sort)
      .map((e) => {
        return {
          name: e.category_name,
          image: e.category_image,
          id: e.category_id,
        };
      });

    console.log(categories);

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

  cleanProducts(products: Product[]) {
    return products.filter((p) => p.stock);
  }

  getShippingMethods(local: any) {
    const shippingMethods: string[] = [];
    Object.keys(local.shipping).forEach((k) => {
      shippingMethods.push(local.shipping[k].description);
    });
    return shippingMethods;
  }

  getPayMethods(local: any) {
    const payMethods: string[] = [];

    Object.keys(local.pay_methods).forEach((k) => {
      payMethods.push(local.pay_methods[k].description);
    });
    return payMethods;
  }

  calculateShippingCost(distance: number) {
    const shippingCosts = this.local?.shipping.delivery.shipping_costs.sort(
      (a, b) => a.distance - b.distance
    );
    console.log(shippingCosts);

    let cost = 0;

    if (!shippingCosts?.length) {
      return -1;
    }

    for (let i = 0; i < shippingCosts!.length; i++) {
      const currentPrice = shippingCosts![i];

      if (distance <= currentPrice.distance) {
        // Si la distancia es menor o igual a la distancia actual en el array, utiliza su costo.
        cost = currentPrice.cost;
        break;
      }
    }

    return cost;
  }

  islocalOpen(schedule: Schedules) {
    if (!schedule) return null;

    const currentDate = new Date();
    const currentDay = currentDate
      .toLocaleDateString('es-AR', { weekday: 'short' })
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

    const currentTime = currentDate.getHours() + ':' + currentDate.getMinutes();

    const currentDaySchedule = schedule.days.find(
      (day) => day.name === currentDay
    );

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

  getCurrentShift(schedule: Schedules) {
    if (!schedule) return null;

    const currentDate = new Date();
    const currentDay = currentDate
      .toLocaleDateString('es-AR', { weekday: 'short' })
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
    const currentTime = currentDate.getHours() + ':' + currentDate.getMinutes();

    const currentDaySchedule = schedule.days.find(
      (day) => day.name === currentDay
    );

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

  isTimeWithinRange(time: any, start: any, end: any) {
    const [currentHour, currentMinute] = time.split(':');
    const [startHour, startMinute] = start.split(':');
    const [endHour, endMinute] = end.split(':');

    const currentTimestamp =
      parseInt(currentHour) * 60 + parseInt(currentMinute);
    const startTimestamp = parseInt(startHour) * 60 + parseInt(startMinute);
    const endTimestamp = parseInt(endHour) * 60 + parseInt(endMinute);

    return (
      currentTimestamp >= startTimestamp && currentTimestamp <= endTimestamp
    );
  }

  postView(id:number){
    return this.http.post(`${environment.host}stats`, {id}).subscribe()
  }

  postSale(id:number, amount:number){
    return this.http.post(`${environment.host}sales`, {id, amount}).subscribe()
  }

  getLinkMaps(){
    return `https://www.google.com/maps/place/${this.local!.cords.split(',').reverse().join(',')}\n\n`
  }

}
