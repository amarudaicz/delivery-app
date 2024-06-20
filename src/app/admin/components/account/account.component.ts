import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { AdminService } from 'src/app/services/admin/admin.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { handleError } from 'src/app/utils/handle-error-http';
import {
  passwordMatchValidator,
  phoneValidator,
} from 'src/app/utils/validators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent {
  formAccount: FormGroup;
  formNewPassword: FormGroup;
  disableNewPasssword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private matSnack: MatSnackBar,
    private adminService: AdminService,
    private auth: AuthService
  ) {
    this.formAccount = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required, phoneValidator()],
    });

    this.formNewPassword = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      },
      { validators: passwordMatchValidator }
    );
      
    this.formAccount.disable();
    this.pathAccount();
  }

  saveAccountData() {
    const form = this.formAccount;

    if (!form.dirty || !form.touched) {
      form.disable();
      return
    }

    if (form.invalid) {
      this.matSnack.open('Completar los campos requeridos', '', {
        duration: 4000,
      });
      return;
    }

    this.adminService
      .updateAccount(form.value)
      .pipe(
        catchError((err) => {
          this.matSnack.open(
            'A ocurrido un error al actualizar la cuenta, intente nuevamente o contacte al soporte',
            '',
            {
              duration: 4000,
            }
          );
          return throwError(() => err);
        })
      )
      .subscribe((res: any) => {
        if (res.error) {
          this.matSnack.open(res.error, '', {
            duration: 4000,
          });
          return;
        }

        this.matSnack.open('Datos de cuenta actualizados con éxito', 'Ok', {
          duration: 4000,
        });

        form.disable()
      });
  }

  saveNewPassword() {
    const form = this.formNewPassword;
    console.log(form);

    if (form.invalid) {
      this.matSnack.open('Completar los campos requeridos', '', {
        duration: 4000,
      });
      return;
    }

    this.disableNewPasssword = true;
    this.adminService
      .resetPassword(form.value)
      .pipe(
        catchError((err) => {
          this.matSnack.open(
            'A ocurrido un error al intentar cambiar contraseña, intente nuevamente o contacte al soporte',
            '',
            {
              duration: 4000,
            }
          );
          this.disableNewPasssword = false;

          return throwError(() => err);
        })
      )
      .subscribe((res: any) => {
        if (res.error) {
          this.matSnack.open(res.error, '', {
            duration: 4000,
          });
          return;
        }
        this.matSnack.open('Contraseña actualizada con éxito', 'Ok', {
          duration: 4000,
        });
        form.reset();
        form.markAsUntouched();
      });
  }

  pathAccount() {
    this.auth.getUser().subscribe((user) => {
      console.log(user);
      this.formAccount.patchValue(user);
    });
  }
}
