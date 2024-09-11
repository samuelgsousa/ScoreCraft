// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { Profile } from '../interfaces/profile';
import { ProfileService } from '../interfaces/profile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Profile | null>(null);
  public currentUser$: Observable<Profile | null> = this.currentUserSubject.asObservable();

  constructor(private profileService: ProfileService) { }

  // Método para realizar o login
  async login(email: string, senha: string): Promise<boolean> {
    const user = await this.findUserByEmailAndPassword(email, senha);
    if (user) {
      this.currentUserSubject.next(user);
      return true;
    }
    return false;
  }

  private async findUserByEmailAndPassword(email: string, senha: string): Promise<Profile | null> {
    const users$ = this.profileService.getAllUsers();
    const users = await firstValueFrom(users$);
    return users.find(user => user.email === email && user.senha === senha) || null;
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  // Método para obter o usuário atual
  getCurrentUser(): Observable<Profile | null> {
    return this.currentUser$;
  }
}
