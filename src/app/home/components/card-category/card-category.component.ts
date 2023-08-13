import { Component,EventEmitter,Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/interfaces/category-interfaz';
import { PreviewCategoryService } from 'src/app/services/preview-category/preview-category.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-card-category',
  templateUrl: './card-category.component.html',
  styleUrls: ['./card-category.component.scss']
})



export class CardCategoryComponent implements OnInit, OnDestroy  {

  constructor(public theme:ThemesService, public previewCategory:PreviewCategoryService){


  }

  ngOnInit(): void {


  }

  
  @Input() category?:any

  emitCategory(category:any, event:any){
      this.previewCategory.setCategory(category.id)
      event.target.scrollIntoView()
  }

  selectedCategory(id:number){
    return this.previewCategory.category_id === id
  }


  ngOnDestroy(): void {
    
    
  }


}