import { Component, OnChanges, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  form: FormGroup;
  userData: any = this.userService.getUser();
  cartItems: any[] = [];
  subtotal: number = 0;
  confirmLeave:boolean = false
  constructor(
    public theme: ThemesService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private cartService: CartService,
    private wpService: WpService,
    private matDialog: MatDialog,
    private snackBar:MatSnackBar,
    private localService:LocalDataService,
    public location:Location
 
  ) {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      direction: ['', ],
      payMethod: ['', Validators.required],
      amountReceived: ['', ],
      reference: [''],
      shippingMethod: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(() => this.formChange());
    this.form.get('shippingMethod')?.valueChanges.subscribe( () => {
      if (this.form.controls['shippingMethod'].value === 'Delivery') {
        this.form.controls['direction'].setValidators(Validators.required)      
      }else{
        this.form.controls['direction'].clearValidators()
      }
      this.form.controls['direction'].updateValueAndValidity()
    })


    this.cartService.getCartItems().subscribe((items: any[]) => {
      console.log(items);

      this.cartItems = items;

      this.subtotal = items
        .map((e) => e.total * e.quantity)
        .reduce((p, c) => p + c);

    });

    console.log(this.subtotal);

    this.form.patchValue({
      name: this.userData.name,
      direction: this.userData.direction,
      reference: this.userData.reference,
    });
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
      this.redirectWhatsapp()
    }else{
      this.snackBar.open('Completar todos los campos', 'Ok', {duration: 3000})
    }

  }


  redirectWhatsapp() {
    const encodedText = this.wpService.encodeText(this.cartItems, this.form.value, this.subtotal);
    console.log(encodedText);
    
    const dialogRef = this.matDialog.open(ModalInfoWpComponent, {
      width: '280px',
    });
    
    dialogRef.afterClosed().subscribe((response) => {
      console.log(response);
      if (response) {
        console.log('REDIRECCION');
        this.wpService.redirectWp(encodedText, this.localService.getSessionLocal().phone)
      }
  
    });
  }
}