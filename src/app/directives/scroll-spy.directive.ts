import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollSpy]'
})
export class ScrollSpyDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event): void {
    const sections = document.querySelectorAll('section');
    console.log(sections);
    
    let currentSection: string = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        currentSection = section.id;
      }
    });

    const links = document.querySelectorAll('.sidebar li a');
    console.log(links);
    
    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href')?.slice(1) === currentSection) {
        link.classList.add('active');
      }
    });
  }
}
