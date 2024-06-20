import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { Subject, interval, share, switchMap, takeUntil } from 'rxjs';
import { fadeIn } from 'src/app/animations/main-detail-animations';

@Component({
  selector: 'app-banner-init',
  templateUrl: './banner-init.component.html',
  styleUrls: ['./banner-init.component.scss'],
  animations: [fadeIn],
})
export class BannerInitComponent implements AfterViewInit {
  pathArrayImages = [
    '/assets/images/mock-home.png',
    '/assets/images/mock-detail.png',
    '/assets/images/mock-cart.png',
    '/assets/images/mock-checkout.png',
  ];
  intervalSubscription: any;
  currentIndexImage = 0;
  currentPathImage?: string;
  isStopInterval:boolean=false;
  interval:any

  constructor(){
    this.intervalSubscription = interval(10000).pipe(
    );

  }
  ngAfterViewInit() {

    this.initIntervalCarrousel();
  }

  initIntervalCarrousel() {
    this.interval = this.intervalSubscription.subscribe((i: any) => {
      if (this.isStopInterval) return

      this.currentPathImage = this.pathArrayImages[this.currentIndexImage];
      if (this.currentIndexImage === 3) {
        this.currentIndexImage = 0;
      } else {
        this.currentIndexImage++;
      }
    });
  }

  nextMock() {
    this.isStopInterval = true
    if (this.currentIndexImage === 3) {
      this.currentIndexImage = 0;
    } else {
      this.currentIndexImage += 1;
    }
  }

  prevMock() {
    this.isStopInterval = true
    if (this.currentIndexImage === 0) {
      this.currentIndexImage = 0;
    } else {
      this.currentIndexImage -= 1;
    }
  }



  stop() {
    this.isStopInterval = !this.isStopInterval
    // this.stopInterval();
  }

  resume() {
    this.isStopInterval = !this.isStopInterval
    // this.resumeInterval();
    // this.initIntervalCarrousel();
  }
}
