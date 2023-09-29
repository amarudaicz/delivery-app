import { OptionProduct } from './optionProduct-interface';

export interface Local {
  id: number;
  name: string;
  name_url: string;
  image: string;
  location: string;
  phone: number;
  delivery_cost: number;
  delivery_time: string;
  pick_in_local: null;
  aliascbu: string;
  description: null;
  theme: number;
  instagram: string;
  website: string;
  maps: string;
  schedules: Schedules;
  options_group: OptionProduct[];
  links: { name: string; url: string; icon: string }[];
  shipping: Shipping;
  pay_methods: PayMethods;
  cords:string;
}

export interface Schedules {
  days: Days[];
}

export interface Shipping {
  delivery: {
    delivery_cost: number;
    delivery_time: string;
    description: string;
    method: string;
    shipping_costs: {
      cost: number;
      distance: number;
    }[];
  };
  pick_in_local: {
    description: string;
    method: string;
  };
}

export interface PayMethods {
  cash: { description: string; method: string };
  transfer: {
    cbu: string;
    method: string;
    description: string;
    alias: string;
    nameAccount: string;
    entity: string;
  };
  cbu: string;
}

export interface Days {
  name: string;
  open: boolean;
  shifts: { start: string; end: string }[];
}


export interface NewLocal{
  name:string,
  name_url:string,
  phone:string,
}