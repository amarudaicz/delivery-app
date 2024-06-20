import { Component,EventEmitter,Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/interfaces/category-interfaz';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { PreviewCategoryService } from 'src/app/services/preview-category/preview-category.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-card-category',
  templateUrl: './card-category.component.html',
  styleUrls: ['./card-category.component.scss']
})



export class CardCategoryComponent implements OnInit, OnDestroy  {

  constructor(public theme:ThemesService, public previewCategory:PreviewCategoryService, private localService:LocalDataService){
    
    
  }
  
  ngOnInit(): void {

    console.log(this.category);

  }

  
  @Input() category?:any

  emitCategory(category: any, event: MouseEvent) {
    const scrollContainer = document.getElementById('scroll-cateogries');
    const containerScrollLeft = scrollContainer!.scrollLeft; 
    const elementPosition = (event.target as HTMLElement).getBoundingClientRect();
    const scrollElement = elementPosition.left - scrollContainer!.getBoundingClientRect().left + containerScrollLeft;
    this.previewCategory.setCategory(category.id);
    this.localService.nextScrollPosition(scrollElement);
  }
  

  selectedCategory(id:number){
    return this.previewCategory.category_id === id
  }


  ngOnDestroy(): void {
    
    
  }


}