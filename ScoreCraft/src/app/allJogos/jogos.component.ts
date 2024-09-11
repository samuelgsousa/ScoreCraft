import { Component, OnInit } from '@angular/core';
import { GamesService } from '../interfaces/games.service';
import { CommonModule } from '@angular/common';
import { Games } from '../interfaces/games';
import { Observable } from 'rxjs';
import { HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-jogos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jogos.component.html',
  styleUrls: ['./jogos.component.css'] // Corrigido para styleUrls
})
export class JogosComponent {

  // gameList: Games[] = [];
  
  // constructor(private gamesService: GamesService) {}

  // ngOnInit(): void {
  //   this.gamesService.getAllGames().subscribe(
  //     (games: Games[]) => {
  //       this.gameList = games;
  //     },
  //     (error) => {
  //       console.error('Erro ao carregar jogos', error);
  //     }
  //   );
  // }

}
