import { Injectable } from '@angular/core';
import { LocalDataService } from '../localData/local-data.service';
import { RouteDataService } from '../routeData/route-data-service.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private routeData:RouteDataService) {
    const data = localStorage.getItem('favorites')
    if (data) {
      this.favorites = JSON.parse(data)
    }

  }

  favorites:any[]=[]

  toogleFavorite(product: any) {
    const data = {...product, local:this.routeData.getOrigin()}
    console.log(data);
    console.log(this.favorites);
    

    if (product && !this.isProductInFavorites(data)) {
      if (this.favorites.length === 0) {
        localStorage.setItem('favorites', JSON.stringify([data]))
      }

      this.favorites.push(data);
      localStorage.setItem('favorites', JSON.stringify(this.favorites))

    } else if (data) {
      console.log(data);
      
      console.log(this.favorites);
      const index = this.favorites.findIndex(e => e.id === data.id && e.local === data.local );
      console.log(index);
      
      this.favorites.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(this.favorites))
    }
  }

  isProductInFavorites(product: any) {
    return this.favorites.some(p => p.id === product.id && p.local === product.local);
  }

  compareFavorite(product:any){
    return this.favorites.some(p => p.id === product.id && p.local === product.local);
  }


  getFavorites() {
    return this.favorites;
  }
}
