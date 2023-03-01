import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { routeAnimations } from './animations/transition-route';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    routeAnimations
  ]
})
export class AppComponent {
  title = 'app-delivery-ng';

  constructor(private contexts: ChildrenOutletContexts) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
  
  
}

