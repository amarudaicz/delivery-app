import { Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { routeAnimations } from './animations/transition-route';
import { ThemesService } from './services/themes/themes.service';

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

  constructor(private contexts: ChildrenOutletContexts, public theme:ThemesService) {}

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }
  
  
}

