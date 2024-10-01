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
  styleUrls: ['./allreviews.component.css'] // Corrigido para styleUrls
})
export class AllreviewsComponent {
  reviewList: Reviews[] = [];
  gameDetails: { [key: number]: Games } = {};
  profileData: { [key: number]: Profile } = {};

  // Variáveis para paginação
  currentPage: number = 1;
  totalPages: number = 1; // Inicializa o total de páginas
  limit: number = 10; // Itens por página

  constructor(private reviewsService: ReviewsService, private gamesService: GamesService, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.loadReviews(); // Carrega as reviews ao inicializar
  }

  loadReviews(): void {
    this.reviewsService.asyncgetAllReviews(this.currentPage, this.limit).subscribe(
      (response) => {
        this.reviewList = response.reviews;
        this.totalPages = response.totalPages; // Atualiza o total de páginas
        this.loadGameDetails();
      },
      (error) => {
        console.error('Erro ao carregar reviews:', error);
      }
    );
  }

  loadGameDetails(): void {
    this.reviewList.forEach(review => {
      if (!this.gameDetails[review.game_id]) {
        this.getGameDetails(review.game_id);
        this.getUserData(review.user_id);
      }
    });
  }

  async getGameDetails(id: number): Promise<void> {
    if (!this.gameDetails[id]) {
      this.gamesService.getGameDetailsById(id).subscribe(game => {
        this.gameDetails[id] = game;
      }, error => {
        console.error('Erro ao obter detalhes do jogo:', error);
      });
    }
  }

  async getUserData(id: number): Promise<void> {
    if(!this.profileData[id]){
      this.profileService.getUserById(id).subscribe(profile => {
        this.profileData[id] = profile;
      }, error => {
        console.error('Erro ao obter detalhes do usuário:', error);
      });
    }
  }

  // Método para mudar de página
  changePage(page: number): void {
    this.currentPage = page; // Atualiza a página atual
    this.loadReviews(); // Recarrega as reviews
  }
}
