import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  collapsed = true;
  toggleMenu() {
    document.querySelector('#navbarSupportedContent')?.classList.toggle('show')
    document.querySelector('#botaoMenu')?.classList.toggle('collapsed')
  }

  ngOnInit(): void{
    const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71']

const setGrid = () => {
    const container = document.querySelector('div#magic-grid')
    
    const SQUARES = 800
    
    for(let i = 0; i < SQUARES; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
    
        square.addEventListener('mouseover', () => setColor(square))
    
        square.addEventListener('mouseout', () => removeColor(square))
    
        container?.appendChild(square)
    }
    }

const setColor = (element: HTMLDivElement) => {
   const color = getRandomColor()
   element.style.background = color
   element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

const removeColor = (element: HTMLDivElement) => {
   element.style.background = '#1d1d1d'
   element.style.boxShadow = '0 0 2px #000'
}

const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
}

setGrid()



  }
}
