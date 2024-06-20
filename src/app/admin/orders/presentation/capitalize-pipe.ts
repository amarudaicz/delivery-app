import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
      if (!value) return '';
      value[0].toUpperCase()
      return value[0].toUpperCase() + value.slice(1); // Capitaliza la primera letra y concatena el resto de la cadena
    }
}