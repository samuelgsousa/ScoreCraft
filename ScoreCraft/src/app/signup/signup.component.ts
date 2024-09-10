import { CommonModule } from '@angular/common';
import { Component, inject, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from '../interfaces/profile.service';
import { Profile } from '../interfaces/profile';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
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
  ]
 

  constructor(private fb: FormBuilder, private profileUserService: ProfileService) {}

  ngOnInit(): void {
    this.accountForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      bio: ['', [Validators.maxLength(300)]],
    }, { validators: this.passwordMatchValidator });
   
    this.getPetProfilePicture();
  }

    toggleIconSelection(){
      (document.querySelector("#iconSelection") as HTMLImageElement).classList.toggle('show')
    }

    // Validação personalizada para confirmar se as senhas coincidem
    passwordMatchValidator(form: FormGroup): { [s: string]: boolean } | null {
      if (form.get('password')?.value !== form.get('confirmPassword')?.value) {
        return { passwordMismatch: true };
      }
      return null;
    }

    onSubmit(): void {
      if (this.accountForm.valid) {
        console.log('Formulário enviado com sucesso', this.accountForm.value);

        const formValue = this.accountForm.value;
        const nextId = this.profileUserService.getNextId();

        const newProfile: Profile ={
          id: nextId,
          nome: formValue.username,
          foto_perfil: String((document.querySelector("#Profile_Photo") as HTMLImageElement).src),
          fav_gen: null,
          streamer: false,
          seguindo: null,
          wallpaper: null,
          bio: formValue.bio,
          fav_games: null,
          email: formValue.email,
          senha: formValue.password,
        }
        this.profileUserService.addProfile(newProfile)

      } else {
        console.log('Formulário inválido');
      }
    }

    getPetProfilePicture(){
        const randomIndex = Math.floor(Math.random() * this.petPhotos.length); 
        (document.querySelector("#Profile_Photo") as HTMLImageElement).src = this.petPhotos[randomIndex]
    
    }

    changePetProfilePicture(photo: string) {
      (document.querySelector("#Profile_Photo") as HTMLImageElement).src = photo;}

}
