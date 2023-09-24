import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarRef,
  TextOnlySnackBar,
} from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
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

  refAlertError?: MatSnackBarRef<TextOnlySnackBar>;
  @Output() previusStep = new EventEmitter<boolean>();

  constructor(
    private mp: MercadopagoService,
    private toast: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.mp.isMpReady().subscribe((ready) => {
      if (!ready) return;
      this.initBricks(this.mp.getMp().bricks());
      // this.initForm()
    });
  }

  async initBricks(bricksBuilder: any) {
    const settings = {
      initialization: {
        amount: 3000, // monto total a pagar
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
        onSubmit: async (formData: any) => {
          this.mp
            .postSubscription(formData)
            .pipe(
              catchError((err) => {
                
                const alertError = this.toast.open(
                  'A ocurrido un error con el pago, ponte en contacto con nosotros o intenta con otra tarjeta',
                  'Reintentar',
                  { horizontalPosition: 'center', verticalPosition: 'bottom' }
                );


                this.refAlertError = alertError;
                this.cdr.detectChanges();

                alertError.onAction().subscribe((reload) => {
                  console.log((window as any).cardPaymentBrickController);
                  (window as any).cardPaymentBrickController.unmount();
                  this.isFormMounted = false;
                  this.ngOnInit();
                });

                return throwError(() => new Error('error en el pago'));
              })
            )
            .subscribe((res) => {
              console.log(res);
            });
        },
        onError: (error: any) => {
          console.error(error);
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

  onSubmitSubscription(formData: any) {}

  initForm() {
    const cardForm = this.mp.getMp().cardForm({
      amount: '100',
      iframe: true,
      form: {
        id: 'form-checkout',
        cardNumber: {
          id: 'form-checkout__cardNumber',
          placeholder: 'Numero de tarjeta',
        },
        expirationDate: {
          id: 'form-checkout__expirationDate',
          placeholder: 'MM/YY',
        },
        securityCode: {
          id: 'form-checkout__securityCode',
          placeholder: 'Código de seguridad',
        },
        cardholderName: {
          id: 'form-checkout__cardholderName',
          placeholder: 'Titular de la tarjeta',
        },
        issuer: {
          id: 'form-checkout__issuer',
          placeholder: 'Banco emisor',
        },
        installments: {
          id: 'form-checkout__installments',
          placeholder: 'Cuotas',
        },
        identificationType: {
          id: 'form-checkout__identificationType',
          placeholder: 'Tipo de documento',
        },
        identificationNumber: {
          id: 'form-checkout__identificationNumber',
          placeholder: 'Número del documento',
        },
        cardholderEmail: {
          id: 'form-checkout__cardholderEmail',
          placeholder: 'Ingrese su Email',
        },
      },
      callbacks: {
        onFormMounted: (error: any) => {
          if (error)
            return console.warn('Form Mounted handling error: ', error);
          console.log('Form mounted');
          this.isFormMounted = true;
        },
        onSubmit: (event: any) => {
          console.log(event);

          console.log(cardForm);
          event.preventDefault();

          const {
            paymentMethodId: payment_method_id,
            issuerId: issuer_id,
            cardholderEmail: email,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = cardForm.getCardFormData();

          // fetch("/mp/v1/card_tokens", {
          //   method: "POST",
          //   headers: {
          //     'Authorization': 'Bearer TEST-4005782578666910-092217-40df01bd9926db2c84b43b3192a5b3a2-355340299',
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({
          //     token,
          //     issuer_id,
          //     payment_method_id,
          //     transaction_amount: Number(amount),
          //     installments: Number(installments),
          //     description: "Descripción del producto",
          //     payer: {
          //       email,
          //       identification: {
          //         type: identificationType,
          //         number: identificationNumber,
          //       },
          //     },
          //   }),
          // });
        },
        onFetching: (resource: any) => {
          console.log('Fetching resource: ', resource);
          // Animate progress bar
          const progressBar = document.querySelector('.progress-bar');
          progressBar?.removeAttribute('value');

          return () => {
            progressBar?.setAttribute('value', '0');
          };
        },
        onError: (err: any) => {
          console.log('ERROR');
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.refAlertError?.dismiss();
    (window as any).cardPaymentBrickController.unmount();
  }
}
