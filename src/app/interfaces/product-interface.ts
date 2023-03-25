import { OptionProduct } from "./optionProduct-interface"

export interface Product {
    id: number
    name: string,
    image: string,
    categoryId:number,
    category: string,
    price: number,
    ingredients: Array<string>,
    description:string,
    categoryImage:string,
    variations:Array<OptionProduct>
  }
  