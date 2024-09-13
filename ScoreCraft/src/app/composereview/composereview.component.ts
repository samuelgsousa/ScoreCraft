import { Component } from '@angular/core';
import { GamesService } from '../interfaces/games.service';
import { Games } from '../interfaces/games';
import { ActivatedRoute } from '@angular/router';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { ReviewsService } from '../interfaces/reviews.service';
import { Reviews } from '../interfaces/reviews';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../login/auth.service';
@Component({
  selector: 'app-composereview',
  standalone: true,
  imports: [NgbRatingModule, CommonModule, FormsModule],
  templateUrl: './composereview.component.html',
  styleUrls: ['./composereview.component.css']
})
export class ComposereviewComponent {

  gameDetails: Games | undefined;
  reviewText: string = '';  // Variável para armazenar o texto da review
  rating: number = 0;       // Variável para armazenar a avaliação
  userId: number | null | undefined;
  
  constructor(
    private gamesService: GamesService, 
    private route: ActivatedRoute, 
    private reviewsService: ReviewsService,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    const gameId = this.route.snapshot.params['id']; // Captura o ID do jogo da rota
    this.getGameDetails(gameId); // Chama a função para obter os detalhes
    this.authService.getUserId().subscribe(id => this.userId = id); // Obter o ID do usuário
  }

  async getGameDetails(id: number): Promise<void> {
    this.gamesService.getGameDetailsById(id).subscribe(
      game => {
        this.gameDetails = game; // Armazena os detalhes do jogo
        console.log(this.gameDetails); // Verifica se o gameDetails foi preenchido corretamente
      },
      error => {
        console.error('Erro ao obter detalhes do jogo:', error);
      }
    );
  }

  autoResize($event: Event) {
    throw new Error('Method not implemented.');
  }

  cancelCreation() {
    throw new Error('Method not implemented.');
  }

  createReview() {
    if (this.gameDetails  && this.userId !== undefined) {
      console.log(this.userId)
      const newReview: Reviews = {
        id: 0, 
        game_id: this.gameDetails.id, // ID do jogo
        review_text: this.reviewText, // Texto da review
        rating: this.rating,
        user_id: Number(this.userId),
      };

      this.reviewsService.createReview(newReview).subscribe(response => {
        console.log('Review criada com sucesso:', response);
        // Redirecione ou faça outras ações após a criação bem-sucedida
      }, error => {
        console.error('Erro ao criar review:', error);
      });
    }
  }
}
