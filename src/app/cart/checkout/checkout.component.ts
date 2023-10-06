import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { minValueValidator } from 'src/app/utils/validators';
import { TomtomService } from 'src/app/services/tomtom-service/tomtom.service';
import { FuzzySearchResult, LatLng } from '@tomtom-international/web-sdk-services';

import {
  LngLat,
  MapMouseEvent,
  Marker,
  NavigationControl,
} from '@tomtom-international/web-sdk-maps';
import { fadeIn } from 'src/app/animations/main-detail-animations';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  animations:[fadeIn]
})
export class CheckoutComponent implements OnInit {
  form: FormGroup;
  userData: any = this.userService.getUser();
  local?: Local;
  cartItems: any[] = [];
  subtotal: number = 0;
  confirmLeave: boolean = false;
  formSubmitted:boolean = false

  map?: any;
  suggestions?: FuzzySearchResult[];
  panelSuggestions: boolean = false;
  @ViewChild('mapContainer') mapContainer?: ElementRef;
  loadMap: boolean = false;
  currentMarker?:Marker
  cordsUser?:LngLat
  ubicationUser?:FuzzySearchResult
  previusDirection?:string
  previusStreetNumber?:number
  costShipping?:number 

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
      payMethod: [null],
      shippingMethod: [null],
      direction: [null],
      streetNumber:[null],
      amountReceived: [null, [minValueValidator(this.subtotal)]],
      reference: [null],
      defineCostShipping:[false]
    });

    this.localService.local$.subscribe((local) => {
      if (!local) return;
      this.local = local;
      this.setLocalConfig(local);
    });
  }

  ngOnInit(): void {
    this.setFormStates()

  //  this.userService.getGeolocation().subscribe(location=>{
  //    console.log(location);
  //    this.tomtom.reverseSearch({lng:location.longitude, lat:location.latitude}).then(res=>{
  //    console.log(res);
  //    this.ubicationUser = res['addresses'][0]
  //    this.tomtom.calculateRoute({lng:-65.00505,lat:
  //      -31.743643}).subscribe(route=>{
  //      console.log(route);

  //    })
  //  })

  //  })
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

    if (this.isFormInvalid()) {
      this.isFormInvalid(true)

      this.formSubmitted = true
      this.form.markAllAsTouched();
      return;
    }

    this.redirectWhatsapp();
  }

  redirectWhatsapp() {
    const encodedText = this.wpService.generarMensaje(
      this.cartItems,
      {...this.form.value, ubication:this.ubicationUser, costShipping:this.costShipping},
      this.subtotal
    );
    console.log(encodedText);
      this.localService.postSale(this.local!.id, this.subtotal)

    this.wpService.redirectWp(
      encodedText,
      this.localService.getSessionLocal().phone
    );
  }

  setLocalConfig(local: Local) {
    console.log(local.pay_methods);
    const payMethods = local.pay_methods;
    const shippingMethods = local.shipping;

    if (payMethods?.transfer || payMethods?.cash) {
      this.form.get('payMethod')?.addValidators(Validators.required);
    }

    if (shippingMethods?.delivery || shippingMethods?.pick_in_local) {
      this.form.get('shippingMethod')?.addValidators(Validators.required);
    }
  }

  async getDirection(query?:string) {

    if (!this.directionIsChange() ) {
      console.log('Invalid');
      console.log(this.form);

      return
    }

    this.suggestions = undefined;
    this.previusDirection = this.form.controls['direction'].value
    this.previusStreetNumber = this.form.controls['streetNumber'].value

      if (this.ubicationUser) {
        this.ubicationUser = undefined
      }

      if (this.form.get('direction')?.value.length < 2 || this.form.get('direction')?.invalid) {
        return;
      }

      this.panelSuggestions = true
      
      this.suggestions = (await this.tomtom.getSuggestions(this.form.get('direction')?.value + ' ' + this.form.get('streetNumber')?.value)).results;
  }

  onBlurDirection() {
    setTimeout(() => (this.panelSuggestions = false), 100);
  }

  selectDirection(suggestion: FuzzySearchResult) {
    this.panelSuggestions = false
    this.tomtom.calculateRoute(suggestion.position).subscribe(route=>{
      const distanceToShipping =  this.tomtom.MetersToKilometers(route.routes[0].summary.lengthInMeters)
      console.log(distanceToShipping);
      
      this.ubicationUser = suggestion
      this.costShipping = this.localService.calculateShippingCost(distanceToShipping)
      console.log(this.costShipping);
      


    })

    this.cordsUser = undefined
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

  removeUbication(){
    this.ubicationUser = undefined
    this.panelSuggestions = true
  }

  saveMarker(cords?:LatLng){

    if (!this.currentMarker) {
      return
    }

    this.cordsUser = this.currentMarker.getLngLat()
    this.ubicationUser = undefined
    this.loadMap = false

    this.tomtom.reverseSearch(this.cordsUser).then((res)=>{
      
      //SETEAR LAS CORDENADAS DEL LOCAL
      this.tomtom.calculateRoute(res['addresses'][0].position).subscribe(route=>{
        console.log(route.routes[0].summary.lengthInMeters);
        
        const distanceToShipping =  this.tomtom.MetersToKilometers(route.routes[0].summary.lengthInMeters)
        console.log(distanceToShipping);
        this.ubicationUser = res['addresses'][0]
        this.costShipping = this.localService.calculateShippingCost(distanceToShipping)
      })
    })
  }

  selectShippingMethod(method?:string){
    if (method) {
      this.form.get('shippingMethod')?.setValue(method)
    }

    return this.form.get('shippingMethod')?.value
  }

  selectPayMethod(method?:string){

    if (method) {
      this.form.get('payMethod')?.setValue(method)
    }

    return this.form.get('payMethod')?.value

  }


    setFormStates(){
      this.form.valueChanges.subscribe(() => this.formChange());

      this.form.get('shippingMethod')?.valueChanges.subscribe((value) => {

      if (value === 'Envio a domicilio') {
        this.form.controls['direction'].setValidators(Validators.required);
        this.form.controls['streetNumber'].setValidators(Validators.required);

      } else {
        this.form.controls['direction'].clearValidators();
        this.form.controls['streetNumber'].clearValidators();
      }
        this.form.controls['streetNumber'].updateValueAndValidity();
        this.form.controls['direction'].updateValueAndValidity();
    });




    // this.form.get('streetNumber')?.valueChanges.subscribe(value=>{
    // })

      // this.form.patchValue({
      //   name: this.userData?.name,
      //   direction: this.userData?.direction,
      //   reference: this.userData?.reference,
      // });
    }


    isInputIvalid(input:string){
      return this.form.get(input)?.invalid && this.form.get(input)?.touched
    }


    directionIsChange(){

      if(this.previusDirection === this.form.controls['direction'].value && this.previusStreetNumber === this.form.controls['streetNumber'].value){
        return false
      }

      return true
    }


    enableDirectionInputs(){
      this.form.get('direction')?.enable()
      this.form.get('streetNumber')?.enable()
    }


    isFormInvalid(showAlerts?:boolean){
      const shippingMethod = this.form.get('shippingMethod')?.value

      if (this.form.invalid) {
        showAlerts ? this.snackBar.open('Completar todos los campos requeridos', '' , {duration:3000}) : null
        return true
      }

      if (shippingMethod === 'Envio a domicilio' && !this.ubicationUser){
       showAlerts ? this.snackBar.open('Ingresa una direccion valida', '' , {duration:3000}) : null
        return true
      }

      if (shippingMethod === 'Envio a domicilio' && !this.costShipping && !this.form.get('defineCostShipping')?.value) {
       showAlerts ? this.snackBar.open('Tu ubicacion se encuentra fuera de la zona de entrega', '' , {duration:3000}) : null
        return true
      }



      return false
    }



    
}
