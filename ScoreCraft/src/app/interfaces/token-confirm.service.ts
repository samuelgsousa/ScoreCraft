import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenConfirmService {
  private apiUrl = 'https://scorecraft.onrender.com/api/tokensecurity'; // Altere para sua URL de API

  constructor(private http: HttpClient) {}

  confirmToken(token: string): Observable<any> {
   
    return this.http.post(`${this.apiUrl}/confirm-token`, { token });
  }
}
