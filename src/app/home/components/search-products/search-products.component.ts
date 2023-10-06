import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Product } from 'src/app/interfaces/product-interface';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss'],
})
export class SearchProductsComponent {
  fixedSearch: boolean = false;
  allProducts?: Product[];
  groupedProducts?: { name: string; products: Product[] }[];
  filtredProducts?: Product[];
  activeFilters = false
  filters = {
    minPrice:0,
    maxPrice:0
  }
  
  formSearch:FormGroup

  allTags:any[] = []



  constructor(
    private fb:FormBuilder,
    public theme: ThemesService,
    private localService: LocalDataService
  ) {
    this.formSearch = this.fb.group({
      query:[null],
      maxPrice:[null],
      minPrice:[null]
    })
    this.getAll();
    console.log(this.formSearch);
    this.subscriptionForm()
  }

  getAll() {
    this.localService.getProducts().subscribe((products) => {
      this.allProducts = products;
      products.forEach(p=>{
        p.ingredients.forEach(i=>{
          if (this.allTags.includes(i))return 
          this.allTags.push(i)
          console.log(this.allTags);
        })
      })
    });
  }

  subscriptionForm(){
    this.formSearch.valueChanges.subscribe(value=>{
      console.log(value);
      if (value.query.length <= 2 && !this.fixedSearch) return;
      this.fixedSearch = true;
      this.filtredProducts = this.filterByQuery(value.query);
      this.groupedProducts = this.groupByCategories(this.filtredProducts!);
    })
  }



  groupByCategories(products: Product[]) {
    const result: { name: string; products: Product[] }[] = [];
    products.forEach((product) => {
      const index = result.findIndex(
        (item) => item.name === product.category_name
      );
      if (index !== -1) {
        result[index].products.push(product);
      } else {
        result.push({ name: product.category_name, products: [product] });
      }
    });

    return result;
  }

  filterByQuery(query: string) {
    const queryNormalized = query.toLowerCase();
    return this.allProducts!.filter(
      (p) =>
        p.name.toLowerCase().includes(queryNormalized) ||
        p.category_name.toLowerCase().includes(query)
    );
  }

  filterByPrice(products:Product[]):Product[]{

    let { minPrice, maxPrice } = this.formSearch.value;
    
    console.log(minPrice, maxPrice);
    if (minPrice && maxPrice) {
      return products.filter(p => p.price >= minPrice && p.price <= maxPrice);
    }
    if(minPrice){
      return products.filter(p => p.price >= minPrice)
    } 
    if(maxPrice){
      return products.filter(p => p.price <= maxPrice)
    }
    return products
  }

  applyFilterPrice(){
    const filterPriceProducts = this.filterByPrice(this.filtredProducts!)

    this.groupedProducts = this.groupByCategories(filterPriceProducts);
  }


  toogleFilters(){
    if (!this.fixedSearch) {
      this.fixedSearch = true
    }      
    this.activeFilters = !this.activeFilters

    if (this.activeFilters){
      this.groupedProducts = this.groupByCategories(this.filterByQuery(this.formSearch.get('query')?.value))
    }
  }

  closeSearch(){
    this.fixedSearch = false
    this.activeFilters = false
    this.groupedProducts = undefined
    this.formSearch.reset()
  }
}
