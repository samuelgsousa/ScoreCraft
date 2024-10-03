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
import { Router } from '@angular/router';

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
  AllReviews: Reviews[] | undefined;
  newId: number | undefined;
  isLoading: boolean = false;
  
  constructor(
    private gamesService: GamesService, 
    private route: ActivatedRoute, 
    private reviewsService: ReviewsService,
    private authService: AuthService,
    private router: Router
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
        console.log(this.gameDetails)
      },
      error => {
        console.error('Erro ao obter detalhes do jogo:', error);
      }
    );
  }

  autoResize(event: any): void {
    const textarea = event.target;
    textarea.style.height = 'auto';  // Redefine a altura para auto para calcular corretamente
    textarea.style.height = textarea.scrollHeight + 'px';  // Define a altura com base no conteúdo
  }

  cancelCreation() {
    throw new Error('Method not implemented.');
  }

  createReview() {
    this.isLoading = true;

    if (this.gameDetails && this.userId !== undefined) {
      this.reviewsService.getLastReviewId().subscribe(
        review => {
          this.newId = Number(review); // Converte o valor para número


          if (this.gameDetails && this.newId) { 
            const newReview: Reviews = {
              id: this.newId,
              game_id: this.gameDetails.id, // ID do jogo
              review_text: this.reviewText, // Texto da review
              rating: this.rating,
              user_id: Number(this.userId),
            }
            console.log('composer review component, dados passados:', newReview) // Verifica o valor de newId
  
            this.reviewsService.createReview(newReview).subscribe(
              response => {
                console.log('Review criada com sucesso:', response);
                this.isLoading = false;
                window.alert('Review criada com sucesso! Você será redirecionado');
                this.router.navigate(['/dashboard']);
              },
              error => {
                console.error('Erro ao criar review:', error);
                this.isLoading = false;
              }
            );
          } else {
            console.error('Detalhes do jogo não estão disponíveis.');
          }
        },
        error => {
          console.error('Erro ao obter o último ID da review:', error);
        }
      );
    } else {
      console.error('Detalhes do jogo ou ID do usuário não estão definidos.');
    }
  }
  
  
}
