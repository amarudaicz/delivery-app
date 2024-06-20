import { AfterViewInit, Component,ElementRef,HostListener,OnDestroy,OnInit, ViewChild, ViewChildren } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Product } from 'src/app/interfaces/product-interface';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-promotions-local',
  templateUrl: './promotions-local.component.html',
  styleUrls: ['./promotions-local.component.scss']
})
export class PromotionsLocalComponent implements OnInit, AfterViewInit, OnDestroy {


  fixedProducts?:Product[]
  @ViewChild('containerProducts') containerProducts!:ElementRef

  intervalSlide = interval(4000)
  stopInterval:boolean = false
  intervalSubscription!:Subscription
  constructor(public theme:ThemesService, private localService:LocalDataService){

  }

  ngOnInit(): void {
    this.initComponent()
  }

  ngAfterViewInit(): void {
  }

  initComponent(){
    this.localService.products$.subscribe(products=>{
      if (products.length === 0) return 
      this.fixedProducts = this.getFixedProducts(products)
      const isMobile = window.innerWidth < 550
      if(isMobile) return
      // this.autoSlide()
    })
  }

  getFixedProducts(products:Product[]){
    const filterProducts = products.filter(p => p.fixed)
    return filterProducts.length ? filterProducts : products.slice(0, 6) 
  }

  autoSlide(){
   
    this.intervalSubscription = this.intervalSlide.subscribe(()=>{
      console.log('scrolin');
      
      if (this.stopInterval) return 

      const isMaxRight = Math.abs(this.containerProducts.nativeElement.scrollLeft - (this.containerProducts.nativeElement.scrollWidth - this.containerProducts.nativeElement.clientWidth)) <= 1;

      if (isMaxRight) {
        this.containerProducts.nativeElement.scrollLeft = 0
        return
      }

      this.containerProducts.nativeElement.scrollLeft += 100
    })
  }


  scrollLeft(){
    this.containerProducts.nativeElement.scrollLeft -= 200
  }

  scrollRight(){
    this.containerProducts.nativeElement.scrollLeft += 200
  }

  ngOnDestroy(): void {
    if (!this.intervalSubscription) return
    this.intervalSubscription.unsubscribe()
  }




}
