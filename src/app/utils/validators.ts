import { AbstractControl, ValidatorFn, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
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


export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const phoneNumberPattern = /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/

    if (control.value && !phoneNumberPattern.test(control.value)) {
      return { 'invalidPhone': true };
    }
    return null;
  };
}

export function RemoveNonAlphanumeric(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) return null
    console.log(control.value);
    
    const sanitizedValue = control.value.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

    if (sanitizedValue !== control.value) {
      control.setValue(sanitizedValue, { emitEvent: false });
      control.updateValueAndValidity();
    }

    return null;
  };
}