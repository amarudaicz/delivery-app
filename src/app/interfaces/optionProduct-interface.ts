export interface OptionProduct {
  id:number
  nameVariation: string;
  multiple?: boolean;
  typePrice: number;
  nameOption?:string
  options: Array<DetailsOptions>;
  required?:boolean
  multipleOptions?:Array<any>,
  min:number,
  sku?:string,
  max:number
  simple?:boolean,
  editing?:boolean
}


// category: string;
// price: number;
// ingredients: Array<string>;

export interface DetailsOptions {
  nameOption: string;
  price: number;
  active?:boolean;

}
