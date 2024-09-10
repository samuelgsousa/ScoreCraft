import { Injectable } from '@angular/core';
import { Profile } from './profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  protected userList: Profile[] =[
    {
      id: 1,
      nome: "Narutinho 123",
      foto_perfil: "./profile/General/profile-picture-naruto.jpg",
      fav_gen: ["Terror", "Ação", "Aventura"],
      streamer: true,
      seguindo: [2],
      wallpaper: "./profile/General/wp-mortal-kombat.svg",
      bio: "Oi, eu sou o Fabio. Gosto de animes e faço umas livezinhas de vez em quando :3",
      fav_games: [6, 7, 8, 9],
      email: 'narutinho123@gmail.com',
      senha: 'secretDefaultPassword'
    },
    {
      id: 2,
      nome: "Valdemar Oliveira da Silva",
      foto_perfil: "./profile/General/profile-picture-miranha.jpg",
      fav_gen: ["FPS", "RPG", "Sandbox"],
      streamer: false,
      seguindo: [1],
      wallpaper: "./profile/General/wp-spiderverse.svg",
      bio: "25 anos - SP. Designer nas horas vagas",
      fav_games: [1, 10, 11, 12],
      email: 'miranha@gmail.com',
      senha: 'secretDefaultPassword'
    },
    {
      id: 3,
      nome: "Ana_Gamer77",
      foto_perfil: './petcons/blueberry_by_hyanna_natsu_daaq3p4.png',
      fav_gen: ["Ação", "Plataforma", "Estratégia"],
      streamer: true,
      seguindo: [1, 5],
      wallpaper: null,
      bio: "Amante de jogos indie e adoro streams de speedruns.",
      fav_games: [5, 14, 18],
      email: null,
      senha: null
    },
    {
      id: 4,
      nome: "PedroKillerXD",
      foto_perfil: './petcons/bonbonbear_by_hyanna_natsu_dacb1le.png',
      fav_gen: ["FPS", "Battle Royale", "MOBA"],
      streamer: false,
      seguindo: [2, 3],
      wallpaper: null,
      bio: "Jogador hardcore de FPS, sempre em busca do top rank.",
      fav_games: [2, 7, 16],
      email: null,
      senha: null
    },
    {
      id: 5,
      nome: "Luna_Fox",
      foto_perfil: './petcons/chipster_by_hyanna_natsu_dacb1lb.png',
      fav_gen: ["RPG", "Aventura", "Simulação", "Survival"],
      streamer: true,
      seguindo: [3, 4, 7],
      wallpaper: null,
      bio: "Curto explorar mundos abertos e construir bases em jogos de sobrevivência.",
      fav_games: [8, 12, 15],
      email: null,
      senha: null
    },
    {
      id: 6,
      nome: "GhostHunter99",
      foto_perfil: './petcons/cottoncandypaca_by_hyanna_natsu_daaq3os.png',
      fav_gen: ["Terror", "Ação", "Survival"],
      streamer: false,
      seguindo: [1, 9, 12],
      wallpaper: null,
      bio: "Apaixonado por sustos e games de terror.",
      fav_games: [3, 13, 19, 25],
      email: null,
      senha: null
    },
    {
      id: 7,
      nome: "MasterChefGame",
      foto_perfil: './petcons/hotdog_by_hyanna_natsu_daaq3oe.png',
      fav_gen: ["Simulação", "RPG", "Plataforma"],
      streamer: true,
      seguindo: [2, 6],
      wallpaper: null,
      bio: "Adoro sim games e criar meus próprios mundos virtuais.",
      fav_games: [11, 23, 24],
      email: null,
      senha: null
    },
    {
      id: 8,
      nome: "DarkSoulZ",
      foto_perfil: './petcons/pigpizza_by_hyanna_natsu_daaq3nz.png',
      fav_gen: ["RPG", "Ação", "Aventura"],
      streamer: false,
      seguindo: [1, 4, 5],
      wallpaper: null,
      bio: "Sou fanático por RPGs difíceis e intensos.",
      fav_games: [4, 9, 17],
      email: null,
      senha: null
    },
    {
      id: 9,
      nome: "SpeedrunnerX",
      foto_perfil: './petcons/popcorn_by_hyanna_natsu_dacb1l4.png',
      fav_gen: ["Plataforma", "Corrida", "Arcade"],
      streamer: true,
      seguindo: [3, 8],
      wallpaper: null,
      bio: "Sempre em busca do recorde mundial nas minhas runs!",
      fav_games: [6, 20, 21],
      email: null,
      senha: null
    },
    {
      id: 10,
      nome: "NerdLord",
      foto_perfil: './petcons/sushipanda_by_hyanna_natsu_daaq3nr.png',
      fav_gen: ["Estratégia", "Puzzle", "Aventura"],
      streamer: false,
      seguindo: [1, 7],
      wallpaper: null,
      bio: "Adoro jogos que fazem pensar e desafiam a mente.",
      fav_games: [1, 22, 25],
      email: null,
      senha: null
    },
    {
      id: 11,
      nome: "ArcadeMaster",
      foto_perfil: './petcons/watermelonparrot_by_hyanna_natsu_daaq3ne.png',
      fav_gen: ["Arcade", "Plataforma", "Luta"],
      streamer: true,
      seguindo: [2, 10, 15],
      wallpaper: null,
      bio: "Velha guarda dos arcades, amo jogos retrô.",
      fav_games: [2, 5, 13],
      email: null,
      senha: null
    },
    {
      id: 12,
      nome: "PixelHunter",
      foto_perfil: './petcons/chipster_by_hyanna_natsu_dacb1lb.png',
      fav_gen: ["Aventura", "Simulação", "Puzzle"],
      streamer: false,
      seguindo: [6, 11],
      wallpaper: null,
      bio: "Adoro pixel art e games com boas histórias.",
      fav_games: [9, 14, 17],
      email: null,
      senha: null
    },
    {
      id: 13,
      nome: "DragonSlayerBR",
      foto_perfil: './petcons/pigpizza_by_hyanna_natsu_daaq3nz.png',
      fav_gen: ["RPG", "Ação", "Fantasia"],
      streamer: true,
      seguindo: [1, 8, 12],
      wallpaper: null,
      bio: "Sempre na busca por derrotar dragões em qualquer jogo!",
      fav_games: [3, 8, 10],
      email: null,
      senha: null
    },
    {
      id: 14,
      nome: "LaraCroftFan",
      foto_perfil: './petcons/blueberry_by_hyanna_natsu_daaq3p4.png',
      fav_gen: ["Ação", "Aventura", "Exploração"],
      streamer: false,
      seguindo: [1, 13],
      wallpaper: null,
      bio: "Fã de jogos de exploração e arqueologia.",
      fav_games: [15, 16, 23],
      email: null,
      senha: null
    },
    {
      id: 15,
      nome: "PuzzleManiac",
      foto_perfil: './petcons/watermelonparrot_by_hyanna_natsu_daaq3ne.png',
      fav_gen: ["Puzzle", "Estratégia", "RPG"],
      streamer: false,
      seguindo: [5, 10],
      wallpaper: null,
      bio: "Apaixonado por resolver quebra-cabeças em jogos de estratégia.",
      fav_games: [4, 18, 25],
      email: null,
      senha: null
    }
  ]
  

  async getAllUsers(): Promise<Profile[]>{
    return new Promise(resolve => resolve(this.userList));
  }

  async getUserById(id: number): Promise<Profile | undefined>{
    return new Promise(resolve => resolve(this.userList[id]))
  }

  async getFollowersById(id: number): Promise<Profile[]>{
    return new Promise(resolve => resolve(this.userList.filter(follower => follower.seguindo?.includes(id))))
    
    
  }

  addProfile(profile: Profile): void{
    this.userList.push(profile)
    console.log(this.userList)
  }
  getNextId(): number{
    const lastProfile = this.userList[this.userList.length - 1];
    return lastProfile ? lastProfile.id + 1 : 1;
  }
    
  }