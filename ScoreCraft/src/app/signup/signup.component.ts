import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../interfaces/profile.service';
import { Profile } from '../interfaces/profile';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
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

  profilePhoto: string = './petcons/default_profile.png'; // Foto padrão

  constructor(private fb: FormBuilder, private profileUserService: ProfileService) {}

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      foto_perfil: this.profilePhoto,
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      bio: ['', [Validators.maxLength(300)]],
    }, { validators: this.passwordMatchValidator });

    this.getPetProfilePicture();
  }

  toggleIconSelection(): void {
    (document.querySelector("#iconSelection") as HTMLDivElement).classList.toggle('show');
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
      const profile = {
        nome: this.accountForm.get('nome')?.value,
        email: this.accountForm.get('email')?.value,
        senha: this.accountForm.get('senha')?.value,
        foto_perfil: this.profilePhoto, // Adicionando a foto do perfil
        bio: this.accountForm.get('bio')?.value,
      };
      console.log(profile);
      
      this.profileUserService.addProfile(profile).subscribe(
        newProfile => {
          console.log('Perfil adicionado com sucesso:', newProfile);
          // Atualize a lista de perfis ou faça qualquer outra ação necessária
        },
        error => {
          console.error('Erro ao adicionar perfil:', error);
        }
      );
    } else {
      console.error('Formulário inválido');
    }
  }

  getPetProfilePicture(): void {
    const randomIndex = Math.floor(Math.random() * this.petPhotos.length); 
    this.profilePhoto = this.petPhotos[randomIndex];
  }

  changePetProfilePicture(photo: string): void {
    this.profilePhoto = photo;
  }
}
