import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule

 } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    })
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      const { email, senha } = this.loginForm.value;
      const isAuthenticated = await this.authService.login(email, senha); // Use "await" para aguardar a Promise
  
      if (isAuthenticated) {
        this.router.navigate(['/dashboard']); // Redirecionar para a página desejada após o login
      } else {
        console.error('Credenciais inválidas');
      }
    } else {
      console.error('Formulário inválido');
    }
  }
  
  


}
