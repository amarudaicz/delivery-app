import { AbstractControl, ValidatorFn, AsyncValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';


export function noScriptValidator(): AsyncValidatorFn {
  return (control: AbstractControl): Observable<{[key: string]: any} | null> => {
      const value = control.value;
      const htmlPattern = /<\s*\/?\s*[a-z][^>]*?>/gi;
      const scriptPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
      const symbols = /[\{\}\[\]\(\)\+\-\*\/%&\|\^!<>=~,\.:;_'\?\@\#\$€£¥₹]/;
      
    if (value && (htmlPattern.test(value) || scriptPattern.test(value) || symbols.test(value)) ) {
      return of({ 'scriptInjection': true });
    }
    return of(null);
  };
}

import { FormGroup, ValidationErrors } from '@angular/forms';
// Función de validación personalizada
export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  // Verifica si las contraseñas coinciden
  return password === confirmPassword ? null : { passwordsDoNotMatch: true };
};


export function minValueValidator(minValue: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const value = control.value;
    console.log(value);
    
    if (value && value < minValue) {
      return { minValue: true };
    }

    return null;
  };
}