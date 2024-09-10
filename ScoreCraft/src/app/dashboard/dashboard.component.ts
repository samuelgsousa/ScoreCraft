import { Component, OnInit  } from '@angular/core';
import { AuthService } from '../login/auth.service';
import { Profile } from '../interfaces/profile';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  currentUser: Profile | null = null
  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

  }
}

