import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Category } from 'src/app/interfaces/category-interfaz';
import { LocalDataService } from 'src/app/services/localData/local-data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit, OnDestroy, AfterViewInit {

  
  categories?: Category[] | any[] = [1, 2, 3, 4, 5]; //INTERFACE
  isMobile = window.innerWidth < 550;
  @ViewChild('containerCategories', { static: true }) containerCategories!: ElementRef;
  scrollPositionSubscription!:Subscription
  routerSub:Subscription


  constructor(private localService: LocalDataService, private router:Router) {
    this.localService.categories$.subscribe((data) => {
      if (!data.length) return;
      this.categories = data;
    });

    this.routerSub = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(this.containerCategories.nativeElement.scrollLeft);

      }
    });

  }
  
  ngOnInit(): void {
    
  }
  
  ngAfterViewInit(): void {
    console.log('asd');
    
    this.scrollPositionSubscription = this.localService.scrollPosition$.subscribe(scroll=>{
      console.log(scroll);
      this.containerCategories.nativeElement.scrollLeft = scroll
    })
  }
  scrollLeft() {
    this.containerCategories.nativeElement.scrollLeft -= 200;
  }


  scrollRight() {
    this.containerCategories.nativeElement.scrollLeft += 200;
  }

  handleScroll(event:any){
  
  }


  ngOnDestroy(): void {
    this.scrollPositionSubscription.unsubscribe()
    this.routerSub.unsubscribe()
  }
}
