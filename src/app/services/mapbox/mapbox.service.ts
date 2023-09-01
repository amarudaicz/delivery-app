import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapboxService {


  private mapboxToken = 'pk.eyJ1IjoiYW1hcnVkYWljeiIsImEiOiJjbGx1N2N3MTAxOTR1M2dzNTJzMDVsNDRwIn0.fbxYgPAhfqDiS6prVd35ew';
  private baseUrl = 'https://api.mapbox.com/search/searchbox/v1';

  constructor(private http: HttpClient) {}

  getSuggestions(searchText: string): Observable<any> {
    const url = `${this.baseUrl}/suggest?q=${searchText}&access_token=${this.mapboxToken}&session_token=45d6as4f6sa68fg86s4g684fsa64fas68`;
    return this.http.get(url);
  }

  getLocationDetails(mapboxId: string): Observable<any> {
    const url = `${this.baseUrl}/retrieve/${mapboxId}?access_token=${this.mapboxToken}&session_token=45d6as4f6sa68fg86s4g684fsa64fas68`;
    return this.http.get(url);
  }

}
