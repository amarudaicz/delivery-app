import { DetailsOptions, OptionProduct } from "./optionProduct-interface";

export interface ItemCart {
  idCart: number;
  idProduct: number | string;
  name: string;
  quantity: number;
  total: number;
  userOptions: Array<userOptions>;
  especifications: string;
  productImage: string;
  category: string;
  productPrice?:number
}

interface userOptions {
  multiple: boolean;
  nameOption: string;
  multipleOptions?:Array<DetailsOptions>
  nameVariation: string;
  price: number;
  required: boolean;
  typePrice: number;
}
