import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RatingService {


  constructor(private http: HttpClient) { }

  getVotes(productId: number, local:string): Observable<any> {

    return this.http.get(`localhost:3001/vote/${local}/${productId}`);

  }

  addVote(userId: number, productId: number, stars: number, local:string): Observable<any> {
    const data = { user_id: userId, product_id: productId, stars, local };
    return this.http.post('localhost:3001/vote', data);
  }

  


}
