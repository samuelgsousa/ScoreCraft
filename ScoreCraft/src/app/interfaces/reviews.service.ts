import { Injectable } from '@angular/core';
import { Reviews } from './reviews';
import {HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })

export class ReviewsService{

    private apiUrl = 'http://localhost:3000/api/profiles';
    constructor(private http: HttpClient) {}
    
    protected reviewList: Reviews[] = [
        {
            id: 1,
            user_id: 1,
            game_id: 6, // Castlevania
            played_data: new Date('2019-09-23'),
            rating: 4,
            review_text: 'Esse jogo é uma verdadeira aventura! Logo de cara, fui fisgado pela atmosfera sombria e pela trilha sonora épica. Parecia que eu estava mesmo dentro do castelo, pronto para enfrentar vampiros e demônios. O que mais me impressionou foi a liberdade de exploração. Tipo, não é só seguir um caminho, é sair explorando cada canto do castelo, descobrindo segredos e lutando contra monstros pelo caminho. Foi massa poder escolher minhas armas e magias, criando um estilo de luta que combina comigo.'
        },
        {
            id: 2,
            user_id: 1,
            game_id: 9, // Naruto Ultimate Ninja
            played_data: new Date('2015-05-15'),
            rating: 4,
            review_text: 'Esse jogo é uma jornada emocionante através do mundo ninja, com todos os meus personagens favoritos. Desde a vila de Konoha até as terras mais distantes, é uma viagem cheia de desafios e emoções. Ah, e não posso esquecer das cutscenes. São como cenas diretamente do anime, e cada momento é repleto de emoção e adrenalina.'
        },
        {
            id: 3,
            user_id: 1,
            game_id: 8, // Marvel vs Capcom
            played_data: new Date('2011-02-03'),
            rating: 3,
            review_text: 'Marvel vs Capcom é um verdadeiro festim para os fãs de jogos de luta e dos universos dos quadrinhos. Desde o momento em que você escolhe seu time de heróis e vilões favoritos, até o momento em que desfere combos épicos, este jogo é uma montanha-russa de ação e diversão. Uma das coisas que mais gostei foi o cuidado com os detalhes. Cada personagem tem movimentos e diálogos que são fiéis aos seus respectivos universos. É como se você estivesse controlando seus heróis favoritos diretamente de uma HQ ou jogo da Capcom.'
        },
        {
            id: 4,
            user_id: 1,
            game_id: 7, // It Takes Two
            played_data: new Date('2024-03-30'),
            rating: 5,
            review_text: 'It Takes Two é uma verdadeira joia dos jogos cooperativos, uma experiência que vai além de simplesmente jogar e se transforma em uma jornada emocional e divertida para dois jogadores. Desde o momento em que você e seu parceiro começam esta aventura, é impossível não se envolver com a história cativante e os desafios inteligentes que o jogo oferece.'
        },
        {
            id: 5,
            user_id: 2,
            game_id: 12, // Bioshock
            played_data: new Date('2018-06-16'),
            rating: 4,
            review_text: 'Bioshock é uma obra-prima do gênero de jogos de tiro em primeira pessoa, mas vai além disso. Com uma narrativa envolvente que explora temas como livre-arbítrio e utopia distorcida, você se vê imerso em Rapture, uma cidade submarina cheia de mistérios e perigos. Os visuais art déco, a jogabilidade dinâmica e o uso criativo de plasmídeos tornam cada momento de Bioshock uma experiência única e arrebatadora.'
        },
        {
            id: 6,
            user_id: 2,
            game_id: 1, // Bloodborne
            played_data: new Date('2020-08-25'),
            rating: 5,
            review_text: 'Bloodborne é um jogo que desafia e recompensa os jogadores de maneiras igualmente intensas. Dos mesmos criadores de Dark Souls, este jogo de ação e RPG transporta você para um mundo gótico e sombrio, cheio de criaturas terríveis e cenários deslumbrantes. A jogabilidade é implacável, exigindo precisão e estratégia em cada combate. Com uma atmosfera única e uma trama envolvente, Bloodborne é um verdadeiro teste de habilidade e coragem.'
        },
        {
            id: 7,
            user_id: 2,
            game_id: 13, // Cyberpunk
            played_data: new Date('2020-12-13'),
            rating: 3,
            review_text: 'Em Cyberpunk 2077, você é transportado para Night City, um futuro distópico onde a tecnologia e a violência se misturam em uma paisagem urbana cheia de oportunidades e perigos. Com uma história rica em escolhas morais e consequências, você molda o destino do protagonista, V. O mundo aberto é vasto e repleto de atividades, desde missões emocionantes até personalização profunda de personagens. Apesar dos problemas de lançamento, o potencial deste jogo para criar experiências imersivas e emocionantes é inegável.'
        },
        {
            id: 8,
            user_id: 2,
            game_id: 11, // God of War
            played_data: new Date('2019-02-14'),
            rating: 4,
            review_text: 'God of War 2018 reinventa a franquia, levando Kratos para as terras nórdicas em uma jornada emocional e épica. O jogo combina combate visceral e desafiador com uma narrativa envolvente sobre paternidade e redenção. A relação entre Kratos e seu filho, Atreus, é o coração da história, trazendo momentos de ternura e intensidade. Além disso, os visuais deslumbrantes e a trilha sonora marcante elevam a experiência a novos patamares.'
        },
        {
            id: 9,
            user_id: 2,
            game_id: 10, // Stray
            played_data: new Date('2023-09-14'),
            rating: 5,
            review_text: 'Stray é um jogo único que coloca você na pele de um gato perdido em uma cidade futurista habitada por robôs. Este jogo indie promete uma experiência diferente de tudo que já se viu, com uma atmosfera intrigante e um mundo aberto cheio de mistérios para explorar. A jogabilidade se concentra em resolver quebra-cabeças e interagir com o ambiente de uma maneira felinamente única. Com visuais deslumbrantes e uma premissa intrigante, Stray é uma jornada promissora que promete cativar os jogadores com sua originalidade.'
        },
        {
            id: 10,
            user_id: 3,
            game_id: 2, // Lies of P
            played_data: new Date('2023-10-10'),
            rating: 5,
            review_text: 'Lies of P é uma verdadeira obra-prima dos jogos soulslike. O mundo sombrio e as mecânicas desafiadoras fazem você se sentir constantemente imerso em uma luta épica. Cada combate exige precisão e estratégia, e a narrativa inspirada na história de Pinóquio é simplesmente fascinante. A sensação de progresso e a dificuldade crescente mantêm o jogo sempre empolgante e desafiador.'
        },
        {
            id: 11,
            user_id: 3,
            game_id: 4, // Horizon Forbidden West
            played_data: new Date('2023-08-22'),
            rating: 4,
            review_text: 'Horizon Forbidden West é uma sequência digna que expande o universo de Aloy de forma incrível. A beleza visual do jogo é impressionante e a história continua a ser cativante. A jogabilidade é fluida e os novos elementos introduzidos, como as mecânicas de combate e exploração, tornam o jogo ainda mais envolvente.'
        },
        {
            id: 12,
            user_id: 4,
            game_id: 5, // Stardew Valley
            played_data: new Date('2023-07-10'),
            rating: 4,
            review_text: 'Stardew Valley é uma experiência encantadora que oferece uma pausa do ritmo frenético dos jogos modernos. A construção de sua própria fazenda e a interação com os moradores da cidade criam uma sensação de comunidade e realização. A simplicidade do jogo é seu maior charme, e é fácil perder horas explorando e personalizando sua vida no campo.'
        },
        {
            id: 13,
            user_id: 4,
            game_id: 15, // The Legend of Zelda: Breath of the Wild
            played_data: new Date('2023-09-05'),
            rating: 5,
            review_text: 'Breath of the Wild redefine o conceito de mundo aberto. A liberdade que você tem para explorar e a beleza do mundo de Hyrule são de tirar o fôlego. Cada canto do mapa oferece algo novo para descobrir, e o sistema de física inovador torna cada interação única. Sem dúvida, um dos melhores jogos da última década.'
        },
        {
            id: 14,
            user_id: 4,
            game_id: 7, // It Takes Two
            played_data: new Date('2023-06-01'),
            rating: 5,
            review_text: 'It Takes Two é uma aventura cooperativa brilhante que mistura história e gameplay de forma magistral. Cada nível traz novas mecânicas e desafios que exigem colaboração e criatividade. A narrativa é envolvente e os personagens são cativantes. É uma experiência obrigatória para quem gosta de jogos cooperativos.'
        },
        {
            id: 15,
            user_id: 5,
            game_id: 13, // Cyberpunk 2077
            played_data: new Date('2023-08-30'),
            rating: 3,
            review_text: 'Cyberpunk 2077 tem um mundo aberto incrível e uma história interessante, mas foi prejudicado por vários problemas técnicos no lançamento. Apesar das atualizações que melhoraram a situação, ainda há falhas que podem tirar o jogador da imersão. A experiência é boa, mas não tão fluida quanto se esperava inicialmente.'
        },
        {
            id: 16,
            user_id: 5,
            game_id: 12, // Bioshock
            played_data: new Date('2023-08-15'),
            rating: 4,
            review_text: 'Bioshock continua a ser um dos melhores exemplos de um FPS com uma narrativa forte. A atmosfera de Rapture é única e a história é profundamente envolvente. O gameplay é sólido e a estética art déco dá um charme adicional ao jogo. É uma experiência inesquecível que vale a pena revisitar.'
        },
        {
            id: 17,
            user_id: 6,
            game_id: 20, // Ghost of Tsushima
            played_data: new Date('2023-07-22'),
            rating: 4,
            review_text: 'Ghost of Tsushima é uma bela homenagem à cultura samurai e ao Japão feudal. A narrativa é envolvente e a jogabilidade é bem equilibrada. A ambientação é rica e detalhada, e os combates são gratificantes. Algumas missões secundárias podem parecer repetitivas, mas isso não diminui o impacto geral do jogo.'
        },
        {
            id: 18,
            user_id: 6,
            game_id: 16, // Red Dead Redemption 2
            played_data: new Date('2023-07-01'),
            rating: 5,
            review_text: 'Red Dead Redemption 2 oferece uma experiência imersiva no Velho Oeste com uma narrativa profunda e um mundo aberto incrivelmente detalhado. Cada aspecto do jogo, desde os gráficos até a história, é de altíssima qualidade. É um dos melhores exemplos de um RPG de mundo aberto e um marco na indústria dos games.'
        },
        {
            id: 19,
            user_id: 7,
            game_id: 17, // Elden Ring
            played_data: new Date('2023-09-01'),
            rating: 5,
            review_text: 'Elden Ring é uma revolução no gênero soulslike, combinando a dificuldade clássica com um mundo aberto expansivo. A liberdade de exploração e a profundidade da narrativa criam uma experiência de jogo única. Cada encontro com chefes e cada área nova é desafiador e recompensador.'
        },
        {
            id: 20,
            user_id: 7,
            game_id: 3, // Minecraft
            played_data: new Date('2023-07-20'),
            rating: 5,
            review_text: 'Minecraft continua a ser um clássico, oferecendo um espaço infinito para criatividade e exploração. A simplicidade do jogo permite que você construa, explore e sobreviva em um mundo gerado aleatoriamente. É uma experiência que pode ser tão tranquila quanto agitada, dependendo do que você decide fazer.'
        },
        {
            id: 21,
            user_id: 8,
            game_id: 18, // Hades
            played_data: new Date('2023-08-10'),
            rating: 4,
            review_text: 'Hades é um excelente exemplo de um roguelike que combina uma narrativa cativante com combates intensos. A jogabilidade é viciante e o desenvolvimento dos personagens é muito bem feito. O design dos níveis e a trilha sonora são de altíssima qualidade. A dificuldade pode ser desafiadora, mas isso só aumenta o prazer de jogar.'
        },
        {
            id: 22,
            user_id: 8,
            game_id: 19, // Sekiro: Shadows Die Twice
            played_data: new Date('2023-06-25'),
            rating: 5,
            review_text: 'Sekiro: Shadows Die Twice é um jogo excepcional que leva o gênero soulslike a um novo nível. A mecânica de combate é única e desafiante, e a ambientação do Japão feudal é deslumbrante. Cada batalha exige habilidade e precisão, e o jogo recompensa os jogadores que se dedicam a aprender suas mecânicas.'
        },
        {
            id: 23,
            user_id: 9,
            game_id: 21, // Super Mario Odyssey
            played_data: new Date('2023-09-10'),
            rating: 5,
            review_text: 'Super Mario Odyssey é um retorno triunfante para a série, oferecendo um mundo aberto vibrante e cheio de criatividade. Os níveis são variados e cheios de segredos para descobrir. A jogabilidade é divertida e inovadora, e a narrativa é encantadora. É um dos melhores jogos de plataforma dos últimos anos.'
        },
        {
            id: 24,
            user_id: 9,
            game_id: 24, // Final Fantasy VII Remake
            played_data: new Date('2023-07-18'),
            rating: 4,
            review_text: 'Final Fantasy VII Remake traz de volta o clássico com gráficos modernos e um sistema de combate aprimorado. A narrativa continua sendo uma das melhores da série, e a nova abordagem para o gameplay é bem-vinda. Algumas mudanças podem dividir os fãs, mas a experiência geral é muito positiva.'
        },
        {
            id: 25,
            user_id: 10,
            game_id: 25, // The Last of Us Part II
            played_data: new Date('2023-08-20'),
            rating: 5,
            review_text: 'The Last of Us Part II é uma jornada emocionalmente intensa e imersiva. A história é profunda e os personagens são complexos e bem desenvolvidos. A jogabilidade é refinada e a narrativa é impactante, oferecendo uma experiência que é tanto brutal quanto emocionante.'
        },
        {
            id: 26,
            user_id: 12,
            game_id: 16,
            rating: 5,
            review_text: "Red Dead Redemption 2 é uma obra-prima do mundo aberto com uma narrativa profunda e um mundo impressionantemente detalhado. Uma experiência inesquecível.",
            played_data: new Date('2023-12-01')
          },
          {
            id: 27,
            user_id: 13,
            game_id: 17,
            rating: 4,
            review_text: "Elden Ring é um desafio emocionante, com um mundo vasto e uma jogabilidade que recompensa a perseverança. Um ótimo RPG para fãs de Soulslike.",
            played_data: new Date('2023-12-05')
          },
          {
            id: 28,
            user_id: 14,
            game_id: 18,
            rating: 5,
            review_text: "Hades oferece uma experiência roguelike envolvente com uma narrativa rica e combates intensos. Um dos melhores jogos de sua categoria.",
            played_data: new Date('2023-12-10')
          },
          {
            id: 29,
            user_id: 15,
            game_id: 19,
            rating: 4,
            review_text: "Sekiro: Shadows Die Twice é um jogo desafiador e gratificante, com uma excelente mecânica de combate e uma história cativante.",
            played_data: new Date('2023-12-15')
          },
          {
            id: 30,
            user_id: 11,
            game_id: 20,
            rating: 5,
            review_text: "Ghost of Tsushima é uma aventura épica com uma bela recriação do Japão feudal. As batalhas são emocionantes e a narrativa é envolvente.",
            played_data: new Date('2023-12-20')
          },
          {
            id: 31,
            user_id: 12,
            game_id: 21,
            rating: 5,
            review_text: "Super Mario Odyssey é uma aventura mágica que captura a essência dos clássicos jogos de Mario com uma jogabilidade inovadora e divertida.",
            played_data: new Date('2023-12-25')
          },
          {
            id: 32,
            user_id: 13,
            game_id: 22,
            rating: 4,
            review_text: "Resident Evil Village é uma sequência emocionante com uma atmosfera tensa e uma história envolvente. Um ótimo título para os fãs de terror.",
            played_data: new Date('2024-01-01')
          },
          {
            id: 33,
            user_id: 14,
            game_id: 23,
            rating: 5,
            review_text: "Doom Eternal é uma explosão de ação com uma jogabilidade frenética e um design de níveis excelente. Uma verdadeira sequência do clássico Doom.",
            played_data: new Date('2024-01-05')
          },
          {
            id: 34,
            user_id: 15,
            game_id: 24,
            rating: 5,
            review_text: "Final Fantasy VII Remake é uma reinvenção espetacular do clássico, com uma história rica e gráficos impressionantes. Um dos melhores RPGs modernos.",
            played_data: new Date('2024-01-10')
          }
    ];
    asyncgetAllReviews(){
        return this.reviewList
    }
    
    getUserReviews(userId: number): Observable<Reviews[]> {
        return this.http.get<Reviews[]>(`${this.apiUrl}/reviews?userId=${userId}`);
      }

    async getReviewById(id: number): Promise<Reviews | undefined>{
        return new Promise(resolve => resolve(this.reviewList[id]))
    }

    async updateUserReview(userId: number, reviewId: number,  rating: number, text: string){
        try{
            const review = await this.getReviewById(reviewId -1)
            if (review){
                review.review_text = text
                review.rating = rating;
    
                console.log(`Review ID ${reviewId -1} atualizada com sucesso. Rating: ${rating}`);
                console.log(this.reviewList)
            } else {
                console.error(`Review com ID ${reviewId -1} não encontrada.`);
              }
        } catch (error) {
            console.error('Erro ao atualizar a review:', error);
          }
    }


}