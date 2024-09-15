import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Profile } from '../interfaces/profile';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Profile | null>(null);
  public currentUser$: Observable<Profile | null> = this.currentUserSubject.asObservable();

  private apiUrl = 'http://localhost:3000/api/auth'; // URL da API de autenticação

  constructor(private http: HttpClient) {}

  // Método para realizar o login
  login(email: string, senha: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.post<{ message: string }>(`${this.apiUrl}/login`, { email, senha }).subscribe({
        next: (response) => {
          if (response.message === 'Login bem-sucedido') {
            this.currentUserSubject.next({ email, senha } as Profile); // Ajuste conforme necessário
            resolve(true);
          } else {
            resolve(false);
          }
        },
        error: (error) => {
          console.error('Erro ao realizar login', error);
          reject(error);
        }
      });
    });
  }

  // Método para obter o ID do usuário atual
  getUserId(): Observable<number | undefined> {
    return this.currentUser$.pipe(
      map(user => user?.id) // Supondo que o 'Profile' tem um campo 'id'
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }
}
