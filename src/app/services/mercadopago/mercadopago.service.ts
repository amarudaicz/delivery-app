import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loadMercadoPago } from '@mercadopago/sdk-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/app/environment';

export interface CardData {
  card_number: string;
  cardholder: {
    name: string;
    identification: {
      type: string;
      number: string;
    };
  };
  security_code: string;
  expiration_month: string;
  expiration_year: string;
  device: {
    meli: {
      session_id: string;
    };
  };
}

@Injectable({
  providedIn: 'root',
})
export class MercadopagoService {
  private mp: any;
  private readyMp = new BehaviorSubject<boolean>(false);
  bricksBuilder:any
  public_key='APP_USR-27eca799-f893-436f-a977-068ad09c71e4'
  
  constructor(private http:HttpClient) {
    this.initMp();
  }

  async initMp() {
    await loadMercadoPago();
    const mp = new (window as any).MercadoPago(
      this.public_key, {
        locale:'es-AR'
      }
    );
    this.mp = mp;
    this.bricksBuilder = mp.bricks()
    this.readyMp.next(true);



  }

  public getMp() {
    return this.mp;
  }

  isMpReady() {
    return this.readyMp;
  }


  postSubscription(formData: CardData) {
    console.log(formData);
    return this.http.post<any>(environment.host + 'subscriptions', formData);
  }

}
