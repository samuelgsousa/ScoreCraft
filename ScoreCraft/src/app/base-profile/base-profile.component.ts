import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, Input, NgModule } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Profile } from '../interfaces/profile';
import { ProfileService } from '../interfaces/profile.service';
import { EstatisticasComponent } from '../profile/navbar_components/estatisticas/estatisticas.component';
import { JogosComponent } from '../profile/navbar_components/jogos/jogos.component';
import { ReviewsComponent } from '../profile/navbar_components/reviews/reviews.component';
import { AuthService } from '../login/auth.service'; // Serviço de autenticação
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-base-profile',
  standalone: true,
  imports: [NgbNavModule, JogosComponent, ReviewsComponent, EstatisticasComponent, CommonModule, FormsModule],
  templateUrl: './base-profile.component.html',
  styleUrl: './base-profile.component.css'
})
export class BaseProfileComponent {
  @Input() user!: Profile | undefined;
  @Input() gamesText: string = 'Jogos';
  @Input() reviewsText: string = 'Reviews';
  @Input() statsText: string = 'Estatísticas';
  @Input() isCurrentUser: boolean = false;

  route: ActivatedRoute = inject(ActivatedRoute);
  profileUserService: ProfileService = inject(ProfileService);

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
  ]

  profileData: any = {
    nome: '',
    bio: '',
  
  }
 

  constructor(private authService: AuthService) {
    this.getUser();
    // this.loggedInUserId = this.authService.getCurrentUser()?.id || null;
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

    if (this.user) {
      this.profileData = {
        nome: this.user.nome || '',
        bio: this.user.bio || '',
        // Adicione outros campos conforme necessário
      };
    }

  }
  

  getPetProfilePicture(): string{
    if(this.user?.foto_perfil != null){
      return this.user.foto_perfil;
    } else{
      const randomIndex = Math.floor(Math.random() * this.petPhotos.length);
      return this.petPhotos[randomIndex]
    }
  }

  enableEdit() {
    this.isEditing = true; // Habilita o modo de edição
  }

  cancelEdit(){
    this.isEditing = false;
  }

  update(field: string){ //uma única função para alterar qualquer dado de acordo com os parâmetros
 
    if(this.user){
       this.profileUserService.updateProfileField(this.user?.id, field, this.profileData[field])
      // console.log(`O campo alterado deve ser o ${field} que receberá o valor: ${this.profileData[field]}`)
   }
  }
}

NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

