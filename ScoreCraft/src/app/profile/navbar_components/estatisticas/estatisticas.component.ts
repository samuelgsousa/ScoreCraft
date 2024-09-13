import { Component, inject, Input } from '@angular/core';
import { Profile } from '../../../interfaces/profile';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../interfaces/profile.service';
import { Reviews } from '../../../interfaces/reviews';
import { ReviewsService } from '../../../interfaces/reviews.service';
import Chart from 'chart.js/auto';
import { RouterLink, RouterModule } from '@angular/router';
@Component({
  selector: 'user-estatisticas',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './estatisticas.component.html',
  styleUrl: './estatisticas.component.css'
})

export class EstatisticasComponent {
  @Input() profile: Profile | undefined;
  userReviews: Reviews[] = [];
  followers: Profile[] = []; // Inicializado como um array vazio
  review: any;

  constructor(private reviewsService: ReviewsService, private profileService: ProfileService) {}

  async ngOnInit(): Promise<void> {
    if (this.profile?.id !== undefined) {

      this.reviewsService.getUserReviews(this.profile.id).subscribe(
        (reviews: Reviews[]) => {
          this.userReviews = reviews;
          
          this.userReviews.forEach(review => {
            console.log(review.rating);
          });

          this.gerarGrafico(); // Atualiza o gráfico após carregar as reviews
        },
        error => {
          console.error('Erro ao buscar reviews:', error);
        }
      );

      this.profileService.getFollowersById(this.profile.id).subscribe(
        (followers: Profile[]) => {
          this.followers = followers;

        },
        error => {
          console.error('Erro ao buscar seguidores:', error);
        }
      );
    }
    // this.gerarGrafico()
  }

  gerarGrafico(): void {
    const ctx = document.querySelector('#myChart') as HTMLCanvasElement | null;

    if (ctx) {
      Chart.defaults.font.size = 25;
      Chart.defaults.color = 'white'; // Cor da fonte

      const ratingCounts = [1, 2, 3, 4, 5].map(rating => 
        this.userReviews.filter(review => review.rating === rating).length
      );

      new Chart(ctx, {
        type: 'bar', // Tipo de gráfico
        data: {
          labels: ['★', '★', '★', '★', '★'],
          datasets: [{
            label: '',
            data: ratingCounts, // Número de avaliações por estrela
            borderWidth: 1,
            backgroundColor: ['rgb(8, 255, 111)']
          }]
        },
        options: {
          plugins: {
            legend: { display: false } // Oculta a legenda
          },
          scales: {
            y: { display: false, grid: { display: false } }, 
            x: { grid: { display: false } } // Oculta as grades
          }
        }
      });
    }
  }
}

