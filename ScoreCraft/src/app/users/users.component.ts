import { Component, inject } from '@angular/core';
import { ProfileService } from '../interfaces/profile.service';
import { Profile } from '../interfaces/profile';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  
  [x: string]: any;
  allUsersList: Profile[] =[]

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

  constructor(private allUsersService: ProfileService){
    this.getAllUsers();
    this.profilePicture = this.user?.foto_perfil || this.getPetProfilePicture();
  }

  async getAllUsers() {
    this.allUsersService.getAllUsers().subscribe(users => {
      this.allUsersList = users;
    }, error => {
      console.error('Erro ao buscar usuários', error);
    });

    
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


