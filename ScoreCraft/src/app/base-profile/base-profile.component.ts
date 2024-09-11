import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Profile } from '../interfaces/profile';
import { ProfileService } from '../interfaces/profile.service';
import { EstatisticasComponent } from '../profile/navbar_components/estatisticas/estatisticas.component';
import { JogosComponent } from '../profile/navbar_components/jogos/jogos.component';
import { ReviewsComponent } from '../profile/navbar_components/reviews/reviews.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../login/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-base-profile',
  standalone: true,
  imports: [NgbNavModule, JogosComponent, ReviewsComponent, EstatisticasComponent, CommonModule, FormsModule],
  templateUrl: './base-profile.component.html',
  styleUrls: ['./base-profile.component.css'] 
})
export class BaseProfileComponent {
  @Input() user!: Profile | undefined;
  @Input() gamesText: string = 'Jogos';
  @Input() reviewsText: string = 'Reviews';
  @Input() statsText: string = 'Estatísticas';
  @Input() isCurrentUser: boolean = false;

  route = inject(ActivatedRoute);
  profileUserService = inject(ProfileService);
  authService = inject(AuthService);

  active = 1;
  profilePicture: string | undefined;
  isEditing = false;
  petPhotos: string[] = [
    './petcons/blueberry_by_hyanna_natsu_daaq3p4.png',
    './petcons/bonbonbear_by_hyanna_natsu_dacb1le.png',
    './petcons/chipster_by_hyanna_natsu_dacb1lb.png',
    './petcons/cottoncandypaca_by_hyanna_natsu_daaq3os.png',
    './petcons/hotdog_by_hyanna_natsu_daaq3oe.png',
    './petcons/pigpizza_by_hyanna_natsu_daaq3nz.png',
    './petcons/popcorn_by_hyanna_natsu_dacb1l4.png',
    './petcons/sushipanda_by_hyanna_natsu_daaq3nr.png',
    './petcons/watermelonparrot_by_hyanna_natsu_daaq3ne.png',
  ];

  profileData: any = {
    nome: '',
    bio: '',
  };

  constructor() {
    this.getUser();
  }

  async getUser() {
    this.user = await this.profileUserService.getUserById(this.route.snapshot.params['id']).toPromise();
    if (this.user) {
      this.insertWallpaper(String(this.user?.wallpaper));
    }
  }

  insertWallpaper(wallpaperUrl: string) {
    const cover = document.querySelector("div#cover") as HTMLElement;
    cover.style.backgroundImage = `url(${wallpaperUrl})`;
  }

  ngOnInit(): void {
    this.profilePicture = this.user?.foto_perfil || this.getPetProfilePicture();

    if (this.user) {
      this.profileData = {
        nome: this.user.nome || '',
        bio: this.user.bio || '',
      };
    }
    
    if (this.isCurrentUser) {
      console.log('é o usuário atual');
    }
  }

  getPetProfilePicture(): string {
    if (this.user?.foto_perfil != null) {
      return this.user.foto_perfil;
    } else {
      const randomIndex = Math.floor(Math.random() * this.petPhotos.length);
      return this.petPhotos[randomIndex];
    }
  }

  enableEdit() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
  }

  update(field: string): void { 
    this.authService.getCurrentUser().subscribe(user => {
      if (user) {
        const updatedProfile = {
          ...user,
          [field]: this.profileData[field]
        };

        // Atualiza o perfil do usuário logado
        this.profileUserService.updateProfile(user.id, updatedProfile)
          .subscribe(
            updatedProfile => {
              console.log('Perfil atualizado com sucesso:', updatedProfile);
            },
            error => {
              console.error('Erro ao atualizar o perfil:', error);
            }
          );
      } else {
        console.error('Usuário não encontrado.');
      }
    });
  }
}
