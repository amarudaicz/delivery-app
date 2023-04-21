import { OptionProduct } from "./optionProduct-interface"

export interface Product {
    id: number
    name: string,
    image: string,
    category_id:number,
    category_name: string,
    price: number,
    ingredients: Array<string>,
    description:string,
    category_image:string,
    variations:Array<OptionProduct>
  }
  