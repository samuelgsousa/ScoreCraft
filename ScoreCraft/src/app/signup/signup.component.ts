import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../interfaces/profile.service';
import { Profile } from '../interfaces/profile';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../login/auth.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  accountForm!: FormGroup;

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

  profilePhoto: string = './petcons/default_profile.png'; // Foto padrão
  wallpaperPhoto: string = ''

  newId: number | undefined;

  constructor(private fb: FormBuilder, private profileUserService: ProfileService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      foto_perfil: this.profilePhoto,
      wallpaper: this.wallpaperPhoto,
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      bio: ['', [Validators.maxLength(300)]],
    }, { validators: this.passwordMatchValidator });

    this.getPetProfilePicture();
    this.getWallpaper();
  }

  toggleIconSelection(): void {
    (document.querySelector("#iconSelection") as HTMLDivElement).classList.toggle('show');
  }
  toggleWppSelection(): void {
    (document.querySelector("#wppSelect") as HTMLDivElement).classList.toggle('show');
  }

  // Validação personalizada para confirmar se as senhas coincidem
  passwordMatchValidator(form: FormGroup): { [s: string]: boolean } | null {
    if (form.get('senha')?.value !== form.get('confirmPassword')?.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.accountForm.valid) {
      this.profileUserService.getLastUserid().subscribe(
        lastProfile => {
          this.newId = Number(lastProfile)
          
          const profile = {
            id: this.newId,
            nome: this.accountForm.get('nome')?.value,
            email: this.accountForm.get('email')?.value,
            senha: this.accountForm.get('senha')?.value,
            foto_perfil: this.profilePhoto, // Adicionando a foto do perfil
            wallpaper: this.wallpaperPhoto, // Adicionando Wallpaper
            bio: this.accountForm.get('bio')?.value,
          };
          console.log('signup component, dados passados:', profile)
          
          this.profileUserService.addProfile(profile).subscribe(
            async newProfile => {
              console.log('Perfil adicionado com sucesso:', newProfile);
              const isAuthenticated = await this.authService.login(profile.email, profile.senha);
              if (isAuthenticated) {
                this.router.navigate(['/dashboard']); // Redirecionar para a página desejada após o login
              }
              // Atualize a lista de perfis ou faça qualquer outra ação necessária
            },
            error => {
              console.error('Erro ao adicionar perfil:', error);
            }
          );
        }
      )

    } else {
      console.error('Formulário inválido');
    }
  }

  getPetProfilePicture(): void {
    const randomIndex = Math.floor(Math.random() * this.petPhotos.length); 
    this.profilePhoto = this.petPhotos[randomIndex];
  }

  getWallpaper(): void {
    const randomIndex = Math.floor(Math.random() * this.wppPhotos.length); 
    this.wallpaperPhoto = this.wppPhotos[randomIndex];
    const cover = document.querySelector('#cover') as HTMLElement
    cover.style.backgroundImage = `url(${this.wallpaperPhoto})`
  }

  changePetProfilePicture(photo: string): void {
    this.profilePhoto = photo;
  }
  changeWallpaper(photo: string): void {
    const cover = document.querySelector('#cover') as HTMLElement
    this.wallpaperPhoto = photo;
    cover.style.backgroundImage = `url(${this.wallpaperPhoto})`
    
  }
}
