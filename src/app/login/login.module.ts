import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from './login-routing.module';
import { MainLoginComponent } from './components/main-login/main-login.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { RecoveryPasswordComponent } from './components/recovery-password/recovery-password.component';



@NgModule({
  declarations: [MainLoginComponent, LoginComponent, FormLoginComponent,RecoveryPasswordComponent ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatRippleModule,

  ]
})
export class LoginModule { }
