import { Component, inject, Input } from '@angular/core';
import { Profile } from '../../../interfaces/profile';
import { CommonModule } from '@angular/common';
import { GamesService } from '../../../interfaces/games.service';
import { Games } from '../../../interfaces/games';

@Component({
  selector: 'user-jogos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jogos.component.html',
  styleUrl: './jogos.component.css'
})
export class JogosComponent {

  @Input() profile: Profile | undefined;

  favoriteGames: Games[] = [];
 
  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.loadFavGames();
    
  }

  loadFavGames(): void {
    if (this.profile?.fav_games) {
      this.gamesService.getFavGames(this.profile.fav_games).subscribe({
        next: (games) => {
          this.favoriteGames = games;
        },
        error: (error) => {
          console.error('Erro ao carregar jogos favoritos', error);
        }
      });
    }
  }
  
}


