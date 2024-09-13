import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reviews } from '../../../interfaces/reviews';
import { ReviewsService } from '../../../interfaces/reviews.service';
import { GamesService } from '../../../interfaces/games.service';
import { FormsModule } from '@angular/forms';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { Games } from '../../../interfaces/games';

@Component({
  selector: 'user-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbRatingModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {

  rating = 1;
  @Input() userId: number | undefined // Recebe o user_id como input de outro componente
  @Input() isCurrentUser: boolean = false;

  isEditing: boolean = false;
  userReviews: Reviews[] = [];
  review: any;
  editStates: boolean[] = []; 
  tempReviewText: string[] = []; // Variável para armazenar o texto temporário
  
  gameDetails: { [key: number]: Games } = {}; 

  // Injetando o serviço
  constructor(private reviewsService: ReviewsService, private gamesService: GamesService) {}
  

  ngOnInit(): void {
    // Chamando o método para buscar as reviews
    if (this.userId !== undefined) {
      this.reviewsService.getUserReviews(this.userId).subscribe({
        next: (reviews) => {
          // Atualize a lista de reviews do usuário
          this.userReviews = reviews;
          // Inicializa a variável editStates
          this.editStates = this.userReviews.map(() => false);
          // Inicializa a variável temporária com o texto das reviews
          this.tempReviewText = this.userReviews.map(review => review.review_text);
  
          // Opcional: Exibe as reviews no console para depuração
          // console.log(this.userReviews);
        },
        error: (error) => {
          console.error('Erro ao carregar reviews do usuário', error);
        }
      });
    }

    this.loadGameDetails()
  }
  

  loadGameDetails(): void {
    this.userReviews.forEach(review => {
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
  enableEdit(index: number) {
    this.editStates[index] = true; // Habilita o modo de edição para o review específico
  }

  cancelEdit(index: number) {
    this.tempReviewText[index] = this.userReviews[index].review_text; // Restaura o texto original
    this.editStates[index] = false; // Desabilita o modo de edição para o review específico

  }

  async updateReview(index: number, reviewId: number): Promise<void> {
    const updatedReview: Partial<Reviews> = {
        review_text: this.tempReviewText[index],
        rating: this.userReviews[index].rating
    };

    try {
        const response = await this.reviewsService.updateReview(reviewId, updatedReview).toPromise();
        if (response) {
            // Atualize a review localmente após a atualização
            this.userReviews[index] = response;
            this.editStates[index] = false;
            console.log(`Review ID ${reviewId} atualizada com sucesso.`);
        } else {
            console.error(`Resposta para a review ID ${reviewId} é indefinida.`);
        }
    } catch (error) {
        console.error('Erro ao atualizar review:', error);
    }
}

// reviews.component.ts
async deleteReview(index: number, reviewId: number): Promise<void> {
  try {
      await this.reviewsService.deleteReview(reviewId).toPromise();
      // Filtra a review excluída da lista local após a exclusão
      this.userReviews = this.userReviews.filter(review => review.id !== reviewId);
      console.log(`Review ID ${reviewId} deletada com sucesso.`);
      this.editStates[index] = false;
  } catch (error) {
      console.error('Erro ao deletar review:', error);
  }
}


  autoResize(event: any): void {
    const textarea = event.target;
    textarea.style.height = 'auto';  // Redefine a altura para auto para calcular corretamente
    textarea.style.height = textarea.scrollHeight + 'px';  // Define a altura com base no conteúdo
  }



}
