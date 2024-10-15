import { Injectable } from '@angular/core';
import {
  FuzzySearchResult,
  LatLng,
  services,
} from '@tomtom-international/web-sdk-services';
import { map, Marker } from '@tomtom-international/web-sdk-maps';
import { Observable, from } from 'rxjs';
import { LocalDataService } from '../localData/local-data.service';
import { Local } from 'src/app/interfaces/local-interface';

@Injectable()
export class TomtomService {
  private apiKey = 'FdbTpt17gvVEENxeGcSajuhizlC5BKt6';
  private local?: Local;
  constructor(private localService: LocalDataService) {
    this.localService.local$.subscribe((local) => {
      console.log(local);

      this.local = local;
    });
  }

  async getSuggestions(query: string) {
    const response = await services.fuzzySearch({
      key: this.apiKey,
      query: query,
      limit: 5,
      countrySet: 'AR',
      idxSet: 'PAD,Addr,POI,Str',
    });

    console.log(response);
    return response;
  }

  async getLocationDetails(id: string) {
    return await services.placeById({
      key: this.apiKey,
      entityId: id,
    });
  }

  async getMap(mapContainer: any) {
    return map({
      key: this.apiKey,
      container: mapContainer,
      center: [-64.3223312, -31.1568939], // Especifica las coordenadas del centro del mapa
      zoom: 12, // Nivel de zoom inicial
    });
  }

  addMarker(lng: number, lat: number, map: any) {
    const marker = new Marker().setLngLat([lng, lat]).addTo(map);
    return marker;
  }

  async reverseSearch(cords: { lng: number; lat: number }) {
    return await services.reverseGeocode({
      key: this.apiKey,
      position: [cords.lng, cords.lat],
      view: 'AR',
    });
  }

  calculateRoute(
    originCords: string,
    destinCords: { lng: number; lat: number } | LatLng | undefined
  ) {
    console.log(this.local);

    const promise = services.calculateRoute({
      key: this.apiKey,
      locations: `${originCords}:${destinCords?.lng},${destinCords?.lat}`,
      // locations:'4.8,52.3:4.87,52.37'
    });

    return from(promise);
  }

  MetersToKilometers(metters: number) {
    return metters / 1000;
  }

  getFormatUbication(suggestion: FuzzySearchResult, userData?: any) {
    console.log({ userData });

    if (!suggestion || !suggestion.address) {
      return null;
    }

    let formattedAddress = '';

    const pre = `${suggestion.address.streetName} ${
      userData.streetNumber ?? suggestion.address.streetNumber
    }, ${
      suggestion.address.localName ?? suggestion.address.countrySecondarySubdivision
    }, ${
      suggestion.address.countrySubdivision ?? suggestion.address.country
    }`;

    console.log(pre);

    formattedAddress += pre
    
    if (userData && userData.postalCode) {
      formattedAddress += ', CP:' + userData.postalCode;
    }
    return formattedAddress ?? null;
  }
}
