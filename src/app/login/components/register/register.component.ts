import { StepperOrientation } from '@angular/cdk/stepper';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LayoutStateService } from 'src/app/services/layoutState/layout-state.service';
import { LocalOperationsService } from 'src/app/services/local-operations/local-operations.service';
import { MercadopagoService } from 'src/app/services/mercadopago/mercadopago.service';
import { RemoveNonAlphanumeric, phoneValidator } from 'src/app/utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  formDataUser!: FormGroup;
  formDataStore!: FormGroup;
  formDataAccount!: FormGroup;
  subscription:any;
  payment:any;
  pricing: boolean = false;
  stepperOrientation: StepperOrientation = window.innerWidth > 768 ? 'horizontal' : 'vertical';
  @ViewChild('stepper') stepper!: MatStepper;
  refAlertError:any
  isFormMounted:boolean = false
  reloadFormMp= new BehaviorSubject<boolean>(false)
  disableSubmitForm:boolean=true
  checkingNamePath:boolean=false

  constructor(
    private fb: FormBuilder,
    private auth:AuthService,
    private localOperations:LocalOperationsService,
    private router:Router,
    private toast:MatSnackBar,
    private mp:MercadopagoService,
    private cdr: ChangeDetectorRef,
    private layout: LayoutStateService
  ) {
    console.log(this.stepper);
    this.createForms();
  }

  ngOnInit(): void { 
    this.formatNameUrl()
    this.layout.state.header = false
    this.layout.state.navigation = false
    this.layout.updateState()
  }

  createForms() {
    this.formDataUser = this.fb.group({
      name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      phone: [null, [phoneValidator(), Validators.required]],
      // password:[null, [Validators.required]]
    });

    this.formDataStore = this.fb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      name_url: [null, [Validators.required, Validators.minLength(3), RemoveNonAlphanumeric()]],
      phone:[null, [phoneValidator(), Validators.required]]
    });
    
    this.formDataAccount = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
    this.formDataAccount.get('username')?.disable();
  }

  nextStep() {
    if (this.notificationError()) return 
    setTimeout(() => this.stepper.next(), 100);
  }

  previusStep() {
    this.stepper.previous();
  }
 
  startSubscription(payment:any){
    this.formDataAccount.get('username')?.enable();
    this.payment = payment
    const user = {...this.formDataUser.value, ...this.formDataAccount.value}
    console.log(user);
     
    this.mp.postSubscription({...payment, store:this.formDataStore.value, user})
    .pipe(
      catchError((err) => this.catchErrorSubscription())
    )
    .subscribe((exit) => {
      this.toast.open('Cuenta creada con exito, ya puedes ingresar con tu usuario y contraseña', 'Aceptar', {panelClass:'fixed'})
      this.router.navigate(['/login'])

    });
  }

  catchErrorSubscription(){
    this.refAlertError = this.toast.open(
      'A ocurrido un error con el pago, ponte en contacto con nosotros o intenta con otra tarjeta',
      'Reintentar',
      {panelClass:'fixed'}
    );
    
    this.refAlertError.onAction().subscribe(() => {
      this.reloadFormMp.next(true)
    });
    
    return throwError(() => new Error('error en el pago'));
  }



  notificationError() {

    if (this.formDataStore.get('name_url')?.hasError('isNotAvailable') && this.stepper.selectedIndex === 1) {
      this.toast.open('El nombre identificador que elijio esta en uso','Aceptar', {duration:3500});
      return true;
    }

    if (this.disableSubmitForm && this.stepper.selectedIndex === 1) {
      return  true
    }

    if (this.formDataUser.invalid && this.stepper.selectedIndex === 0) {
      this.toast.open('Completar los campos requeridos','', {duration:3500});
      return true;
    }

    if (this.formDataStore.invalid && this.stepper.selectedIndex === 1) {
      this.toast.open('Completar los campos requeridos','', {duration:3500});
      return true;
    }

    if (this.formDataAccount.invalid && this.stepper.selectedIndex === 2) {
      this.toast.open('Completar los campos requeridos','', {duration:3500});
      return true;
    }

    return false;
  }

  
  formatNameUrl() {
    this.formDataStore.get('name')?.valueChanges.subscribe(value=>{
      const nameFormated = value.replace(/ /g, '').toLowerCase();
      this.formDataStore.get('name_url')?.setValue(nameFormated);
    })

    this.formDataStore.get('name_url')?.valueChanges.subscribe(value=>{
      console.log(value);
      const nameFormated = value.replace(/ /g, '').toLowerCase();
      this.formDataAccount.get('username')?.setValue(nameFormated);
    })
    
  }


  checkNameUrl(){
    const controlNameUrl = this.formDataStore.get('name_url')
    
    if (controlNameUrl?.value.length < 3) return
    console.log(controlNameUrl);
    
    this.disableSubmitForm=true
    this.checkingNamePath=true

    this.localOperations.isAvailableName(controlNameUrl?.value).subscribe(isAvailable=>{
      this.checkingNamePath=false

      if(!isAvailable){
        controlNameUrl?.setErrors({
          isNotAvailable:true
        })

        this.disableSubmitForm = true
        return
      }
      
      this.disableSubmitForm=false
      controlNameUrl?.setErrors({
        isNotAvailable:false
      })

      controlNameUrl?.updateValueAndValidity({emitEvent:false})
    })


  }

  getError(controlName: string): string {
    const control = this.formDataUser.get(controlName)
      ? this.formDataUser.get(controlName)
      : this.formDataStore.get(controlName);

    if (control?.hasError('required')) {
      return 'Este campo es requerido.';
    } else if (control?.hasError('email')) {
      return 'Ingresa un email válido.';
    } else if (control?.hasError('minlength')) {
      return 'Mínimo 3 caracteres';
    } else if (control?.hasError('invalidPhone')) {
      return 'Ingresa un teléfono valido';
    }else if (control?.hasError('noSymbols')) {
      return 'No se permiten símbolos';
    }else if (control?.hasError('isNotAvailable')) {
      return 'El nombre identificador esta en uso';
    }

    return '';
  }
}
