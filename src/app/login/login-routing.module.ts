import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLoginComponent } from './components/main-login/main-login.component';
import { LoginComponent } from './components/login/login.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { RegisterComponent } from './components/register/register.component';
import { loginGuard } from '../utils/auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLoginComponent,
    children: [
      {
      path: '', 
      component: FormLoginComponent ,
      canActivate: [loginGuard]
      },
      {
        path: 'reset_password', 
        component: ResetPasswordComponent
      },
    ],
  },
  { path: 'register', component: RegisterComponent,  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
