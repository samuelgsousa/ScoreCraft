import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Reviews } from '../../../interfaces/reviews';
import { ReviewsService } from '../../../interfaces/reviews.service';
import { GamesService } from '../../../interfaces/games.service';

@Component({
  selector: 'user-reviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {

  @Input() userId: number | undefined // Recebe o user_id como input de outro componente

  userReviews: Reviews[] = [];
  review: any;
  


  // Injetando o serviço
  constructor(private reviewsService: ReviewsService) {}
  private gamesService = inject(GamesService);

  ngOnInit(): void {
    // Chamando o método para buscar as reviews
    if (this.userId !== undefined) {
     this.userReviews = this.reviewsService.getUserReviews(this.userId)
     
    //  console.log(this.userReviews = this.reviewsService.getUserReviews(this.userId))
    }
    
  }

  getGameDetails(id: number) {
    return this.gamesService.getGameDetailsById(id);
  }


}
