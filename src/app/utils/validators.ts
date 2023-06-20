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
