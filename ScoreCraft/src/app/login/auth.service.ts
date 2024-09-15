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

  constructor() {}

  // Método para realizar o login
  login(email: string, senha: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.profileService.getAllUsers().subscribe(users => {
        const user = users.find(user => user.email === email && user.senha === senha) || null;
        
        if (user) {
          this.currentUserSubject.next(user);
          console.log('Login bem-sucedido');
          resolve(true); // Resolve a promessa como "true" se o login for bem-sucedido
        } else {
          console.log('Credenciais inválidas');
          resolve(false); // Resolve a promessa como "false" se as credenciais forem inválidas
        }
      }, error => {
        console.error('Erro ao buscar usuários', error);
        reject(error); // Rejeita a promessa se ocorrer um erro
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
