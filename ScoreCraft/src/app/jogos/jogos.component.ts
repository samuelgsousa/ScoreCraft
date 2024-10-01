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
  paginatedGameList: any[] = [];  // Lista de jogos exibidos na página atual
  currentPage = 1;  // Página atual
  pageSize = 20;  // Quantidade de jogos por página
  totalGames = 0;  // Total de jogos

  constructor(private gamesService: GamesService) {}



  ngOnInit(): void {
    this.loadGames();

  }

   // Carrega todos os jogos e define a paginação inicial
  // Método que carrega os jogos da página atual
  loadGames() {
    this.gamesService.getPaginatedGames(this.currentPage, this.pageSize)
      .subscribe(response => {
        this.paginatedGameList = response.games;
        this.totalGames = response.total;  // Total de jogos no banco de dados
      });
  }

    // Método chamado quando a página é alterada
    onPageChange(page: number) {
      this.currentPage = page;
      this.loadGames();
    }

}




