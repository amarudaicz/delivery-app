import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cartData/cart.service';
import { ThemesService } from 'src/app/services/themes/themes.service';
import { UserService } from 'src/app/services/userData/user.service';
import { WpService } from 'src/app/services/wpService/wp.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalInfoWpComponent } from '../modal-info-wp/modal-info-wp.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { Location } from '@angular/common';
import { Local } from 'src/app/interfaces/local-interface';
import { minValueValidator } from 'src/app/utils/validators';
import { MapboxService } from 'src/app/services/mapbox/mapbox.service';
import { TomtomService } from 'src/app/services/tomtom-service/tomtom.service';
import { FuzzySearchResult } from '@tomtom-international/web-sdk-services';
import * as tt from '@tomtom-international/web-sdk-services';
import {
  MapMouseEvent,
  Marker,
  NavigationControl,
} from '@tomtom-international/web-sdk-maps';
import { copy } from 'src/app/utils/copyElement';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  form: FormGroup;
  userData: any = this.userService.getUser();
  local?: Local;
  cartItems: any[] = [];
  subtotal: number = 0;
  confirmLeave: boolean = false;

  map?: any;
  suggestions?: FuzzySearchResult[];
  panelSuggestions: boolean = false;
  @ViewChild('mapContainer') mapContainer?: ElementRef;
  loadMap: boolean = false;
  currentMarker?:Marker
  ubicationUser?:FuzzySearchResult
  previusDirection?:string

  constructor(
    public theme: ThemesService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cartService: CartService,
    private wpService: WpService,
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    public localService: LocalDataService,
    public location: Location,
    private tomtom: TomtomService
  ) {
    this.cartService.getCartItems().subscribe((items: any[]) => {
      console.log(items);

      this.cartItems = items;

      this.subtotal = items
        .map((e) => e.total * e.quantity)
        .reduce((p, c) => p + c);
    });

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      payMethod: ['', Validators.required],
      shippingMethod: ['', Validators.required],
      direction: [''],
      amountReceived: ['', [minValueValidator(this.subtotal)]],
      reference: [''],
    });

    this.localService.local$.subscribe((local) => {
      if (!local) return;
      this.local = local;
      this.setLocalConfig(local);
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => this.formChange());
    this.form.get('shippingMethod')?.valueChanges.subscribe(() => {
      if (this.form.controls['shippingMethod'].value === 'Delivery') {
        this.form.controls['direction'].setValidators(Validators.required);
      } else {
        this.form.controls['direction'].clearValidators();
      }
      this.form.controls['direction'].updateValueAndValidity();
    });

    this.form.patchValue({
      name: this.userData?.name,
      direction: this.userData?.direction,
      reference: this.userData?.reference,
    });

    this.getDirection();
  }

  setErrorsMessage(control: string) {
    return this.form.controls[control].hasError('required')
      ? 'Este campo es requerido'
      : '';
  }

  formChange() {
    const userData = {
      name: this.form.controls['name'].value,
      direction: this.form.controls['direction'].value,
      reference: this.form.controls['reference'].value,
    };

    this.userService.saveUserShipping(userData);
  }

  preLeave() {
    console.log(this.form);

    if (this.form.valid) {
      this.redirectWhatsapp();
      return;
    }

    this.form.markAllAsTouched();
    this.snackBar.open('Completar todos los campos requeridos', 'Ok', {
      duration: 3000,
    });
  }

  redirectWhatsapp() {
    const encodedText = this.wpService.generarMensaje(
      this.cartItems,
      this.form.value,
      this.subtotal
    );
    console.log(encodedText);
    this.wpService.redirectWp(
      encodedText,
      this.localService.getSessionLocal().phone
    );
  }

  setLocalConfig(local: Local) {
    console.log(local.pay_methods);
    const payMethods = local.pay_methods;
    const shippingMethods = local.shipping;

    if (payMethods.transfer || payMethods.cash) {
      this.form.get('payMethod')?.addValidators(Validators.required);
    }

    if (shippingMethods.delivery || shippingMethods.pick_in_local) {
      this.form.get('shippingMethod')?.addValidators(Validators.required);
    }
  }

  async getDirection(query?:string) {
    console.log(this.previusDirection);
    if (this.previusDirection === this.form.controls['direction'].value) {
      return
    }
    this.suggestions = undefined;
      this.previusDirection = this.form.controls['direction'].value
      
    
      if (this.ubicationUser) {
        this.ubicationUser = undefined
      }

      if (this.form.get('direction')?.value.length < 2 ) {
        return;
      }

      this.panelSuggestions = true
      this.suggestions = (await this.tomtom.getSuggestions(this.form.get('direction')?.value)).results;
  }

  onBlurDirection() {
    setTimeout(() => (this.panelSuggestions = false), 100);
  }

  selectDirection(suggestion: FuzzySearchResult) {
    //SETEAR UNA VARIABLE CON LA DATA 
    this.ubicationUser = suggestion
    // this.form.get('direction')?.setValue(suggestion.address?.streetName);
  }

  displayMapView() {
    this.loadMap = true;
    setTimeout(async () => {
      this.map = await this.tomtom.getMap('mapContainer');

      this.map.on('click', (event: MapMouseEvent<'click'>) => {
        console.log(event);
        
        const { lng, lat } = event.lngLat;

        if(this.currentMarker){
          this.currentMarker.remove()
        }

        this.currentMarker = this.tomtom.addMarker(lng, lat, this.map)
      });
      
      const navControl = new NavigationControl({
        showZoom: true, // Mostrar control de zoom
        showPitch: false, // No mostrar control de inclinación
      });
      
      this.map.addControl(navControl, 'top-right');

    }, 100);

  }

  saveMarker(){

  }
}
