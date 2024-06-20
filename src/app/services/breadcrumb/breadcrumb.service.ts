import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Breadcrumb {
  label: string;
  route: string;
}

@Injectable({
  providedIn: 'root'
})

export class BreadcrumbService {

  private breadcrumbsSubject: BehaviorSubject<Breadcrumb[]> = new BehaviorSubject<Breadcrumb[]>([]);
  breadcrumbs$: Observable<Breadcrumb[]> = this.breadcrumbsSubject.asObservable();

  constructor() { }

  setBreadcrumbs(breadcrumbs: Breadcrumb[]): void {
    this.breadcrumbsSubject.next(breadcrumbs);
  }

  getBreadcrumbs(): Observable<Breadcrumb[]> {
    return this.breadcrumbs$;
  }
}
