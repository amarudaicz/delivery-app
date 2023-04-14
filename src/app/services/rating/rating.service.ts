import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor() { }



  updateRating(rating:number){
    //HTTP PARA UPDATE ROW RATING EN MYSQL Y UPDATE ENTRY + 1
    this.setLSRating(rating)
    

  }



  setLSRating(item:any){

    const currentList:any[] = JSON.parse(localStorage.getItem('rating-list') as string)

    if (currentList) {
      currentList.push(item)
      localStorage.setItem('rating-list', JSON.stringify(item))
    }

  }
}
