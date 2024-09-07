import { Component, inject, Input } from '@angular/core';
import { Profile } from '../../../interfaces/profile';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../../interfaces/profile.service';
import { Reviews } from '../../../interfaces/reviews';
import { ReviewsService } from '../../../interfaces/reviews.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'user-estatisticas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './estatisticas.component.html',
  styleUrl: './estatisticas.component.css'
})
export class EstatisticasComponent {
  @Input() profile: Profile | undefined;

  userReviews: Reviews[] = [];
  review: any;

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit(): void {
    // Chamando o método para buscar as reviews
    if (this.profile?.id !== undefined) {
      this.userReviews = this.reviewsService.getUserReviews(this.profile?.id);
      this.gerarGrafico();
    }
  }

  gerarGrafico(): void {
    const ctx = document.querySelector('#myChart') as HTMLCanvasElement | null;

    if (ctx) {
      Chart.defaults.font.size = 25;
      Chart.defaults.color = 'white'; // Cor da fonte

      new Chart(ctx, {
        type: 'bar', // Tipo de gráfico
        data: {
          labels: ['★', '★', '★', '★', '★'],
          datasets: [{
            label: '',
            data: [
              this.userReviews.filter(review => review.rating === 1).length,
              this.userReviews.filter(review => review.rating === 2).length,
              this.userReviews.filter(review => review.rating === 3).length,
              this.userReviews.filter(review => review.rating === 4).length,
              this.userReviews.filter(review => review.rating === 5).length
            ], // Número de avaliações por estrela
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
