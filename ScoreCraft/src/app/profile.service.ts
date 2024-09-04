import { Injectable } from '@angular/core';
import { Profile } from './profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  protected userList: Profile[] =[
    {
      id:1,
      "nome": "Narutinho 123",
      "foto_perfil": "./profile/General/profile-picture-naruto.jpg",
      "seguidores": [2, 3],
      "horas_jogadas": 4556,
      "fav_gen": ["Terror", "Ação", "Aventura"],
      // "avaliacoes":
      //     [1, 2, 3, 4]
      // ,
      "streamer": true,
      "seguindo": [1, 2, 3],
      "wallpaper": "./profile/General/wp-mortal-kombat.svg",
      "bio": "Oi, eu sou o Fabio. Gosto de animes e faço umas livezinhas de vez em quando :3",
      "review_list":[1, 2, 3, 4],
      "fav_games":[1, 5, 7]
      
  },
  {
    id: 2,
    "nome": "Valdemar Oliveira da Silva",
            "foto_perfil": "./profile/General/profile-picture-miranha.jpg",
            "seguidores": [1, 4],
            "horas_jogadas": 1092,
            "fav_gen": ["FPS", "RPG", "Sandbox"],
            // "avaliacoes":{
            //     "star1": 1,
            //     "star2": 5,
            //     "star3": 3,
            //     "star4": 9,
            //     "star5": 15
            // },
            "streamer": false,
            "seguindo": [4, 5],
            "wallpaper": "./profile/General/wp-spiderverse.svg",
            "bio": "25 anos - SP. Designer nas horas vagas",
            "review_list":[1, 2, 3],
            "fav_games":[2, 6]
        }
      ]

      constructor() { }
  }