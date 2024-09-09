import { Component, inject, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { JogosComponent } from "./navbar_components/jogos/jogos.component";
import { ReviewsComponent } from "./navbar_components/reviews/reviews.component";
import { EstatisticasComponent } from "./navbar_components/estatisticas/estatisticas.component";
import { ProfileService } from '../interfaces/profile.service';
import { Profile } from '../interfaces/profile';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgbNavModule, JogosComponent, ReviewsComponent, EstatisticasComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  profileUserService: ProfileService = inject(ProfileService);

  active = 1;
  user: Profile | undefined;
  profilePicture: string | undefined;

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
  ]
  

  constructor() {
    this.getUser();
  }

  async getUser() {
    this.user = await this.profileUserService.getUserById(this.route.snapshot.params['id']);
    this.insertWallpaper(String(this.user?.wallpaper));
  }

  insertWallpaper(wallpaperUrl: string) {
    const cover = document.querySelector("div#cover") as HTMLElement;
    cover.style.backgroundImage = `url(${wallpaperUrl})`;
  }

  ngOnInit(): void {
    this.profilePicture = this.user?.foto_perfil || this.getPetProfilePicture();
  }
  

  getPetProfilePicture(): string{
    if(this.user?.foto_perfil != null){
      return this.user.foto_perfil;
    } else{
      const randomIndex = Math.floor(Math.random() * this.petPhotos.length);
      return this.petPhotos[randomIndex]
    }
  }
}

NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
