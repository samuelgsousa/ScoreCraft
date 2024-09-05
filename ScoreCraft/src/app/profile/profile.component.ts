import { Component, inject } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { JogosComponent } from "./navbar_components/jogos/jogos.component";
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../interfaces/profile.service';
import { Profile } from '../interfaces/profile';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgbNavModule, JogosComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  route: ActivatedRoute = inject(ActivatedRoute)
  profileUserService: ProfileService = inject(ProfileService)

  active = 1
  user: Profile | undefined


  constructor() {
    this.getUser()
  }

  async getUser(){
    this.user = await this.profileUserService.getUserById(this.route.snapshot.params['id'])
    this.insertWallpaper(String(this.user?.wallpaper))
  }

  insertWallpaper(wallpaperUrl: string){
    let cover = document.querySelector("div#cover");
    (cover as HTMLElement).style.backgroundImage = `url(${wallpaperUrl})`
  }

}


