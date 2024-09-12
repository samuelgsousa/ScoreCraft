import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Games } from './games';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private baseUrl = 'http://localhost:3000/api/games'; // URL do seu backend

  constructor(private http: HttpClient) { }

  getFavGames(favG: Array<number>): Observable<Games[]> {
    return this.http.get<Games[]>(`${this.baseUrl}/favorites`, {
      params: {
        ids: favG.join(',')
      }
    });
  }

  getGameDetailsById(id: number): Observable<Games> {
    return this.http.get<Games>(`${this.baseUrl}/${id}`);
  }

  getAllGames(): Observable<Games[]> {
    return this.http.get<Games[]>(this.baseUrl);
  }
}









// import { Injectable } from '@angular/core';
// import { Games } from './games';

// @Injectable({
//   providedIn: 'root'
// })
// export class GamesService{

//     protected gamesList: Games[] = [
//         {
//           id: 1,
//           name: "Bloodborne",
//           picture: "./games/bloodborne.svg",
//           release_date: new Date('2015-03-24'),
//           summary: "Enfrente seus pesadelos enquanto busca respostas na antiga cidade de Yharnam, agora amaldiçoada com uma estranha doença endêmica que se espalha pelas ruas como fogo. Perigo, morte e loucura estão em cada canto deste sombrio e horroroso mundo, e você deve descobrir seus segredos mais sombrios para sobreviver.",
//           producer: "FromSoftware Inc",
//           genres: ["RPG de ação"]
//         },
//         {
//           id: 2,
//           name: "Lies of P",
//           picture: "./games/lies-of-p.svg",
//           release_date: new Date('2023-09-19'),
//           summary: "Lies of P é um RPG de ação soulslike inspirado na história de Pinóquio, com uma ambientação sombria e mecânicas de combate desafiadoras.",
//           producer: "Neowiz Games",
//           genres: ["RPG", "Soulslike"]
//         },
//         {
//           id: 3,
//           name: "Minecraft",
//           picture: "./games/minecraft.svg",
//           release_date: new Date('2011-11-18'),
//           summary: "Um jogo de construção e sobrevivência em um mundo gerado por blocos, onde a criatividade do jogador é o limite.",
//           producer: "Mojang Studios",
//           genres: ["Sandbox", "Sobrevivência", "Aventura"]
//         },
//         {
//           id: 4,
//           name: "Horizon Forbidden West",
//           picture: "./games/horizon-forbidden-west.svg",
//           release_date: new Date('2022-02-18'),
//           summary: "Acompanhe Aloy em uma jornada épica pelo Oeste Proibido para enfrentar novas ameaças em um mundo pós-apocalíptico.",
//           producer: "Guerrilla Games",
//           genres: ["Ação", "RPG", "Aventura"]
//         },
//         {
//           id: 5,
//           name: "Stardew Valley",
//           picture: "./games/stardew-valley.svg",
//           release_date: new Date('2016-02-26'),
//           summary: "Um simulador de fazenda onde você constrói sua vida na cidade, planta, cria animais, e desenvolve relacionamentos com os moradores locais.",
//           producer: "ConcernedApe",
//           genres: ["Simulação", "RPG"]
//         },
//         {
//           id: 6,
//           name: "Castlevania Symphony of the Night",
//           picture: "./games/castlevania.svg",
//           release_date: new Date('1997-03-20'),
//           summary: "Um clássico dos jogos de ação e plataforma, onde Alucard explora o castelo de Drácula em busca de respostas e redenção.",
//           producer: "Konami",
//           genres: ["Ação", "Plataforma", "Metroidvania"]
//         },
//         {
//           id: 7,
//           name: "It Takes Two",
//           picture: "./games/it-takes-two.svg",
//           release_date: new Date('2021-03-26'),
//           summary: "Um jogo cooperativo de aventura onde dois jogadores devem trabalhar juntos para superar desafios e salvar um relacionamento.",
//           producer: "Hazelight Studios",
//           genres: ["Aventura", "Cooperativo", "Puzzle"]
//         },
//         {
//           id: 8,
//           name: "Marvel vs Capcom",
//           picture: "./games/marvel-vs-capcom.svg",
//           release_date: new Date('1999-01-23'),
//           summary: "Um jogo de luta icônico que coloca heróis da Marvel contra personagens lendários da Capcom em batalhas frenéticas.",
//           producer: "Capcom",
//           genres: ["Luta", "Arcade"]
//         },
//         {
//           id: 9,
//           name: "Naruto Ultimate Ninja 2",
//           picture: "./games/naruto-un.svg",
//           release_date: new Date('2004-09-30'),
//           summary: "Um jogo de luta baseado no anime Naruto, onde os jogadores podem escolher seus ninjas favoritos para batalhas épicas.",
//           producer: "CyberConnect2",
//           genres: ["Luta", "Ação"]
//         },
//         {
//           id: 10,
//           name: "Stray",
//           picture: "./games/stray.svg",
//           release_date: new Date('2022-07-19'),
//           summary: "Explore uma cidade cyberpunk abandonada através dos olhos de um gato em uma aventura de exploração e puzzles.",
//           producer: "BlueTwelve Studio",
//           genres: ["Aventura", "Exploração", "Puzzle"]
//         },
//         {
//           id: 11,
//           name: "God of War (2018)",
//           picture: "./games/god-of-war-2018.svg",
//           release_date: new Date('2018-04-20'),
//           summary: "Kratos retorna em uma nova jornada épica ao lado de seu filho Atreus, enfrentando deuses nórdicos e descobrindo o que significa ser pai.",
//           producer: "Santa Monica Studio",
//           genres: ["Ação", "Aventura"]
//         },
//         {
//           id: 12,
//           name: "Bioshock",
//           picture: "./games/bioshock.svg",
//           release_date: new Date('2007-08-21'),
//           summary: "Explore a cidade subaquática de Rapture enquanto luta contra habitantes geneticamente modificados em uma história de escolhas morais.",
//           producer: "Irrational Games",
//           genres: ["FPS", "Aventura", "Terror"]
//         },
//         {
//           id: 13,
//           name: "Cyberpunk 2077",
//           picture: "./games/cyberpunk.svg",
//           release_date: new Date('2020-12-10'),
//           summary: "Viva em uma distopia futurista onde você pode modificar seu corpo com implantes cibernéticos e tomar decisões que moldam o mundo ao seu redor.",
//           producer: "CD Projekt Red",
//           genres: ["RPG", "Ação", "Mundo Aberto"]
//         },
//         {
//           id: 14,
//           name: "The Witcher 3: Wild Hunt",
//           picture: "./games/the-witcher-3.svg",
//           release_date: new Date('2015-05-19'),
//           summary: "Embarque em uma aventura épica em um mundo aberto como Geralt de Rívia, um caçador de monstros.",
//           producer: "CD Projekt Red",
//           genres: ["RPG", "Ação", "Mundo Aberto"]
//         },
//         {
//           id: 15,
//           name: "The Legend of Zelda: Breath of the Wild",
//           picture: "./games/zelda_breath_of_the_wild.svg",
//           release_date: new Date('2017-03-03'),
//           summary: "Explore um vasto mundo aberto enquanto desvenda segredos e enfrenta inimigos poderosos.",
//           producer: "Nintendo",
//           genres: ["Ação", "Aventura", "Mundo Aberto"]
//         },
//         {
//           id: 16,
//           name: "Red Dead Redemption 2",
//           picture: "./games/red-dead-redemption-2.svg",
//           release_date: new Date('2018-10-26'),
//           summary: "Uma jornada épica no Velho Oeste enquanto o fora-da-lei Arthur Morgan tenta sobreviver.",
//           producer: "Rockstar Games",
//           genres: ["Ação", "Aventura", "Mundo Aberto"]
//         },
//         {
//           id: 17,
//           name: "Elden Ring",
//           picture: "./games/elden-ring.svg",
//           release_date: new Date('2022-02-25'),
//           summary: "Explore o vasto mundo de Lands Between e enfrente inimigos poderosos em um RPG desafiador.",
//           producer: "FromSoftware Inc",
//           genres: ["RPG", "Ação", "Soulslike"]
//         },
//         {
//           id: 18,
//           name: "Hades",
//           picture: "./games/hades.svg",
//           release_date: new Date('2020-09-17'),
//           summary: "Escape do submundo grego em um jogo de ação roguelike com combates intensos.",
//           producer: "Supergiant Games",
//           genres: ["Roguelike", "Ação"]
//         },
//         {
//           id: 19,
//           name: "Sekiro: Shadows Die Twice",
//           picture: "./games/sekiro-shadows-die-twice.svg",
//           release_date: new Date('2019-03-22'),
//           summary: "Assuma o papel de um guerreiro shinobi em uma jornada de vingança no Japão feudal.",
//           producer: "FromSoftware Inc",
//           genres: ["Ação", "Soulslike"]
//         },
//         {
//           id: 20,
//           name: "Ghost of Tsushima",
//           picture: "./games/ghost-of-tsushima.svg",
//           release_date: new Date('2020-07-17'),
//           summary: "Defenda o Japão da invasão mongol em uma aventura épica com samurais.",
//           producer: "Sucker Punch Productions",
//           genres: ["Ação", "Aventura", "Mundo Aberto"]
//         },
//         {
//           id: 21,
//           name: "Super Mario Odyssey",
//           picture: "./games/super-mario-odyssey.svg",
//           release_date: new Date('2017-10-27'),
//           summary: "Viaje pelo mundo com Mario para salvar a Princesa Peach de Bowser em uma nova aventura.",
//           producer: "Nintendo",
//           genres: ["Plataforma", "Aventura"]
//         },
//         {
//           id: 22,
//           name: "Resident Evil Village",
//           picture: "./games/resident-evil-village.svg",
//           release_date: new Date('2021-05-07'),
//           summary: "Explore uma vila misteriosa em busca de respostas enquanto enfrenta criaturas horríveis.",
//           producer: "Capcom",
//           genres: ["Terror", "Ação"]
//         },
//         {
//           id: 23,
//           name: "Doom Eternal",
//           picture: "./games/doom-eternal.svg",
//           release_date: new Date('2020-03-20'),
//           summary: "O Slayer retorna para enfrentar hordas de demônios em uma jornada épica.",
//           producer: "id Software",
//           genres: ["FPS", "Ação"]
//         },
//         {
//           id: 24,
//           name: "Final Fantasy VII Remake",
//           picture: "./games/final-fantasy-vii-remake.svg",
//           release_date: new Date('2020-04-10'),
//           summary: "Reviva a história épica de Cloud Strife e seus amigos na luta contra a corporação Shinra.",
//           producer: "Square Enix",
//           genres: ["RPG", "Ação"]
//         },
//         {
//           id: 25,
//           name: "The Last of Us Part II",
//           picture: "./games/the-last-of-us-part-ii.svg",
//           release_date: new Date('2020-06-19'),
//           summary: "Acompanhe Ellie em uma jornada brutal e emocional por vingança em um mundo pós-apocalíptico.",
//           producer: "Naughty Dog",
//           genres: ["Ação", "Aventura"]
//         },
        
//       ];

//     getFavGames(favG: Array<number>): Games[]{
//       return this.gamesList.filter(game => favG.includes(game.id));
//       console.log(this.gamesList.filter(game => favG.includes(game.id)))
//     }

//     getGameDetailsById(game_id: number): {name: string, picture: string} | undefined {
//       const game = this.gamesList.find(g => g.id === game_id)
//       return game ? {name: game.name, picture: game.picture} : undefined
//     }

//     getAllGames(){
//       return this.gamesList
//     }
      
// }