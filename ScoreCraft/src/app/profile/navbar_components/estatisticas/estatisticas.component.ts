import { Component, Input } from '@angular/core';
import { Profile } from '../../../interfaces/profile';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../interfaces/profile.service';
import { Reviews } from '../../../interfaces/reviews';
import { ReviewsService } from '../../../interfaces/reviews.service';
import Chart from 'chart.js/auto';
import { RouterLink, RouterModule } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'user-estatisticas',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './estatisticas.component.html',
  styleUrls: ['./estatisticas.component.css']
})
export class EstatisticasComponent {
  @Input() profile: Profile | undefined;

  userReviews: Reviews[] = [];
  followers: Profile[] = [];
  review: any;

  constructor(private reviewsService: ReviewsService, private profileService: ProfileService) {}

  async ngOnInit(): Promise<void> {
    if (this.profile?.id !== undefined) {
      this.userReviews = await firstValueFrom(this.reviewsService.getUserReviews(this.profile?.id));
      this.followers = await firstValueFrom(this.profileService.getFollowersById(this.profile?.id));
    }
  }

}
