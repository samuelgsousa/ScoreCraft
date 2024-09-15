import { Injectable } from '@angular/core';
import { Reviews } from './reviews';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Profile } from './profile';
 
@Injectable({
    providedIn: 'root'
  })

export class ReviewsService{

    private baseUrl = 'https://scorecraft.onrender.com/api/reviews'
    //private baseUrl = 'http://localhost:3000/api/reviews'
   
    constructor(private http: HttpClient) { }


    asyncgetAllReviews(): Observable<Reviews[]>{
        return this.http.get<Reviews[]>(this.baseUrl)
    }

    getLastReviewId(): Observable<number> {
      return this.http.get<number>(`${this.baseUrl}/reviews/last`);
    }
    
    
    //rota para buscar as reviews de determinado usuário
    getUserReviews(user_id: number): Observable<Reviews[]> {
        return this.http.get<Reviews[]>(`${this.baseUrl}/user/${user_id}`)
      }

    getReviewById(id: number): Observable<Reviews>{
        return this.http.get<Reviews>(`${this.baseUrl}/${id}`)
    }

    createReview(newReview: Reviews): Observable<Reviews> {
      console.log('reviews.service, dados recebidos, a serem passados para o db' + newReview)
      return this.http.post<Reviews>(`${this.baseUrl}`, newReview);
    }

    updateReview(id: number, updatedReview: Partial<Reviews>): Observable<Reviews> {
        return this.http.patch<Reviews>(`${this.baseUrl}/${id}`, updatedReview);
      }

    deleteReview(id: number): Observable<void>{
        return this.http.delete<void>(`${this.baseUrl}/${id}`)
    }

  

}
