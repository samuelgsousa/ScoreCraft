import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home page'
    },
    {
        path: 'users',
        component: UsersComponent,
        title: 'Usuários'
    },
    {
        path: 'users/profile/:id',
        component: ProfileComponent,
        title: '?User?'
    },
    {
        path: 'signup',
        component: SignupComponent,
        title: 'Criar Conta'
    },
    {
        path: '**', 
        redirectTo: '', 
        pathMatch: 'full'
  
    }
];
