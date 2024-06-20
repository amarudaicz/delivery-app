import { ItemCart } from "./itemCart-interfaz";
import { Local } from "./local-interface";

export interface Order {
    name: string;
    local_id:number;
    payMethod: string;
    shippingMethod: string;
    direction: string;
    streetNumber: string;
    amountReceived: number;
    reference: string | null;
    defineCostShipping: boolean;
    ubication: Ubication;
    costShipping:number|null;
    subtotal:number;
    cart:ItemCart[]
    status:statusType
}

export interface OrderHistory extends Order {
    local_name:string;
    date:Date;
    local:Local
}
    
type statusType = 'pendiente'|'procesando'|'enviado'|'entregado'|'cancelado';

interface Ubication {
    type: string;
    id: string;
    score: number;
    address: {
        streetName: string;
        municipality: string;
        countrySecondarySubdivision: string;
        countrySubdivision: string;
        countrySubdivisionName: string;
        countrySubdivisionCode: string;
        countryCode: string;
        country: string;
        countryCodeISO3: string;
        freeformAddress: string;
        localName: string;
    };
    position: {
        lng: number;
        lat: number;
    };
    viewport: {
        topLeftPoint: {
            lng: number;
            lat: number;
        };
        btmRightPoint: {
            lng: number;
            lat: number;
        };
    };
}

