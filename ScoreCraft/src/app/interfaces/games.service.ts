import { Injectable } from '@angular/core';
import { Games } from './games';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map

 } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GamesService{

     private apiUrl = 'http://localhost:3000/api/profiles';
     constructor(private http: HttpClient) { }

     getAllGames(): Observable<Games[]>{
      return this.http.get<Games[]>(this.apiUrl)
    }

    getFavGames(favG: Array<number>): Observable<Games[]>{
      return this.getAllGames().pipe(
        map(games => games.filter(game => favG.includes(game.id)))
      );
      console.log(this.getAllGames().pipe(
        map(games => games.filter(game => favG.includes(game.id)))
      ))
    }

    getGameDetailsById(game_id: number): Observable<Games> {
      return this.http.get<Games>(`${this.apiUrl}/games/${game_id}`);
    }
    


      
}