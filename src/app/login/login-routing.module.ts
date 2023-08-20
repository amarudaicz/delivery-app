import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLoginComponent } from './components/main-login/main-login.component';
import { LoginComponent } from './components/login/login.component';
import { FormLoginComponent } from './components/form-login/form-login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: MainLoginComponent,
    children: [
        { path: '', component: FormLoginComponent },
        {path:'reset_password', component:ResetPasswordComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
