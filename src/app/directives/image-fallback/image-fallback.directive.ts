import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: 'img[appImageFallback]'
})
export class ImageFallbackDirective {
  constructor(private elementRef: ElementRef) {}

  @HostListener('error')
  onError() {
    const defaultImage = '/assets/images/banner-landing/mock-up.svg';
    this.elementRef.nativeElement.src = defaultImage;
  }
}