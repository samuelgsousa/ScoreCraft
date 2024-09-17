import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Profile } from '../interfaces/profile';
import { CommonModule } from '@angular/common';
import { BaseProfileComponent } from "../base-profile/base-profile.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, BaseProfileComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  currentUser: Profile | null = null
  isCurrentUser: boolean = true;
  wallpapper: string | null | undefined

  constructor(private authService: AuthService){
  }


  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      this.isCurrentUser = true; 
      this.wallpapper = user?.wallpaper // Você define isso como true para o usuário logado
    });
  }

}



