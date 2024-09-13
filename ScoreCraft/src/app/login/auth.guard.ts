import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      take(1),
      map(user => !!user), // Retorna true se houver um usuário, caso contrário, false
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          // Redireciona para a página de login se o usuário não estiver autenticado
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
