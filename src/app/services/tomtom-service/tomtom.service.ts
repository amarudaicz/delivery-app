import { Injectable } from '@angular/core';
import { LatLng, LngLat, services } from '@tomtom-international/web-sdk-services';
import * as tt from '@tomtom-international/web-sdk-maps';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TomtomService {
  
  private apiKey = 'FdbTpt17gvVEENxeGcSajuhizlC5BKt6';
  
  constructor() {
    
  }

  async getSuggestions(query: string) {
    const response = await services.fuzzySearch({
      key: this.apiKey,
      query: query,
      limit:5,
      countrySet:'AR',
      idxSet:'PAD,Addr,POI,Str'      
    });

    console.log(response);
    return response
  }

  async getLocationDetails(id: string) {
    return await services.placeById({
      key: this.apiKey,
      entityId:id
    });
  }


  async getMap(mapContainer:any){
    return tt.map({
      key: this.apiKey,
      container: mapContainer,
      center: [-64.3223312, -31.1568939,], // Especifica las coordenadas del centro del mapa
      zoom: 12, // Nivel de zoom inicial
    });
  }

  addMarker(lng:number, lat:number, map:any){
    const marker = new tt.Marker().setLngLat([lng, lat]).addTo(map);
    return marker
  }

  async reverseSearch(cords:{lng:number, lat:number}){
    return await services.reverseGeocode({
        key: this.apiKey,
        position: [cords.lng,cords.lat],
        view:'AR'
      })
  }

  calculateRoute(originCords:{lng:number, lat:number}|LatLng|undefined, destinCords:{lng:number, lat:number}|LatLng|undefined){
    console.log(originCords, destinCords);

    const promise = services.calculateRoute({
      key: this.apiKey,
      locations:`${originCords?.lng},${originCords?.lat}:${destinCords?.lng},${destinCords?.lat}`,
      // locations:'4.8,52.3:4.87,52.37'
    })
    
    return from(promise)

  }


  MetersToKilometers(metters:number){
    return metters / 1000
  }







}


