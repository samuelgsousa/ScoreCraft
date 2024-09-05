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

  ngOnInit(): void {
    
    // this.getAllFavGames()
  }

  //  getAllFavGames = () => {
  //    console.log(this.profile?.fav_games)
  //   return this.profile?.fav_games
  // }

  // teste(favG: Array<number> = []){
  //   console.log(favG)
  // }

}


