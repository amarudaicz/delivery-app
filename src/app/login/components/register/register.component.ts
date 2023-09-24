import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NotificationsAdminService } from 'src/app/services/notifications-admin/notifications-admin.service';
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
  pricing: boolean = false;
  stepperOrientation: StepperOrientation = window.innerWidth > 768 ? 'horizontal' : 'vertical';
  @ViewChild('stepper') stepper!: MatStepper;

  constructor(
    private fb: FormBuilder,
    private notifications: NotificationsAdminService,
    private auth:AuthService
  ) {
    console.log(this.stepper);

    this.createForms();
  }

  ngOnInit(): void {
    this.formatNameUrl()
  }

  createForms() {
    this.formDataUser = this.fb.group({
      name: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      phoneUser: [null, [phoneValidator(), Validators.required]],
      // password:[null, [Validators.required]]
    });

    this.formDataStore = this.fb.group({
      nameStore: [null, [Validators.required, Validators.minLength(3)]],
      nameUrl: [null, [Validators.required, Validators.minLength(3), RemoveNonAlphanumeric()]],
      phoneStore:[null, [phoneValidator(), Validators.required]]
    });

    this.formDataAccount = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
    });
    this.formDataAccount.get('username')?.disable();
  }

  nextStep() {
    if (this.notificationError()) return;

    this.stepper.next();
  }

  previusStep() {
    this.stepper.previous();
  }


  registerUser(){
    const user = {...this.formDataUser.value, ...this.formDataAccount.value, ...this.formDataStore.value}
    if (this.notificationError()) return;

    this.auth.signIn(user).subscribe(res=>{

    })
  }

  notificationError() {
    if (this.formDataUser.invalid && this.stepper.selectedIndex === 0) {
      this.notifications.new('Completar los campos requeridos');
      return true;
    }

    if (this.formDataStore.invalid && this.stepper.selectedIndex === 1) {
      this.notifications.new('Completar los campos requeridos');
      return true;
    }

    if (this.formDataAccount.invalid && this.stepper.selectedIndex === 2) {
      this.notifications.new('Completar los campos requeridos');
      return true;
    }

    return false;
  }

  formatNameUrl() {
    this.formDataStore.get('nameStore')?.valueChanges.subscribe(value=>{
      const nameFormated = value.replace(/ /g, '').toLowerCase();
      this.formDataStore.get('nameUrl')?.setValue(nameFormated);
    })

    this.formDataStore.get('nameUrl')?.valueChanges.subscribe(value=>{
      console.log(value);
      const nameFormated = value.replace(/ /g, '').toLowerCase();
      this.formDataAccount.get('username')?.setValue(nameFormated);
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
      return 'Minimo 3 caracteres';
    } else if (control?.hasError('invalidPhone')) {
      return 'Ingresa un telefono valido';
    }else if (control?.hasError('noSymbols')) {
      return 'No se permiten simbolos';
    }

    return '';
  }
}
