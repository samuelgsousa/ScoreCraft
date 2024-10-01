import { Component, inject } from '@angular/core';
import { ReviewsService } from '../interfaces/reviews.service';
import { Reviews } from '../interfaces/reviews';
import { GamesService } from '../interfaces/games.service';
import { CommonModule } from '@angular/common';
import { Games } from '../interfaces/games';
import { Profile } from '../interfaces/profile';
import { ProfileService } from '../interfaces/profile.service';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-allreviews',
  standalone: true,
  imports: [CommonModule, NgbRatingModule, RouterLink],
  templateUrl: './allreviews.component.html',
  styleUrl: './allreviews.component.css'
})
export class AllreviewsComponent {

  reviewList: Reviews[] = [];
  gameDetails: { [key: number]: Games } = {}; 
  profileData: { [key: number]: Profile } = {}; 

  constructor(private reviewsService: ReviewsService, private gamesService: GamesService, private profileService: ProfileService) {
    
  }

ngOnInit(): void {
    this.reviewsService.asyncgetAllReviews().subscribe(
        (reviews: Reviews[]) => {
            this.reviewList = reviews;
            this.loadGameDetails()
        },
        (error) => {
            console.error('Erro ao carregar reviews:', error);
        }
    );


}

loadGameDetails(): void {
  this.reviewList.forEach(review => {
    if (!this.gameDetails[review.game_id]) {
      this.getGameDetails(review.game_id); // Função que busca detalhes do jogo
      this.getUserData(review.user_id)
    }
  });
}

async getGameDetails(id: number): Promise<void> {
  // Verifica se os detalhes do jogo já foram carregados

  if (!this.gameDetails[id]) {
    this.gamesService.getGameDetailsById(id).subscribe(game => {
      this.gameDetails[id] = game; // Armazena os detalhes do jogo
    }, error => {
      console.error('Erro ao obter detalhes do jogo:', error);
    });
  }
}

async getUserData(id: number): Promise<void> {
  if(!this.profileData[id]){
    this.profileService.getUserById(id).subscribe(profile =>{
      this.profileData[id] = profile
    }, error => {
      console.error('Erro ao obter detalhes do jogo:', error);
    })
  }
}
}