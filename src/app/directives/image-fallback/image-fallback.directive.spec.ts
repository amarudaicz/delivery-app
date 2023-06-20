import { ElementRef } from '@angular/core';
import { ImageFallbackDirective } from './image-fallback.directive';

describe('ImageFallbackDirective', () => {
  it('should create an instance', () => {
    const elementRefMock = {} as ElementRef; // Crea un objeto ElementRef simulado
    const directive = new ImageFallbackDirective(elementRefMock);
    expect(directive).toBeTruthy();
  });
});