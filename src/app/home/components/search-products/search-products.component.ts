import { trigger, transition, style, animate } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fadeIn } from 'src/app/animations/main-detail-animations';
import { Product } from 'src/app/interfaces/product-interface';
import { LocalDataService } from 'src/app/services/localData/local-data.service';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss'],
  animations:[fadeIn,  trigger('moveAnimation', [
    transition(':enter', [
      style({ transform: 'translateY(-100%)' }),
      animate('0.5s')
    ]),
    transition(':leave', [
      animate('0.5s', style({ transform: 'translateY(-100%)' }))
    ])
  ])]
})
export class SearchProductsComponent {
  fixedSearch: boolean = false;
  allProducts?: Product[];
  groupedProducts?: { name: string; products: Product[] }[];
  filtredProducts?: Product[];
  activeFilters = false
  filters:{minPrice:number,maxPrice:number,tags:string[]} = {
    minPrice:0,
    maxPrice:0,
    tags:[]
  }
  
  formSearch:FormGroup

  allTags:any[] = []
  visibleFilters:boolean = false



  constructor(
    private fb:FormBuilder,
    public theme: ThemesService,
    private localService: LocalDataService
  ) {
    this.formSearch = this.fb.group({
      query:[null],
      maxPrice:[null],
      minPrice:[null],
      pulse:[null]
    })
    this.getAll();
    console.log(this.formSearch);
    this.subscriptionForm()
  }

  getAll() {
    this.localService.getProducts().subscribe((products) => {
      this.allProducts = products;
      this.groupedProducts = this.groupByCategories(products)


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
      let { minPrice, maxPrice, query } = value;
      console.log(value);
      
      // if (!query && this.allTags.length !== 0 && query.length <= 2 && !this.fixedSearch){
      //   this.groupedProducts = this.groupByCategories(this.allProducts!);
      //   return;
      // } 

      this.fixedSearch = true;
      this.filtredProducts = this.filterByQuery(query);
      console.log(this.filtredProducts);
      
      
      if (minPrice || maxPrice) {
        this.filtredProducts = this.filterByPrice(this.filtredProducts!)
      }

      if (this.filters.tags.length) {
        this.filtredProducts = this.filterByTags(this.filtredProducts!)
      }
        
      console.log(this.filtredProducts);
      
      this.groupedProducts = this.groupByCategories(this.filtredProducts!);
      console.log(this.groupedProducts);
      
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
    if (!query) {
      return this.allProducts
    }

    const queryNormalized = query?.toLowerCase();
    const products = this.allProducts!.filter(
      (p) =>
        p.name.toLowerCase().includes(queryNormalized) ||
        p.category_name.toLowerCase().includes(queryNormalized)
    );

    return products
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

 

  toogleFilters(){

    if (!this.fixedSearch) {
      this.fixedSearch = true
    }      


    this.activeFilters = true
    this.visibleFilters = !this.visibleFilters
  }

  closeSearch(){
    this.formSearch.reset()
    this.filters.tags = []
    this.activeFilters = false
    this.visibleFilters = false
    this.groupedProducts = undefined
    this.fixedSearch = false
    this.groupedProducts = this.groupByCategories(this.allProducts!)

  }

  toogleTag(tag:string){

    if (this.filters.tags.includes(tag)) {
      this.filters.tags.splice(this.filters.tags.indexOf(tag), 1);
      this.allTags.splice(this.allTags.indexOf(tag), 1)
      this.allTags.push(tag)
    } else {
      this.filters.tags.push(tag);
      this.allTags.splice(this.allTags.indexOf(tag), 1)
      this.allTags.unshift(tag)
    }

    this.formSearch.get('pulse')?.setValue(true)
  }

  filterByTags(products:Product[]){
    return products.filter(p => 
      this.filters.tags.some(t => 
        p.ingredients.includes(t)
      )
    );
  }

  clearFilterPrices(){
    this.formSearch.get('maxPrice')?.reset()
    this.formSearch.get('minPrice')?.reset()
  }

  clearTags(){
    this.filters.tags = []
    this.formSearch.get('pulse')?.reset(true)
  }
}