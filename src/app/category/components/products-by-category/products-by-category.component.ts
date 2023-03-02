import { Component } from '@angular/core';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-products-by-category',
  templateUrl: './products-by-category.component.html',
  styleUrls: ['./products-by-category.component.scss']
})
export class ProductsByCategoryComponent {
  constructor(public theme:ThemesService){


  }

  
  products:any[]=[ 
    {
      name:'Mozzarella',
      category:'Pizzas',
      price:700,
      image:'https://i.pinimg.com/564x/d3/35/5a/d3355a3b61f9717f29e9fff670c2dfc7.jpg',
      id:1

    },
    {
      name:'Calabresse',
      category:'Pizzas',
      price:700,
      image:'https://i.pinimg.com/564x/d3/35/5a/d3355a3b61f9717f29e9fff670c2dfc7.jpg',
      id:1
      
      
    },
    {
      name:'Mozzarella',
      category:'Pizzas',
      price:700,
      image:'https://i.pinimg.com/564x/d3/35/5a/d3355a3b61f9717f29e9fff670c2dfc7.jpg'
      ,id:1
      
    },
    {
      name:'Mozzarella',
      category:'Pizzas',
      price:700,
      image:'https://i.pinimg.com/564x/d3/35/5a/d3355a3b61f9717f29e9fff670c2dfc7.jpg'
      ,id:1
      
    },  {
      name:'Mozzarella',
      category:'Pizzas',
      price:700,
      image:'https://i.pinimg.com/564x/d3/35/5a/d3355a3b61f9717f29e9fff670c2dfc7.jpg'
      ,id:1
      
    },
    {
      name:'Mozzarella',
      category:'Pizzas',
      price:700,
      image:'https://i.pinimg.com/564x/d3/35/5a/d3355a3b61f9717f29e9fff670c2dfc7.jpg'
      ,id:1
      
    },  {
      name:'Mozzarella',
      category:'Pizzas',
      price:700,
      image:'https://i.pinimg.com/564x/d3/35/5a/d3355a3b61f9717f29e9fff670c2dfc7.jpg'
      ,id:1
      
    },
    {
      name:'Mozzarella',
      category:'Pizzas',
      price:700,
      image:'https://i.pinimg.com/564x/d3/35/5a/d3355a3b61f9717f29e9fff670c2dfc7.jpg'
      ,id:1
      
    }
  ]


}
