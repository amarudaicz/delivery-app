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
    horarios: Horarios;
    options_group: OptionProduct[]
}

export interface Horarios {
    semana: Dias;
    finDeSemana: Dias;
}

export interface Dias {
    dias: string[];
    maIn: string;
    maFn: string;
    taIn: string;
    taFn: string;
}