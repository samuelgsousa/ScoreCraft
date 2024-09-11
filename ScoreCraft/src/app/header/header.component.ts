import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { CommonModule } from '@angular/common';
import { Profile } from '../interfaces/profile';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']  // Corrigido de styleUrl para styleUrls
})
export class HeaderComponent implements OnInit {

  collapsed = true;
  currentUser: Profile | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user: Profile | null) => this.currentUser = user);

    const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71'];

    const setGrid = () => {
      const container = document.querySelector('div#magic-grid');
      const SQUARES = 800;

      for (let i = 0; i < SQUARES; i++) {
        const square = document.createElement('div');
        square.classList.add('square');

        square.addEventListener('mouseover', () => setColor(square));
        square.addEventListener('mouseout', () => removeColor(square));

        container?.appendChild(square);
      }
    };

    const setColor = (element: HTMLDivElement) => {
      const color = getRandomColor();
      element.style.background = color;
      element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
    };

    const removeColor = (element: HTMLDivElement) => {
      element.style.background = '#1d1d1d';
      element.style.boxShadow = '0 0 2px #000';
    };

    const getRandomColor = () => {
      return colors[Math.floor(Math.random() * colors.length)];
    };

    setGrid();
  }

  toggleMenu() {
    document.querySelector('#navbarSupportedContent')?.classList.toggle('show');
    document.querySelector('#botaoMenu')?.classList.toggle('collapsed');
  }

  logout() {
    this.authService.logout();
  }
}
