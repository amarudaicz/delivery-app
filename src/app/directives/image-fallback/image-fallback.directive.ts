import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: 'img[appImageFallback]'
})
export class ImageFallbackDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('error')
  onError() {
    const svgString = `<svg width="100%" height="100%" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" data-testid="image-placeholder"><rect width="512" height="512" fill="#F2F2F2"></rect><rect x="183.857" y="180.2" width="144.286" height="150.474" stroke="#CACBCC" stroke-width="2"></rect><path d="M183.78 303.688H328.214" stroke="#CACBCC" stroke-width="2"></path><path d="M205.082 279.563L223.599 240.507L242.116 260.035L269.892 220.979L306.926 279.563H205.082Z" stroke="#CACBCC" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M252.225 213.939C252.225 219.822 247.66 224.52 242.114 224.52C236.569 224.52 232.004 219.822 232.004 213.939C232.004 208.057 236.569 203.359 242.114 203.359C247.66 203.359 252.225 208.057 252.225 213.939Z" stroke="#CACBCC" stroke-width="2"></path></svg>`;
    
    // Crear un nodo SVG a partir de la cadena SVG
    const parser = new DOMParser();
    const svgNode = parser.parseFromString(svgString, 'image/svg+xml').querySelector('svg');

    // Reemplazar el nodo <img> con el nodo SVG
    this.renderer.insertBefore(this.elementRef.nativeElement.parentNode, svgNode, this.elementRef.nativeElement);
    this.renderer.removeChild(this.elementRef.nativeElement.parentNode, this.elementRef.nativeElement);
  }
}
