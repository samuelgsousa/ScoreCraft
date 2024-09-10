import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './login/auth.guard';

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
        path: 'login',
        component: LoginComponent,
        title: 'Fazer Login'
    },
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        title: 'Dashboard'

    },
    {
        path: '**', 
        redirectTo: '', 
        pathMatch: 'full'
  
    }
];
