import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';
import { BehaviorSubject, Subscription, catchError, take, throwError } from 'rxjs';
import { MercadopagoService } from 'src/app/services/mercadopago/mercadopago.service';
import { handleError } from 'src/app/utils/handle-error-http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss'],
})
export class CardFormComponent implements OnDestroy, OnInit {
  isFormMounted: boolean = false;

  subscriptionReload!:Subscription
  refAlertError?: MatSnackBarRef<TextOnlySnackBar>;
  @Output() previusStep = new EventEmitter<boolean>();
  @Output() subComplete = new EventEmitter<any>();
  @Output() payment = new EventEmitter<any>();
  @Input() reloadForm!:BehaviorSubject<boolean>


  constructor(
    private mp: MercadopagoService,
    private toast: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {
  }
  
  ngOnInit(): void {
    this.mp.isMpReady().subscribe((ready) => {
      if (!ready) return;
      this.initBricks(this.mp.getMp().bricks());

     this.subscriptionReload =  this.reloadForm.pipe(take(3)).subscribe(reload=>{
        console.log(reload);

        if (!reload)return
        
          this.isFormMounted = false;
          (window as any).cardPaymentBrickController?.unmount();
          this.ngOnInit()
        })

    });



 
  }

  async initBricks(bricksBuilder: any) {
    const settings = {
      initialization: {
        amount: 4000, // monto total a pagar
      },
      customization: {
        visual: {
          style: {
            theme: 'bootstrap',
          },
        },
        paymentMethods: {
          minInstallments: 1,
          maxInstallments: 1,
        },
      },

      callbacks: {
        onReady: () => {
          this.isFormMounted = true;
          this.cdr.detectChanges();
        },
        onSubmit: async (formData: any) => this.submitSubscription(formData),
        onError: (error: any) => {
          console.error(error);
          this.ngOnInit()
        },
      },
    };

    (window as any).cardPaymentBrickController = await bricksBuilder.create(
      'cardPayment',
      'cardPaymentBrick_container',
      settings
    );
    console.log((window as any).cardPaymentBrickController);
  }

  submitSubscription(formData: any) {
    this.payment.emit(formData)
  }

  ngOnDestroy(): void {
    if (this.subscriptionReload) {
      this.subscriptionReload.unsubscribe()
    }
    (window as any).cardPaymentBrickController?.unmount();
  }
}
