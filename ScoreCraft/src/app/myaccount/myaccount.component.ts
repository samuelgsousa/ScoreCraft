import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from 'express';
import { ProfileService } from '../interfaces/profile.service';
import { AuthService } from '../login/auth.service';
import { Profile } from '../interfaces/profile';

@Component({
  selector: 'app-myaccount',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './myaccount.component.html',
  styleUrl: './myaccount.component.css'
})
export class MyaccountComponent {

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

  accountForm!: FormGroup;

  profilePhoto: string = ''; // Foto padrão
  wallpaperPhoto: string = ''
  currentUser: Profile | null = null
  isCurrentUser: boolean = true;
  wallpapper: string | null | undefined


  constructor(private fb: FormBuilder, private profileUserService: ProfileService, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      this.isCurrentUser = true; 
      this.wallpapper = user?.wallpaper // Você define isso como true para o usuário logado
    });
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
      console.log("até aqui ok")

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
