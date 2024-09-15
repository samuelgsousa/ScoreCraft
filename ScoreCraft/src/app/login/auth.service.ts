import { HttpClient } from '@angular/common/http'; // Importe o HttpClient
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Profile } from '../interfaces/profile';
import { ProfileService } from '../interfaces/profile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private currentUserSubject = new BehaviorSubject<Profile | null>(null);
  public currentUser$: Observable<Profile | null> = this.currentUserSubject.asObservable();
  profileService: ProfileService = inject(ProfileService);
  private baseUrl = 'http://localhost:3000'

  // Injete o HttpClient
  constructor(private http: HttpClient) {}

  // Método para realizar o login
  login(email: string, senha: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.post<{ token: string }>(`${this.baseUrl}/auth/login`, { email, senha }).subscribe({
        next: (response) => {
          const token = response.token;
          localStorage.setItem('token', token); // Armazene o token no localStorage
          resolve(true);
        },
        error: (err) => {
          console.error('Erro no login:', err);
          resolve(false);
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
    localStorage.removeItem('token'); // Remova o token ao fazer logout
  }
}
