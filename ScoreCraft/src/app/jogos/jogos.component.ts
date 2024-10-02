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
  
  constructor(private gamesService: GamesService) {}
  
  isSmallScreen: boolean = false;
  currentPage = 1; // Página atual
  totalGames = 500;  // Total de jogos

  isSearching!: boolean | false;
  searchTerm: string = '';


  ngOnInit(): void {
    this.loadGames(0)
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 968; 
  }



  loadGames(page: number){
    
    const range = (page - 1) * 20

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

  searchGames() {

    if(this.searchTerm == ""){
      this.loadGames(0)
      this.isSearching = false
    } else{
      this.isSearching = true;
      this.gamesService.searchGame(this.searchTerm).subscribe(
        (data: Games[]) => {
          this.gameList = data;
        },
        (error) => {
          console.error('Erro ao buscar jogos', error);
        }
      );
    }
  }

  clearSearch(): void {
    this.searchTerm = ''; 
    this.loadGames(0);
    this.isSearching = false;
}

openPopoverOrPopup(p: any, game: any): void {
  if (this.isSmallScreen) {
    this.openPopup(game); // Abre um popup
  } else {
    p.open(); // Abre o popover
  }
}

openPopup(game: any): void {
  // Lógica para abrir o popup centralizado
  alert(`Popup para o jogo: ${game.name}`); // Substitua por seu modal/popup
}


}


