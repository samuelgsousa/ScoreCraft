import { Component, inject, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { JogosComponent } from "./navbar_components/jogos/jogos.component";
import { ReviewsComponent } from "./navbar_components/reviews/reviews.component";
import { EstatisticasComponent } from "./navbar_components/estatisticas/estatisticas.component";
import { ProfileService } from '../interfaces/profile.service';
import { Profile } from '../interfaces/profile';
import { BaseProfileComponent } from "../base-profile/base-profile.component";

@Component({
  selector: 'app-profile', 
  standalone: true,
  imports: [NgbNavModule, JogosComponent, ReviewsComponent, EstatisticasComponent, BaseProfileComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
}

