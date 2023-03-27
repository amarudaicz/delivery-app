import { Component,EventEmitter,Input, OnInit, Output } from '@angular/core';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-card-category',
  templateUrl: './card-category.component.html',
  styleUrls: ['./card-category.component.scss']
})



export class CardCategoryComponent implements OnInit {

  constructor(public theme:ThemesService){


  }

  ngOnInit(): void {
  }

  
    
  @Input() category?:any
  @Output() categorySelect = new EventEmitter<any>()

  emitCategory(category:any){
    this.categorySelect.emit(category)
  }



}