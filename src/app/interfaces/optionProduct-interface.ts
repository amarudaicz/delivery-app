export interface OptionProduct {
  nameVariation: string;
  multiple: boolean;
  typePrice: number;
  options: Array<DetailsOptions>;
  required:boolean
  multipleOptions?:Array<any>
}


// category: string;
// price: number;
// ingredients: Array<string>;

export interface DetailsOptions {
  nameOption: string;
  price: number;
}
