import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Profile } from '../interfaces/profile';
import { ProfileService } from '../interfaces/profile.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<Profile | null>(null)
  public currentUser$: Observable<Profile | null> = this.currentUserSubject.asObservable();
  profileService: ProfileService = inject(ProfileService);

  //Método para realizar o login
  async login(email: string, senha: string): Promise<boolean>{
     // Aqui você deve verificar as credenciais com seu backend ou dados locais
     const user = this.findUserByEmailAndPassword(email, senha)
     if(user){
      this.currentUserSubject.next(await user)
      return true
     }
     return false
  }

  private async findUserByEmailAndPassword(email: string, senha: string): Promise<Profile | null>{
    const users = this.profileService.getAllUsers();
    return (await users).find(user => user.email === email && user.senha === senha) || null
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  constructor() { }
}
