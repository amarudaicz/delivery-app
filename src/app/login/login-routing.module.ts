import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLoginComponent } from './components/main-login/main-login.component';
import { LoginComponent } from './components/login/login.component';
import { RecoveryPasswordComponent } from './components/recovery-password/recovery-password.component';
import { FormLoginComponent } from './components/form-login/form-login.component';

const routes: Routes = [
  {
    path: '',
    component: MainLoginComponent,
    children: [
        { path: '', component: FormLoginComponent },
        {path:'recovery_password', component:RecoveryPasswordComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
