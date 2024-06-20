import { Component, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { enterLeft } from 'src/app/animations/main-animations';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router, NavigationEnd } from '@angular/router';
import { LayoutStateService } from 'src/app/services/layoutState/layout-state.service';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-landing',
  templateUrl: './header-landing.component.html',
  styleUrls: ['./header-landing.component.scss'],
  animations: [fadeIn, enterLeft],
})
export class HeaderLandingComponent implements OnDestroy {
  menuLanding: boolean = false;
  routeActive?: string;
  fixedHeader: boolean = false;
  disableLogin:boolean = false
  routerEvents:Subscription
  loader:boolean = false

  constructor(private layout: LayoutStateService, private router: Router, private location:Location) {
    this.routerEvents = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.routeActive = this.router.url;
        this.loader = false
        this.menuLanding = false;
        this.layout.unblockBody();
      }
    });
  }

  toogleMenuLanding() {

    if (!this.menuLanding) {
      this.layout.blockBody();

    }else
    this.layout.unblockBody();
    this.menuLanding = !this.menuLanding;
  }

  @HostListener('document:scroll', ['$event'])
  onScroll(event: any) {
    if (window.scrollY > 0) {
      this.fixedHeader = true;
    } else {
      this.fixedHeader = false;
    }
  }

  signIn(){
    if(this.disableLogin) return
    this.disableLogin = true
    this.loader = true
    this.router.navigate(['login'])

    setTimeout(() => {
        this.disableLogin = false
    }, 5000);
  }

  ngOnDestroy(): void {
    this.menuLanding = false;
    setTimeout(() => {
      this.routerEvents.unsubscribe()
    }, 2000);
  }
}
      