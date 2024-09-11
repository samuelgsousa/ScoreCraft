import { Component, inject } from '@angular/core';
import { ReviewsService } from '../interfaces/reviews.service';
import { Reviews } from '../interfaces/reviews';
import { GamesService } from '../interfaces/games.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-allreviews',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allreviews.component.html',
  styleUrl: './allreviews.component.css'
})
export class AllreviewsComponent {

  reviewList: Reviews[] = [];

  constructor(private reviewsService: ReviewsService, gamesService: GamesService) {}
  private gamesService = inject(GamesService);


  ngOnInit(): void {
    this.reviewList = this.reviewsService.asyncgetAllReviews()
  }

  getGameDetails(id: number) {
    return this.gamesService.getGameDetailsById(id);
  }

}
