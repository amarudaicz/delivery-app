import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product-interface';
import { PreviewCategoryService } from 'src/app/services/preview-category/preview-category.service';

@Component({
  selector: 'app-preview-category',
  templateUrl: './preview-category.component.html',
  styleUrls: ['./preview-category.component.scss']
})
export class PreviewCategoryComponent implements OnInit, OnDestroy  {

  products?:Product[]|any = [1,2,3,4]
  constructor(private previewCategory:PreviewCategoryService, ){
    
  }
  
  ngOnInit(): void {
    
    this.previewCategory.productsByCategory.subscribe((data) =>{
      if (data.length) this.products = structuredClone(data)
    })
  }

  ngOnDestroy(): void {
  }

}
