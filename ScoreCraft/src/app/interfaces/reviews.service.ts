import { Injectable } from '@angular/core';
import { Reviews } from './reviews';

@Injectable({
    providedIn: 'root'
  })

export class ReviewsService{
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
            game_id: 10, // It Takes Two
            played_data: new Date('2024-03-30'),
            rating: 5,
            review_text: 'It Takes Two é uma verdadeira joia dos jogos cooperativos, uma experiência que vai além de simplesmente jogar e se transforma em uma jornada emocional e divertida para dois jogadores. Desde o momento em que você e seu parceiro começam esta aventura, é impossível não se envolver com a história cativante e os desafios inteligentes que o jogo oferece.'
        },
        {
            id: 5,
            user_id: 2,
            game_id: 7, // Bioshock
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
            game_id: 11, // Cyberpunk
            played_data: new Date('2020-12-13'),
            rating: 3,
            review_text: 'Em Cyberpunk 2077, você é transportado para Night City, um futuro distópico onde a tecnologia e a violência se misturam em uma paisagem urbana cheia de oportunidades e perigos. Com uma história rica em escolhas morais e consequências, você molda o destino do protagonista, V. O mundo aberto é vasto e repleto de atividades, desde missões emocionantes até personalização profunda de personagens. Apesar dos problemas de lançamento, o potencial deste jogo para criar experiências imersivas e emocionantes é inegável.'
        },
        {
            id: 8,
            user_id: 2,
            game_id: 5, // God of War
            played_data: new Date('2019-02-14'),
            rating: 4,
            review_text: 'God of War 2018 reinventa a franquia, levando Kratos para as terras nórdicas em uma jornada emocional e épica. O jogo combina combate visceral e desafiador com uma narrativa envolvente sobre paternidade e redenção. A relação entre Kratos e seu filho, Atreus, é o coração da história, trazendo momentos de ternura e intensidade. Além disso, os visuais deslumbrantes e a trilha sonora marcante elevam a experiência a novos patamares.'
        },
        {
            id: 9,
            user_id: 2,
            game_id: 12, // Stray
            played_data: new Date('2023-09-14'),
            rating: 5,
            review_text: 'Stray é um jogo único que coloca você na pele de um gato perdido em uma cidade futurista habitada por robôs. Este jogo indie promete uma experiência diferente de tudo que já se viu, com uma atmosfera intrigante e um mundo aberto cheio de mistérios para explorar. A jogabilidade se concentra em resolver quebra-cabeças e interagir com o ambiente de uma maneira felinamente única. Com visuais deslumbrantes e uma premissa intrigante, Stray é uma jornada promissora que promete cativar os jogadores com sua originalidade.'
        }
    ];
    
}