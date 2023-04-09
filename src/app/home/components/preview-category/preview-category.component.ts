import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product-interface';
import { PreviewCategoryService } from 'src/app/services/preview-category/preview-category.service';

@Component({
  selector: 'app-preview-category',
  templateUrl: './preview-category.component.html',
  styleUrls: ['./preview-category.component.scss']
})
export class PreviewCategoryComponent implements OnInit {

  products:any[]=[]
  
  constructor(private previewCategory:PreviewCategoryService){
    
  }
  
  ngOnInit(): void {
    
    
    if (!this.previewCategory.categoryId) for (let i = 0; i < 10; i++) this.products.push(i)
    
    this.previewCategory.getProductsByCategory().subscribe(data =>{
      if (data.length!==0) {
        this.products = data
      }
    })
    
  }



  preLoad(){
    
  }

}
