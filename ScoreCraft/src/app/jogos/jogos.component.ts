import { Component } from '@angular/core';
import { GamesService } from '../interfaces/games.service';
import { CommonModule } from '@angular/common';
import { Games } from '../interfaces/games';

@Component({
  selector: 'app-jogos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jogos.component.html',
  styleUrl: './jogos.component.css'
})
export class JogosComponent {

  gameList: Games[] = [];
  
  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.gameList = this.gamesService.getAllGames()
  }

}
