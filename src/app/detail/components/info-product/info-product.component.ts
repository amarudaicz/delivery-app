import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationStart, Params, Route, Router } from '@angular/router';
import { ThemesService } from 'src/app/services/themes/themes.service';
import { Location } from '@angular/common';
import { CartService } from 'src/app/services/cartData/cart.service';
import { fadeIn } from 'src/app/animations/main-detail-animations';
// import Swiper from 'swiper';
import { Product } from 'src/app/interfaces/product-interface';
// import { Pagination } from 'swiper/modules';
import { RouteDataService } from 'src/app/services/routeData/route-data-service.service';

@Component({
  selector: 'app-info-product',
  templateUrl: './info-product.component.html',
  styleUrls: ['./info-product.component.scss'],
  animations:[fadeIn]
})
export class InfoProductComponent implements OnInit, AfterViewInit {

  @ViewChild('optionsDisplay', { static: true }) optionsDisplay?: ElementRef<HTMLDivElement>;
  @ViewChild('galery', { static: true }) galerySwiper!: any;

  @Input() product!:Product
  @Input() modePreview:boolean = false
  @ViewChild('data', { static: true }) elDataProduct!: ElementRef;
  // // swiper?:Swiper

  cartCounter:number=0
  favClicked:boolean = false
  fixedControls:boolean = false
  fixedName:boolean = false
  indexGalery:number = 1
  fullGalery = false

  constructor(public theme:ThemesService, private router:Router, private location:Location, private cartService:CartService, private routeData:RouteDataService){

  }

  ngOnInit(): void {
    console.log(
      window.history
    );
    this.cartService.cartSubject.subscribe(cart=>{
      this.cartCounter = cart.length
    })

    this.setGalery()
  }
  
  ngAfterViewInit(): void {
    this.setSwiper(this.galerySwiper.nativeElement)
    // this.swiper?.on('activeIndexChange' , (swiper:Swiper) => {
    //   this.indexGalery = swiper.activeIndex + 1
    // })
  } 
  

  redirectBack(){
    console.log(
      window.history
    );
    if (window.history.state.navigationId === 1) {
      this.router.navigate(['/'+this.routeData.getOrigin() ])
    }else{
      this.location.back()
    }
  }
    

  toogleFav(){
    this.favClicked = !this.favClicked
  }

  @HostListener('window:scroll', [])
  checkElementPosition() {
    const boundingBox = this.elDataProduct.nativeElement.getBoundingClientRect();
    if (boundingBox.top <= 150) {
      this.fixedControls = true
    }else{
      this.fixedControls = false
    }

    if(boundingBox.top < 0) {
      this.fixedName = true
    }else{
      this.fixedName = false
    }
  }
  
  setGalery(){
    if (!this.product || !this.product.galery) {
      this.product = {
        ...this.product,
        galery: [this.product.image] ,
      };
    } else if (!this.product.galery.includes(this.product.image)) {
      this.product = {
        ...this.product,
        galery: [this.product.image, ...this.product.galery],
      };
    }
  }

  setSwiper(swiper:any){
    // this.swiper = new Swiper(swiper, {
    //   modules: [Pagination],
    //   slidesPerView: 1,
    //   pagination: {
    //     el: '.swiper-pagination',
    //     clickable: true,
    //   },
    // });
  }

  getRangePrice(product:Product){
    const options = product.variations.find(v=> v.typePrice === 1)?.options

    if (!options) {
      return this.formatNumber(product.price)
    }

    const activeOptions = options?.filter(option => option.active);

    // Verifica si hay opciones activas antes de proceder
    if (activeOptions.length === 0) {
      return this.formatNumber(product.price)
    }
  
    // Utiliza reduce para encontrar el precio más bajo y el precio más alto
    const { minPrice, maxPrice } = activeOptions.reduce((acc, option) => {
      return {
        minPrice: Math.min(acc.minPrice, option.price),
        maxPrice: Math.max(acc.maxPrice, option.price),
      };
    }, { minPrice: Infinity, maxPrice: -Infinity });
    
    return `${this.formatNumber(minPrice)} - ${this.formatNumber(maxPrice)}` ;
  }


  formatNumber(n:number){
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)
  }


  viewFullGalery(){
    this.fullGalery = true
    window.history.pushState({modal:true}, 'modal');
  }

  closeFullGalery(){
    this.fullGalery = false
    this.fixedControls = false
  }
  
  @HostListener('window:popstate')
  onPopState() {
    this.closeFullGalery();
  }
 

}

