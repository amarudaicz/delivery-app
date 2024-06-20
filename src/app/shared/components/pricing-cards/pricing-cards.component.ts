import { Component, EventEmitter, Output } from '@angular/core';
import { SubscriptionsService } from 'src/app/services/subscriptions/subscriptions.service';
import { WpService } from 'src/app/services/wpService/wp.service';

@Component({
  selector: 'app-pricing-cards',
  templateUrl: './pricing-cards.component.html',
  styleUrls: ['./pricing-cards.component.scss']
})
export class PricingCardsComponent {


  @Output() closePricing = new EventEmitter<boolean>()
  featuresCount:number = 6;
  cardExpandida: boolean = false;

  constructor(private wpService:WpService, private subscriptions:SubscriptionsService){
    this.plans = this.subscriptions.getPlans()
  }

  plans:any // plans{ }


  closePanelPricing(){
    this.closePricing.emit(true)
  }

  seeAllFeatures(){
    this.featuresCount += this.plans.basic.features.length; // Incrementa la cantidad a mostrar
  }

  contactWp(){
    this.wpService.contactSoporte()
  }

}
