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
  allUsersService: ProfileService = inject(ProfileService)

  constructor(){
    this.getAllUsers()
  }

  async getAllUsers() {
    this.allUsersList = await this.allUsersService.getAllUsers();
  }
  
}


