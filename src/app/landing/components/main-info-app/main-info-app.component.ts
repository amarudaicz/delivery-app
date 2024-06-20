import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutStateService } from 'src/app/services/layoutState/layout-state.service';
import { RecentsService } from 'src/app/services/recents/recents.service';

@Component({
  selector: 'app-main-info-app',
  templateUrl: './main-info-app.component.html',
  styleUrls: ['./main-info-app.component.scss']
})
export class MainInfoAppComponent {

  constructor(private layoutService:LayoutStateService, private recentsService:RecentsService, private router:Router){

    this.layoutService.state.header = false
    this.layoutService.state.navigation = false
  }



}
