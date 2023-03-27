import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interfaces/product-interface';
import { PreviewCategoryService } from 'src/app/services/preview-category/preview-category.service';

@Component({
  selector: 'app-preview-category',
  templateUrl: './preview-category.component.html',
  styleUrls: ['./preview-category.component.scss']
})
export class PreviewCategoryComponent implements OnInit {

  products:Product[] = []
  
  constructor(private previewCategory:PreviewCategoryService){
    
  }

  ngOnInit(): void {

    this.previewCategory.getProductsByCategory().subscribe(data =>{
      console.log(data);
      this.products = data
    })
    
  }

}
