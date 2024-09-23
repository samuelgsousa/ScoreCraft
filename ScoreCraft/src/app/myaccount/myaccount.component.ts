import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../login/auth.service';
import { Profile } from '../interfaces/profile';
import { ProfileService } from '../interfaces/profile.service';
import { TokenConfirmService } from '../interfaces/token-confirm.service';

@Component({
  selector: 'app-myaccount',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './myaccount.component.html',
  styleUrl: './myaccount.component.css'
})
export class MyaccountComponent {

currentUser: Profile | null = null
isEditing = false;
accountForm!: FormGroup;
profilePhoto: string = ''; // Foto padrão
wallpaperPhoto: string = ''

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

wppPhotos: string[] = [
  'https://images3.alphacoders.com/136/thumb-1920-1368376.png',
  'https://images5.alphacoders.com/710/thumb-1920-710940.png',
  'https://images7.alphacoders.com/132/thumb-1920-1326068.jpeg',
  'https://images3.alphacoders.com/137/thumb-1920-1374373.jpg',
  'https://images6.alphacoders.com/131/thumb-1920-1311862.jpeg',
]


constructor( 
  private authService: AuthService, 
  private profileUserService: ProfileService,
  private tokenService: TokenConfirmService
) {}

ngOnInit(): void {
  this.authService.currentUser$.subscribe((user) => {
    this.currentUser = user;

    if(user?.foto_perfil) this.profilePhoto = user?.foto_perfil;
    if(user?.wallpaper) this.wallpaperPhoto = user?.wallpaper
    
    // console.log(`Foto de perfil: ${this.profilePhoto} e foto de capa: ${this.wallpaperPhoto}`)

    const cover = document.querySelector("div#cover") as HTMLElement;
    cover.style.backgroundImage = `url(${this.currentUser?.wallpaper})`;
  });

  this.accountForm = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    bio: new FormControl('', [Validators.maxLength(300)])
  });

}


toggleIconSelection(): void {
  if(this.isEditing)(document.querySelector("#iconSelection") as HTMLDivElement).classList.toggle('show');
}
toggleWppSelection(): void {
  if(this.isEditing)(document.querySelector("#wppSelect") as HTMLDivElement).classList.toggle('show');
}

changePetProfilePicture(photo: string): void {
  this.profilePhoto = photo;
}
changeWallpaper(photo: string): void {
  const cover = document.querySelector('#cover') as HTMLElement
  this.wallpaperPhoto = photo;
  cover.style.backgroundImage = `url(${this.wallpaperPhoto})`
  
}



enableEdit() {
  this.isEditing = true; // Habilita o modo de edição
}

cancelEdit(){
  this.isEditing = false;
}

resetPassword(){
  
}

onSubmit() {
  if (this.accountForm.valid) {

    // Criar objeto profile sem a senha inicialmente
    const profile: any = {
      id: this.currentUser?.id,
      nome: this.accountForm.get('nome')?.value,
      email: this.accountForm.get('email')?.value,
      foto_perfil: this.profilePhoto,
      wallpaper: this.wallpaperPhoto,
      bio: this.accountForm.get('bio')?.value,
    };
    this.profileUserService.updateProfile(profile)
      .subscribe(
        response => console.log('Perfil atualizado com sucesso', response),
        error => console.error('Erro ao atualizar o perfil', error)
      );

  } else {
    console.error('Formulário inválido');
  }
}


}
