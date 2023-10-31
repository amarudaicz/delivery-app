import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})

export class TermsComponent implements OnInit{
  constructor(private route:ActivatedRoute ){

  }

  link?:string
  
  ngOnInit(): void {
    document.body.style.background = '#fff'
  }

  
  @HostListener('document:scroll', ['$event'])
  onScroll(event:any) {
    const sections = document.querySelectorAll('.li-list');
    let currentSection: string = '';
    
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      
      if ( rect.top <= window.innerHeight *0.8 && rect.bottom >= window.innerHeight * 0.2 ) {
        console.log(rect.top,rect.bottom, window.innerHeight / 2);
        console.log(section);
        currentSection = section.id;
      }

    });    
    
    const links = document.querySelectorAll('.sidebar li a');
    links.forEach(link => {
      link.classList.remove('text-primary');
      if (link.getAttribute('href')?.split('#')[1] === currentSection) {
        // link.classList.add('text-primary');
      }else{
      }
    });

  }
  
}
