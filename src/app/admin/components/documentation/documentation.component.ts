import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FuzzySearchResult } from '@tomtom-international/web-sdk-services';
import { ScrollSpyDirective } from 'src/app/directives/scroll-spy.directive';
import { Local } from 'src/app/interfaces/local-interface';
import { AdminService } from 'src/app/services/admin/admin.service';
import { TomtomService } from 'src/app/services/tomtom-service/tomtom.service';

@Component({
  selector: 'app-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
})
export class DocumentationComponent {

  form:FormGroup;
  suggestions:FuzzySearchResult[] = []
  distanceToShipping?:number
  local?:Local

  constructor(private fb:FormBuilder, private tt:TomtomService, private adminService:AdminService){
    
    this.form = this.fb.group({
      direction: '',
      streetNumber:''
    })

    this.adminService.local$.subscribe(local=>{
      this.local = local
    })
  }

  mock_categories = [
    {
      name: "Pizzas",
      image: "https://res.cloudinary.com/df9dg3owy/image/upload/v1696283685/puntopizza/Calabressa.jpg",
  },
  {
      name: "Hamburguesas",
      image: "https://res.cloudinary.com/df9dg3owy/image/upload/v1696283794/puntopizza/Hamburgesas.avif",
    }
  ]

  currentArticle:any

  @HostListener('window:scroll',[])
  onScroll(event: Event): void {
    console.log(event);
    console.log('scrolling');
    const sections:NodeListOf<HTMLElement> = document.querySelectorAll('.article-docs');
    console.log(sections);
    
    let currentSection: string = '';

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        this.currentArticle = section.id;
      }
    });

  }


  async getDirection(query?:string) {
    this.suggestions = []

    if (this.form.get('direction')?.value.length < 2 || this.form.get('direction')?.invalid) {
      return;
    }
      
    this.suggestions = (await this.tt.getSuggestions(this.form.get('direction')?.value + ' ' + this.form.get('streetNumber')?.value)).results!;
  }

  selectDirection(suggestion: FuzzySearchResult) {

    this.tt.calculateRoute(this.local!.cords, suggestion.position).subscribe(route=>{
      this.distanceToShipping =  this.tt.MetersToKilometers(route.routes[0].summary.lengthInMeters)
      console.log(this.distanceToShipping);
    })
  }

  scrollTop(){
    window.scrollTo(0,0)
  }

}
