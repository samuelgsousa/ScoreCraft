import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  ngOnInit(): void {
    const urlImagens = [
      'cv-elden-ring.svg',
      'cv-minecraft.svg',
      'cv-hollow-knight.svg',
      'cv-palworld.svg',
      'cv-rdr2.svg',
      'cv-tlou.svg'
    ];

    async function inserirCapa() {
      let capa = document.querySelector('#cover');
      const i = Math.floor(Math.random() * urlImagens.length);
      const urlImagemAleatoria = urlImagens[i];

      (capa as HTMLElement).style.backgroundImage = `url(./index-games/Cover/${urlImagemAleatoria})`;
    }

    inserirCapa();
  }
}
