import { Component } from '@angular/core';
import { GamesService } from '../interfaces/games.service';
import { CommonModule } from '@angular/common';
import { Games } from '../interfaces/games';
import { HttpClient} from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { NgbModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
import { ClickOutsideDirective } from './click-outside.directive'; 

@Component({
  selector: 'app-jogos',
  standalone: true,
  imports: [CommonModule, RouterLink, NgbPopoverModule, NgbModule],
  templateUrl: './jogos.component.html',
  styleUrl: './jogos.component.css'
})


export class JogosComponent {

  
  @Output() clickOutside = new EventEmitter<void>();

  gameList: Games[] = [];
  
  constructor(private gamesService: GamesService) {}

  currentPage = 1; // Página atual
  totalGames = 500;  // Total de jogos

  ngOnInit(): void {
    this.loadGames(1)
  }

  loadGames(page: number){
    
    const range = page * 20

    this.gamesService.getRangeGames(range).subscribe(
      (data: Games[]) => {
        this.gameList = data;
        // this.totalGames = data.length;
      },
      (error) => {
        console.error('Erro ao buscar jogos', error);
      }
    );
  }

}


