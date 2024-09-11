import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reviews } from '../../../interfaces/reviews';
import { ReviewsService } from '../../../interfaces/reviews.service';
import { GamesService } from '../../../interfaces/games.service';
import { FormsModule } from '@angular/forms';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

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

  // Injetando o serviço
  constructor(private reviewsService: ReviewsService) {}
  private gamesService = inject(GamesService);

  ngOnInit(): void {
    // Chamando o método para buscar as reviews
    if (this.userId !== undefined) {
     this.userReviews = this.reviewsService.getUserReviews(this.userId)
     this.editStates = this.userReviews.map(() => false);
     this.tempReviewText = this.userReviews.map(review => review.review_text); // Inicializa a variável temporária

    //  console.log(this.userReviews = this.reviewsService.getUserReviews(this.userId))
    }
    
  }

  

  getGameDetails(id: number) {
    return this.gamesService.getGameDetailsById(id);
  }

  enableEdit(index: number) {
    this.editStates[index] = true; // Habilita o modo de edição para o review específico
  }

  cancelEdit(index: number) {
    this.tempReviewText[index] = this.userReviews[index].review_text; // Restaura o texto original
    this.editStates[index] = false; // Desabilita o modo de edição para o review específico

  }

  updateReview(index: number, new_text: string, new_rating: number) {
    // Lógica para salvar a review
    // console.log("o que será alterado é o ID: " + this.userReviews[index].id)
    // console.log(this.userReviews)
    this.userReviews[index].review_text = this.tempReviewText[index]; // Atualiza o review com o texto temporário

    this.reviewsService.updateUserReview(this.userReviews[index].user_id, this.userReviews[index].id, new_rating, this.tempReviewText[index])

    this.editStates[index] = false; // Fecha o modo de edição após salvar
  }

  autoResize(event: any): void {
    const textarea = event.target;
    textarea.style.height = 'auto';  // Redefine a altura para auto para calcular corretamente
    textarea.style.height = textarea.scrollHeight + 'px';  // Define a altura com base no conteúdo
  }



}
