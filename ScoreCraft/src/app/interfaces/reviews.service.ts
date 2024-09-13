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
   
    constructor(private http: HttpClient) { }


    asyncgetAllReviews(): Observable<Reviews[]>{
        return this.http.get<Reviews[]>(this.baseUrl)
        
    }
    
    //rota para buscar as reviews de determinado usuário
    getUserReviews(user_id: number): Observable<Reviews[]> {
        return this.http.get<Reviews[]>(`${this.baseUrl}/user/${user_id}`)
      }

    getReviewById(id: number): Observable<Reviews>{
        return this.http.get<Reviews>(`${this.baseUrl}/${id}`)
    }

    updateReview(id: number, updatedReview: Partial<Reviews>): Observable<Reviews> {
        return this.http.patch<Reviews>(`${this.baseUrl}/${id}`, updatedReview);
      }

    deleteReview(id: number): Observable<void>{
        return this.http.delete<void>(`${this.baseUrl}/${id}`)
    }


}
