import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Games } from '../../../interfaces/games';
import { GamesService } from '../../../interfaces/games.service';
import { Profile } from '../../../interfaces/profile';

@Component({
  selector: 'user-jogos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './jogos.component.html',
  styleUrls: ['./jogos.component.css']
})
export class JogosComponent implements OnChanges {

  @Input() profile: Profile | undefined;

  favoriteGames: Games[] = [];
 
  constructor(private gamesService: GamesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profile'] && this.profile) {
      this.loadFavGames();
    }
  }

  loadFavGames(): void {
    if (this.profile?.fav_games) {
      this.gamesService.getFavGames(this.profile.fav_games).subscribe({
        next: (games) => {
          this.favoriteGames = games ?? [];
          console.log('Favorite Games:', this.favoriteGames);
        },
        error: (error) => {
          console.error('Erro ao carregar jogos favoritos', error);
        }
      });
    }
  }
}
