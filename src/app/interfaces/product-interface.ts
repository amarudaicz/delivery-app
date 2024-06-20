import { OptionProduct } from './optionProduct-interface';

export interface Product {
  id: number;
  name: string;
  image: string;
  stock: number;
  price: number;
  ingredients: Array<string>;
  description: string;
  variations: Array<OptionProduct>;
  category_id: number;
  category_name: string;
  category_image: string;
  category_active: 1 | 0;
  local_id: number;
  editing?: boolean;
  selected?: boolean;
  fixed:1|0;
  galery?:string[];
}

export interface ProductCart{
  category_name: string;
  especifications: string;
  idCart: number;
  idProduct: number;
  name: string;
  productImage: string;
  productPrice: number;
  quantity: number;
  total: number;
  userOptions: OptionProduct[];

}
