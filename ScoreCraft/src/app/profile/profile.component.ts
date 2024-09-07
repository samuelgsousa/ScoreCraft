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
}

NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
