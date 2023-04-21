import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product-interface';
import { PreviewCategoryService } from 'src/app/services/preview-category/preview-category.service';

@Component({
  selector: 'app-preview-category',
  templateUrl: './preview-category.component.html',
  styleUrls: ['./preview-category.component.scss']
})
export class PreviewCategoryComponent implements OnInit {

  products:Product[]|any = [1,2,3,4]
  
  constructor(private previewCategory:PreviewCategoryService){
    
  }
  
  ngOnInit(): void {
    
    console.log(this.previewCategory.category_id);
    
    if (!this.previewCategory.category_id) for (let i = 0; i < 10; i++) this.products.push(i)
    
    this.previewCategory.getProductsByCategory().subscribe((data) =>{
      if (data) this.products = data
    })
      
  }


}
