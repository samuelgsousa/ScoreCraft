import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { Games } from './games';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

 // private baseUrl = 'https://scorecraft.onrender.com/api/games'; // URL do seu backend
  private baseUrl = 'http://localhost:3000/api/games'

  constructor(private http: HttpClient) { }


  getAllGames(): Observable<Games[]> {
    return this.http.post<Games[]>(this.baseUrl + '/popularidade', {}).pipe(
        tap(data => console.log('Games data received:', data))
    );
}

  getRangeGames(range: number): Observable<Games[]> {
    
    return this.http.post<Games[]>(this.baseUrl + '/popularidade', {range}).pipe(
        tap(data => console.log('Games data received:', data))
    );
  }

  getGameDetailsById(id: number): Observable<Games> {
    return this.http.post<Games>(`${this.baseUrl}/${id}`, {}); // Novamente, enviando um objeto vazio
  } 

  getFavGames(favG: Array<number>): Observable<Games[]> {
    // Primeiro, obtenha todos os jogos
    return this.getAllGames().pipe(
      map(games => {
        // Filtre os jogos que correspondem aos IDs fornecidos
        return games.filter(game => favG.includes(game.id));
      })
    );
  }

  searchGame(searchTerm: string): Observable<Games[]> {
    return this.http.post<Games[]>(`${this.baseUrl}/search`, { search: searchTerm });
  }
}
