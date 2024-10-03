import { Component } from '@angular/core';
import { GamesService } from '../interfaces/games.service';
import { CommonModule } from '@angular/common';
import { Games } from '../interfaces/games';
import { HttpClient} from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { NgbModal, NgbModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { Directive, ElementRef, Output, EventEmitter, HostListener } from '@angular/core';
import { ClickOutsideDirective } from './click-outside.directive'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jogos',
  standalone: true,
  imports: [CommonModule, RouterLink, NgbPopoverModule, NgbModule, FormsModule],
  templateUrl: './jogos.component.html',
  styleUrl: './jogos.component.css'
})


export class JogosComponent {

  
  @Output() clickOutside = new EventEmitter<void>();
  @HostListener('window:resize', ['$event'])  onResize(event: any) {
      this.checkScreenSize();
    }

  gameList: Games[] = [];
  
  constructor(private gamesService: GamesService, private modalService: NgbModal) {}
  
  isSmallScreen: boolean = false;
  currentPage = 1; // Página atual
  totalGames = 500;  // Total de jogos

  isSearching!: boolean | false;
  searchTerm: string = '';

  selectedGame: any;

  isLoading: boolean = true;

  ngOnInit(): void {
    this.loadGames(0)
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 968; 
  }



  loadGames(page: number){

    this.isLoading = true

    const range = (page - 1) * 20

    this.gamesService.getRangeGames(range).subscribe(
      (data: Games[]) => {
        this.gameList = data;
        this.isLoading = false
        // this.totalGames = data.length;
      },
      (error) => {
        console.error('Erro ao buscar jogos', error);
        this.isLoading = false
      }
    );

  }

  searchGames() {

    this.isLoading = true

    if(this.searchTerm == ""){
      this.loadGames(0)
      this.isSearching = false
      this.isLoading = false
    } else{
      this.isSearching = true;
      this.gamesService.searchGame(this.searchTerm).subscribe(
        (data: Games[]) => {
          this.gameList = data;
          this.isLoading = false
        },
        (error) => {
          console.error('Erro ao buscar jogos', error);
          this.isLoading = false
        }
      );
    }
  }

  clearSearch(): void {
    this.searchTerm = ''; 
    this.loadGames(0);
    this.isSearching = false;
}

openPopoverOrPopup(p: any, game: any, content: any): void {
  if (this.isSmallScreen) {
    this.openPopup(content, game); // Abre o popup/modal
  } else {
    p.open(); // Abre o popover
  }
}

openPopup(content: any, game: any): void {
  this.selectedGame = game; // Armazena o jogo atual para exibir os detalhes no modal
  this.modalService.open(content, { centered: true, windowClass: 'games-modal' }); // Abre o modal centralizado
}



}


