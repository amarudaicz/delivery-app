import { Component } from '@angular/core';
import { enterLeft } from 'src/app/animations/main-animations';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

@Component({
  selector: 'app-header-landing',
  templateUrl: './header-landing.component.html',
  styleUrls: ['./header-landing.component.scss'],
  animations:[fadeIn, enterLeft]
})

export class HeaderLandingComponent {
  menuLanding:boolean = false

  constructor(private layout:LayoutService){

    this.layout.state.overlayMenuActive = true

  }

}
