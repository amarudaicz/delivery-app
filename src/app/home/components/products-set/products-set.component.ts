import { Component, OnInit } from '@angular/core';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Component({
  selector: 'app-products-set',
  templateUrl: './products-set.component.html',
  styleUrls: ['./products-set.component.scss']
})
export class ProductsSetComponent implements OnInit {
  constructor(public theme:ThemesService){

  }

  ngOnInit(): void { 
    
  }
  


  products:any[]=[ 
    {
      name:'Mozzarella',
      category:'Pizzas',
      price:700,
      image:'https://i.pinimg.com/564x/d3/35/5a/d3355a3b61f9717f29e9fff670c2dfc7.jpg'

    },
    {
      name:'Calabresse',
      category:'Pizzas',
      price:700,
      image:'https://i.pinimg.com/564x/d3/35/5a/d3355a3b61f9717f29e9fff670c2dfc7.jpg'

      
    },
    {
      name:'Mozzarella',
      category:'Pizzas',
      price:700,
      image:'https://i.pinimg.com/564x/d3/35/5a/d3355a3b61f9717f29e9fff670c2dfc7.jpg'

      
    },
    {
      name:'Mozzarella',
      category:'Pizzas',
      price:700,
      image:'https://i.pinimg.com/564x/d3/35/5a/d3355a3b61f9717f29e9fff670c2dfc7.jpg'

      
    },  {
      name:'Mozzarella',
      category:'Pizzas',
      price:700,
      image:'https://i.pinimg.com/564x/d3/35/5a/d3355a3b61f9717f29e9fff670c2dfc7.jpg'

      
    },
    {
      name:'Mozzarella',
      category:'Pizzas',
      price:700,
      image:'https://i.pinimg.com/564x/d3/35/5a/d3355a3b61f9717f29e9fff670c2dfc7.jpg'

      
    },  {
      name:'Mozzarella',
      category:'Pizzas',
      price:700,
      image:'https://i.pinimg.com/564x/d3/35/5a/d3355a3b61f9717f29e9fff670c2dfc7.jpg'

      
    },
    {
      name:'Mozzarella',
      category:'Pizzas',
      price:700,
      image:'https://i.pinimg.com/564x/d3/35/5a/d3355a3b61f9717f29e9fff670c2dfc7.jpg'

      
    }
  ]





}
