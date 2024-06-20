import { Component } from '@angular/core';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { FeatureModel } from 'src/app/shared/components/feature-in-home/feature-in-home.component';

@Component({
  selector: 'app-features-local',
  templateUrl: './features-local.component.html',
  styleUrls: ['./features-local.component.scss'],
})
export class FeaturesLocalComponent {
  feature: FeatureModel[] = [
    {
      emoji: '📦',
      title: 'Envíos a domicilio',
      subtitle: 'Compra y recibí en la comodidad de tu casa',
      background: 'background',
    },
    {
      emoji: '💳',
      title: 'Paga con tarjeta Débito/Crédito',
      subtitle: 'Te enviamos el link de pago',
      background: 'backgroundSec',
    },
    {
      emoji: '😁',
      title: 'Aceptamos transferencias',
      subtitle: 'Transferí directamente a nuestra cuenta',
      background: 'background',
    },
  ];
  
  constructor(public localService: LocalDataService) {}

  shouldShowAlertClosed(local: any): boolean {
    return !this.localService.islocalOpen(local.schedules);
  }

  shouldShowShipping(local: any): boolean {
    return local.shipping?.delivery;
  }

  shouldShowCreditDebit(local: any): boolean {
    return local.pay_methods?.card;
  }

  shouldShowTransfer(local: any): boolean {
    return local.pay_methods?.transfer;
  }

  getAlertClosedClass(local: any): string {
    return this.shouldShowAlertClosed(local) &&
      !this.shouldShowShipping(local) &&
      !this.shouldShowCreditDebit(local) &&
      !this.shouldShowTransfer(local)
      ? 'min-w-full'
      : 'feature-90';
  }

  getShippingClass(local: any): string {
    return this.shouldShowShipping(local) &&
      !this.shouldShowCreditDebit(local) &&
      !this.shouldShowAlertClosed(local) &&
      !this.shouldShowTransfer(local)
      ? 'min-w-full'
      : 'feature-90';
  }

  getCreditDebitClass(local: any): string {
    return this.shouldShowCreditDebit(local) &&
      !this.shouldShowShipping(local) &&
      !this.shouldShowAlertClosed(local) &&
      !this.shouldShowTransfer(local)
      ? 'min-w-full'
      : 'feature-90';
  }

  getTransferClass(local: any): string {
    return this.shouldShowTransfer(local) &&
      !this.shouldShowShipping(local) &&
      !this.shouldShowAlertClosed(local) &&
      !this.shouldShowCreditDebit(local)
      ? 'min-w-full'
      : 'feature-90';
  }
}
