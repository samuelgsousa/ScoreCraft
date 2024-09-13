import { Component } from '@angular/core';
import { GamesService } from '../interfaces/games.service';
import { CommonModule } from '@angular/common';
import { Games } from '../interfaces/games';
import { HttpClient} from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-jogos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './jogos.component.html',
  styleUrl: './jogos.component.css'
})
export class JogosComponent {

  gameList: Games[] = [];
  
  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.gamesService.getAllGames().subscribe(
      (data: Games[]) => {
        this.gameList = data;
        console.log(this.gameList);
      },
      (error) => {
        console.error('Erro ao buscar jogos', error);
      }
    );
  }

}
