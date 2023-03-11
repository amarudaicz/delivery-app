export interface Product {
    id: number
    name: string,
    image: string,
    categoryId:number,
    category: string,
    options:object,
    price: number,
    ingredients: Array<string>,
    description:string,
    categoryImage:string
  }
  