import { OptionProduct } from "./optionProduct-interface"

export interface Product {
    id: number
    name: string,
    image: string,
    price: number,
    ingredients: Array<string>,
    description:string,
    variations:Array<OptionProduct>
    category_id:number,
    category_name: string,
    category_image:string,
    local_id:number, 
    editing?:boolean
    selected?:boolean
  }
  