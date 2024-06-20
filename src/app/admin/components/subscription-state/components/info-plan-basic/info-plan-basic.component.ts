import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SubscriptionsService } from 'src/app/services/subscriptions/subscriptions.service';

@Component({
  selector: 'app-info-plan-basic',
  templateUrl: './info-plan-basic.component.html',
  styleUrls: ['./info-plan-basic.component.scss']
})
export class InfoPlanBasicComponent {

  constructor( public dialogRef:MatDialogRef<InfoPlanBasicComponent>, private subscriptions:SubscriptionsService){
    this.planBasic = this.subscriptions.getPlans().basic
  }

  planBasic:any
}
