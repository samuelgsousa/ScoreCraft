import { Component, inject } from '@angular/core';
import { ReviewsService } from '../interfaces/reviews.service';
import { Reviews } from '../interfaces/reviews';
import { GamesService } from '../interfaces/games.service';
import { CommonModule } from '@angular/common';
import { Games } from '../interfaces/games';

@Component({
  selector: 'app-allreviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allreviews.component.html',
  styleUrl: './allreviews.component.css'
})
export class AllreviewsComponent {

  reviewList: Reviews[] = [];
  gameDetails: { [key: number]: Games } = {}; 

  constructor(private reviewsService: ReviewsService, private gamesService: GamesService) {}

ngOnInit(): void {
    this.reviewsService.asyncgetAllReviews().subscribe(
        (reviews) => {
            this.reviewList = reviews;
            console.log('Reviews carregados:', reviews);
        },
        (error) => {
            console.error('Erro ao carregar reviews:', error);
        }
    );

    this.loadGameDetails()
}

loadGameDetails(): void {
  this.reviewList.forEach(review => {
    if (!this.gameDetails[review.game_id]) {
      this.getGameDetails(review.game_id); // Função que busca detalhes do jogo
    }
  });
}

async getGameDetails(id: number): Promise<void> {
  // Verifica se os detalhes do jogo já foram carregados

  if (!this.gameDetails[id]) {
    this.gamesService.getGameDetailsById(id).subscribe(game => {
      this.gameDetails[id] = game; // Armazena os detalhes do jogo
      console.log('Game Details:', game); // Exibe os detalhes do jogo no console
    }, error => {
      console.error('Erro ao obter detalhes do jogo:', error);
    });
  }
}
}