import { OptionProduct } from "./optionProduct-interface";

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
    options_group: OptionProduct[]
    links:{name:string, url:string, icon:string}[]
    shipping:any
    pay_methods:any
}

export interface Schedules {
    days:Days[]
}

export interface Days {
    name:string,
    open:boolean,
    shifts:{start:string,end:string}[]
}