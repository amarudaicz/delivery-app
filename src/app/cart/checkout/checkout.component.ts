import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cartData/cart.service';
import { ThemesService } from 'src/app/services/themes/themes.service';
import { UserService } from 'src/app/services/userData/user.service';
import { WpService } from 'src/app/services/wpService/wp.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { Location } from '@angular/common';
import { Local } from 'src/app/interfaces/local-interface';
import { minValueValidator, phoneValidator } from 'src/app/utils/validators';
import { TomtomService } from 'src/app/services/tomtom-service/tomtom.service';
import {
  FuzzySearchResult,
  LatLng,
} from '@tomtom-international/web-sdk-services';

import {
  LngLat,
  MapMouseEvent,
  Marker,
  NavigationControl,
} from '@tomtom-international/web-sdk-maps';

import { fadeIn } from 'src/app/animations/main-detail-animations';
import { Router } from '@angular/router';
import { DetailsCheckoutComponent } from '../details-checkout/details-checkout.component';
import { BehaviorSubject } from 'rxjs';
import { OrdersService } from 'src/app/services/orders/orders.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations: [fadeIn],
})
export class CheckoutComponent implements OnInit {
  form: FormGroup;
  userData: any = this.userService.getUserData();
  local?: Local;
  cartItems: any[] = [];
  subtotal: number = 0;
  confirmLeave: boolean = false;
  formSubmitted: boolean = false;
  map?: any;
  suggestions?: FuzzySearchResult[];
  panelSuggestions: boolean = false;
  @ViewChild('mapContainer') mapContainer?: ElementRef;
  loadMap: boolean = false;
  currentMarker?: Marker;
  cordsUser?: LngLat;
  ubicationUser?: FuzzySearchResult;
  previusDirection?: string;
  previusStreetNumber?: number;
  costShipping: number = 0;
  shipping?: boolean;
  total: BehaviorSubject<any> = new BehaviorSubject(0);
  finalCost: number = 0;
  readyCostShipping: boolean = false;

  constructor(
    public theme: ThemesService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private cartService: CartService,
    private wpService: WpService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    public localService: LocalDataService,
    public location: Location,
    private tomtom: TomtomService,
    private orders: OrdersService
  ) {
    this.cartService.getCartItems().subscribe((items: any[]) => {
      if (!items.length) return;
      this.cartItems = items;

      this.subtotal = items
        .map((e) => e.total * e.quantity)
        .reduce((p, c) => p + c);
      this.total.next(this.subtotal);
    });

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      phone: [null, [Validators.required, phoneValidator()]],
      email: [null, Validators.email],
      payMethod: [null],
      shippingMethod: [null],
      direction: [null],
      streetNumber: [null],
      incomingMoney: [null, []],
      reference: [null],
      defineCostShipping: [false],
      postalCode: [null],
    });

    this.localService.local$.subscribe((local) => {
      if (!local) return;
      this.local = local;
      this.setLocalConfig(local);
    });
  }

  ngOnInit(): void {
    this.setFormStates();
    this.patchCheckout();

    this.total.subscribe((total) => {
      this.finalCost = total;
    });
  }

  preLeave() {
    console.log(
      this.tomtom.getFormatUbication(this.ubicationUser!, this.form.value)
    );

    if (this.isFormInvalid()) {
      this.isFormInvalid(true);
      this.formSubmitted = true;
      this.form.markAllAsTouched();
      return;
    }

    this.redirectWhatsapp();
  }

  getSubtotal() {
    return this.total;
  }

  redirectWhatsapp() {
    const orderData = {
      cart: structuredClone(this.cartItems),
      ...this.form.value,
      ubication: this.tomtom.getFormatUbication(
        this.ubicationUser!,
        this.form.value
      ),
      costShipping: this.costShipping,
      subtotal: this.finalCost,
    };

    this.orders.postOrder(orderData).subscribe();

    const encodedText = this.wpService.generarMensaje(
      structuredClone(this.cartItems),
      {
        ...this.form.value,
        ubication: this.ubicationUser,
        costShipping: this.costShipping ? this.costShipping : 0,
      },
      this.finalCost
    );
    console.log(encodedText);
    this.localService.postSale(this.local!.id, this.subtotal);
    this.wpService.redirectWp(
      encodedText,
      this.localService.getSessionLocal().phone
    );
  }

  setErrorsMessage(control: string) {
    return this.form.controls[control].hasError('required')
      ? 'Este campo es requerido'
      : '';
  }

  formChange(values: any) {
    const userData = {
      name: values['name'],
      direction: values['direction'],
      reference: values['reference'],
      payMethod: values['payMethod'],
      shippingMethod: values['shippingMethod'],
      streetNumber: values['streetNumber'],
    };

    this.userService.saveUserData(userData);
  }

  setLocalConfig(local: Local) {
    const payMethods = local.pay_methods;
    const shippingMethods = local.shipping;
    const fields_checkout = local.fields_checkout;

    if (payMethods?.transfer || payMethods?.cash) {
      this.form.get('payMethod')?.addValidators(Validators.required);
    }

    if (shippingMethods?.delivery || shippingMethods?.pick_in_local) {
      this.form.get('shippingMethod')?.addValidators(Validators.required);
    }

    if (fields_checkout) {
      if (fields_checkout.email) {
        this.form.get('email')?.addValidators(Validators.required);
      }

      if (fields_checkout.postalCode) {
      }
    }
  }

  async getDirection(query?: string) {
    if (!this.directionIsChange()) {
      return;
    }

    // this.suggestions = undefined;
    this.previusDirection = this.form.controls['direction'].value;
    this.previusStreetNumber = this.form.controls['streetNumber'].value;

    if (this.ubicationUser) {
      this.ubicationUser = undefined;
    }

    if (
      this.form.get('direction')?.value?.length <= 3 ||
      this.form.get('direction')?.invalid
    ) {
      this.panelSuggestions = false;
      return;
    }

    this.panelSuggestions = true;

    this.suggestions = (
      await this.tomtom.getSuggestions(
        this.form.get('direction')?.value +
          ' ' +
          this.form.get('streetNumber')?.value
      )
    ).results;
  }

  onBlurDirection() {
    setTimeout(() => (this.panelSuggestions = false), 100);
  }

  selectDirection(suggestion: FuzzySearchResult) {
    this.form
      .get('direction')
      ?.setValue(this.tomtom.getFormatUbication(suggestion));

    this.panelSuggestions = false;

    this.tomtom
      .calculateRoute(this.local!.cords, suggestion.position)
      .subscribe((route) => {
        const distanceToShipping = this.tomtom.MetersToKilometers(
          route.routes[0].summary.lengthInMeters
        );

        this.ubicationUser = suggestion;
        this.costShipping =
          this.localService.calculateShippingCost(distanceToShipping);
        this.readyCostShipping = true;
        this.total.next(this.costShipping + this.subtotal);
      });

    this.form
      .get('postalCode')
      ?.setValue(suggestion.address?.postalCode ?? null);

    this.cordsUser = undefined;

    if (!suggestion.address?.streetNumber) {
      this.getControl('streetNumber')?.addValidators(Validators.required);
      this.getControl('streetNumber')?.markAsTouched();
      this.getControl('streetNumber')?.updateValueAndValidity();
    } else {
      this.getControl('streetNumber')?.setValue(
        suggestion.address?.streetNumber
      );
    }
  }

  getControl = (control: any) => this.form.get(control);

  patchCheckout() {
    this.form.patchValue({
      // name: this.userData.name,
      // direction: this.userData.direction,
    });

    const delivery =
      this.form.get('shippingMethod')?.value === 'Envío a domicilio';

    if (!this.local?.cords || !this.local.shipping.delivery) return;

    const suggestion = this.userService.getUserShipping();
    if (suggestion && delivery && this.local.shipping.delivery) {
      this.ubicationUser = suggestion;
      this.tomtom
        .calculateRoute(this.local!.cords, suggestion.position)
        .subscribe((route) => {
          const distanceToShipping = this.tomtom.MetersToKilometers(
            route.routes[0].summary.lengthInMeters
          );
          this.costShipping =
            this.localService.calculateShippingCost(distanceToShipping);
          this.readyCostShipping = true;
          this.total.next(this.costShipping + this.subtotal);
        });
    } else {
      // this.getDirection();
      this.panelSuggestions = true;
    }
  }

  displayMapView() {
    this.loadMap = true;

    setTimeout(async () => {
      this.map = await this.tomtom.getMap('mapContainer');

      this.map.on('click', (event: MapMouseEvent<'click'>) => {
        const { lng, lat } = event.lngLat;

        if (this.currentMarker) {
          this.currentMarker.remove();
        }
        this.currentMarker = this.tomtom.addMarker(lng, lat, this.map);
      });

      const navControl = new NavigationControl({
        showZoom: true, // Mostrar control de zoom
        showPitch: false, // No mostrar control de inclinación
      });

      this.map.addControl(navControl, 'top-right');
    }, 100);
  }

  removeUbication() {
    this.ubicationUser = undefined;
    this.form.get('direction')?.setValue(null);
    this.form.get('streetNumber')?.setValue(null);
    this.panelSuggestions = false;
    this.suggestions = undefined;
    this.costShipping = 0;
    this.total.next(this.costShipping + this.subtotal);
  }

  saveMarker(cords?: LatLng) {
    if (!this.currentMarker) {
      return;
    }

    this.cordsUser = this.currentMarker.getLngLat();
    this.ubicationUser = undefined;
    this.loadMap = false;

    this.tomtom.reverseSearch(this.cordsUser).then((res) => {
      //SETEAR LAS CORDENADAS DEL LOCAL
      this.tomtom
        .calculateRoute(this.local!.cords, res['addresses'][0].position)
        .subscribe((route) => {
          const distanceToShipping = this.tomtom.MetersToKilometers(
            route.routes[0].summary.lengthInMeters
          );
          const suggestion = res['addresses'][0];
          this.form
            .get('direction')
            ?.setValue(this.tomtom.getFormatUbication(suggestion));
          this.ubicationUser = suggestion;
          this.form
            .get('postalCode')
            ?.setValue(suggestion.address?.postalCode ?? null);
          this.costShipping =
            this.localService.calculateShippingCost(distanceToShipping);

          this.total.next(this.costShipping + this.subtotal);

          this.userService.saveUserShipping(suggestion);
          if (!suggestion.address?.streetNumber) {
            this.getControl('streetNumber')?.addValidators(Validators.required);
            this.getControl('streetNumber')?.markAsTouched();
            this.getControl('streetNumber')?.updateValueAndValidity();
          } else {
            this.getControl('streetNumber')?.setValue(
              suggestion.address?.streetNumber
            );
          }
        });
    });
  }

  getCostShipping(suggestion: any) {
    this.tomtom
      .calculateRoute(this.local!.cords, suggestion.position)
      .subscribe((r) => {
        if (this.form.get('shippingMethod')?.value !== 'Envío a domicilio')
          return;

        const route = r.routes[0].summary;
        const distanceToShipping = this.tomtom.MetersToKilometers(
          route.lengthInMeters
        );
        this.ubicationUser = suggestion;
        this.costShipping =
          this.localService.calculateShippingCost(distanceToShipping);
        this.userService.saveUserShipping(suggestion);
        this.total.next(this.costShipping + this.subtotal);
      });
  }

  selectShippingMethod(method?: string) {
    if (!method) {
      return this.form.get('shippingMethod')?.value;
    }

    this.form.get('shippingMethod')?.setValue(method);

    if (method === 'Buscar en el local') {
      this.removeUbication();

      this.total.next(this.subtotal);
    } else {
      this.total.next(this.subtotal + this.costShipping);
    }
  }

  selectPayMethod(method?: string) {
    if (method) {
      this.form.get('payMethod')?.setValue(method);
    }
    return this.form.get('payMethod')?.value;
  }

  setFormStates() {
    this.form.valueChanges.subscribe((values) => this.formChange(values));

    this.form.get('shippingMethod')?.valueChanges.subscribe((value) => {
      if (value === 'Envío a domicilio' && this.local?.shipping?.delivery) {
        this.form.controls['direction'].setValidators(Validators.required);

        if (this.local.fields_checkout?.postalCode) {
          this.form.get('postalCode')?.addValidators(Validators.required);
        }
      } else {
        this.form.controls['direction'].clearValidators();
        this.form.get('postalCode')?.clearValidators();
        this.form.get('streetNumber')?.clearValidators();
      }
      this.form.get('postalCode')?.updateValueAndValidity();
      this.form.get('direction')?.updateValueAndValidity();
      this.form.get('streetNumber')?.updateValueAndValidity();
    });

    this.form.get('payMethod')?.valueChanges.subscribe((value) => {
      if (value === 'Efectivo' && this.local?.fields_checkout?.incomingMoney) {
        this.form.get('incomingMoney')?.addValidators(Validators.required);
        this.form
          .get('incomingMoney')
          ?.addValidators(
            minValueValidator(this.subtotal + (this.costShipping! || 0))
          );
      } else {
        this.form.get('incomingMoney')?.clearValidators();
        this.form.get('incomingMoney')?.clearAsyncValidators();
        this.form.get('incomingMoney')?.updateValueAndValidity();
      }
    });
  }

  isInputIvalid(input: string) {
    return this.form.get(input)?.invalid && this.form.get(input)?.touched;
  }

  directionIsChange() {
    if (
      this.previusDirection === this.form.controls['direction'].value &&
      this.previusStreetNumber === this.form.controls['streetNumber'].value
    ) {
      return false;
    }

    return true;
  }

  enableDirectionInputs() {
    this.form.get('direction')?.enable();
    this.form.get('streetNumber')?.enable();
  }

  isFormInvalid(showAlerts?: boolean) {
    const shippingMethod = this.form.get('shippingMethod')?.value;

    if (this.form.invalid) {
      showAlerts
        ? this.snackBar.open('Completar todos los campos requeridos', '', {
            duration: 3000,
          })
        : null;
      return true;
    }

    if (shippingMethod === 'Envío a domicilio' && !this.ubicationUser) {
      showAlerts
        ? this.snackBar.open('Ingresa una dirección valida', '', {
            duration: 3000,
          })
        : null;
      return true;
    }

    if (shippingMethod === 'Envío a domicilio' && !this.readyCostShipping) {
      return true;
    }

    if (
      shippingMethod === 'Envío a domicilio' &&
      !this.costShipping &&
      !this.form.get('defineCostShipping')?.value &&
      this.local?.shipping?.delivery?.shipping_costs?.length
    ) {
      showAlerts
        ? this.snackBar.open(
            'Tu ubicación se encuentra fuera de la zona de entrega',
            '',
            { duration: 3000 }
          )
        : null;
      return true;
    }

    return false;
  }

  viewDetails() {
    const dialogRef = this.matDialog.open(DetailsCheckoutComponent, {
      data: {
        total: this.subtotal,
        shipping: this.costShipping,
      },
    });
  }

  getShippingMethods(local: Local) {
    return this.localService.getShippingMethods(local);
  }
}
