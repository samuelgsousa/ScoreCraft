const express = require('express');
const router = express.Router();
// const Game = require('../models/Games'); 
const axios = require('axios'); // Importar axios para fazer requisições HTTP

const IGDB_API_URL = 'https://api.igdb.com/v4/games'; // URL da API
const IGDB_API_KEY = 'yqfxo07jpz3d01hcccr0e6ffqcce2l'; //chave da IGDB
const Qlimit = 20;

const igdbAuth = (req, res, next) => {
    req.headers['Client-ID'] = 'h13prjmj1dgeq891fwaxyn3ydom2t6'; // Client ID
    req.headers['Authorization'] = `Bearer ${IGDB_API_KEY}`; // Bearer token
    next();
};

// Rota para obter todos os jogos com as capas

router.post('/popularidade', igdbAuth, async (req, res) => {
    try {
        // Consulta para obter os jogos pela popularidade
        const query = `fields game_id,value,popularity_type; sort value desc; limit ${Qlimit};`;

        // Fazendo a requisição à API do IGDB para popularidade
        const response = await axios.post('https://api.igdb.com/v4/popularity_primitives', query, {
            headers: {
                'Client-ID': req.headers['Client-ID'],
                'Authorization': req.headers['Authorization'],
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        if (response.data.length === 0) {
            return res.status(404).send({ message: 'No popular games found' });
        }

        // Extrai os IDs dos jogos populares
        const gameIds = response.data.map(game => game.game_id);
        console.log("Game IDs:", gameIds); // Verifica se os IDs estão corretos

        // Busca os detalhes dos jogos com base nos IDs populares
        const gameQuery = `fields *; where id = (${gameIds.join(',')}); limit ${Qlimit};`;
        console.log("Game Query:", gameQuery); // Verifica a consulta gerada
        
        const gamesResponse = await axios.post(IGDB_API_URL, gameQuery, {
            headers: {
                'Client-ID': req.headers['Client-ID'],
                'Authorization': req.headers['Authorization'],
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        const coverIds = gamesResponse.data.map(game => game.cover).filter(Boolean);

        if (coverIds.length > 0) {
            const coverResponse = await axios.post('https://api.igdb.com/v4/covers', 
                `fields url; where id = (${coverIds.join(',')});`, 
                {
                    headers: {
                        'Client-ID': req.headers['Client-ID'],
                        'Authorization': req.headers['Authorization'],
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                }
            );

            const covers = coverResponse.data;

            // Associa as URLs das capas aos jogos e substitui 't_thumb' por 't_cover_big'
            gamesResponse.data.forEach(game => {
                const cover = covers.find(c => c.id === game.cover);
                if (cover) {
                    game.cover_url = cover.url.replace('t_thumb', 't_cover_big'); // Modifica a URL
                }
            });
        }

        // Retorna os jogos populares com as URLs das capas ajustadas
        console.log("backend games.js resposta: " + gamesResponse.data)
        res.json(gamesResponse.data);
    } catch (error) {
        console.error("Error fetching popular games:", error.message);
        res.status(500).send({ message: 'Server error', error: error.message });
    }
});



router.post('/:id', igdbAuth, async (req, res) => {
    try {
        const gameId = req.params.id;
        
        // Formatação da consulta
        const query = `fields *; where id = ${gameId};`;
        
        // Fazendo a requisição à API do IGDB para buscar o jogo
        const response = await axios.post(`${IGDB_API_URL}`, query, {
            headers: {
                'Client-ID': req.headers['Client-ID'],
                'Authorization': req.headers['Authorization'],
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // Verifica se o jogo foi encontrado
        if (response.data.length === 0) {
            return res.status(404).send({ message: 'Game not found' });
        }

        const game = response.data[0];

        // Se o jogo possui um ID de capa, busque a URL da capa
        if (game.cover) {
            const coverResponse = await axios.post('https://api.igdb.com/v4/covers', 
                `fields url; where id = ${game.cover};`, 
                {
                    headers: {
                        'Client-ID': req.headers['Client-ID'],
                        'Authorization': req.headers['Authorization'],
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                }
            );

            // Verifica se a resposta da capa possui dados
            if (coverResponse.data.length > 0) {
                const cover = coverResponse.data[0];
                game.cover_url = cover.url.replace('t_thumb', 't_cover_big'); // Modifica a URL
            }
        }

        // Retorna os dados do jogo com a URL da capa, se disponível
        res.json(game);
    } catch (error) {
        console.error("Error fetching game data:", error.message); // Log para depuração
        res.status(500).send({ message: 'Server error', error: error.message });
    }
});



module.exports = router;
