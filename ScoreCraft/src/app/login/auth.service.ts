import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profile } from '../interfaces/profile';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Profile | null>(null);
  public currentUser$: Observable<Profile | null> = this.currentUserSubject.asObservable();
  private baseUrl = 'http://localhost:3000/api/auth'

  constructor(private http: HttpClient) {}

  // Método para realizar o login
  login(email: string, senha: string): Promise<boolean> {
    return this.http.post<Profile>(`${this.baseUrl}/login`, { email, senha })
      .toPromise()
      .then(user => {
        if (user) {
          this.currentUserSubject.next(user);
          console.log('Login bem-sucedido');
          return true;
        }
        return false;
      })
      .catch(error => {
        console.error('Erro no login', error);
        return false;
      });
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  // Método para obter o ID do usuário atual
  getUserId(): Observable<number | undefined> {
    return this.currentUser$.pipe(
      map(user => user?.id)
    );
  }
}
