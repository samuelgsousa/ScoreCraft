import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { CommonModule } from '@angular/common';
import { Profile } from '../interfaces/profile';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  collapsed = true;
  currentUser: Profile | null = null;

  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe((user: Profile | null) => this.currentUser = user);
  }

  ngOnInit(): void {
    this.setGrid(); 
    this.toggleSquareDisplay(); 
  }

  // Function to toggle display of "square" divs based on window width
  toggleSquareDisplay(): void {
    const squares = document.querySelectorAll('.square');
    const isMobile = window.innerWidth <= 619;

    squares.forEach(square => {
      const squareElement = square as HTMLElement; // Cast to HTMLElement
      squareElement.style.display = isMobile ? 'none' : 'inherit';
    });
  }
  // Event listener for window resize
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.toggleSquareDisplay();
  }

  toggleMenu() {
    document.querySelector('#navbarSupportedContent')?.classList.toggle('show');
    document.querySelector('#botaoMenu')?.classList.toggle('collapsed');
  }

  logout() {
    this.authService.logout();
  }

  setGrid() {
    const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71'];
    const container = document.querySelector('div#magic-grid');
    const SQUARES = 800;

    for (let i = 0; i < SQUARES; i++) {
      const square = document.createElement('div');
      square.classList.add('square');
      square.style.width = '16px';
      square.style.height = '16px';
      square.style.backgroundColor = '#1d1d1d';
      square.style.transition = '2s ease';

      square.addEventListener('mouseover', () => this.setColor(square));
      square.addEventListener('mouseout', () => this.removeColor(square));

      container?.appendChild(square);
    }
  }

  setColor(element: HTMLDivElement) {
    const color = this.getRandomColor();
    element.style.transition = '0s';
    element.style.background = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
  }

  removeColor(element: HTMLDivElement) {
    element.classList.add('DeactivateSquare');
    element.style.transition = '2s ease';
    element.style.backgroundColor = '#1d1d1d';
    element.style.boxShadow = 'none';
    element.style.borderColor = 'transparent';
  }

  getRandomColor() {
    const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
