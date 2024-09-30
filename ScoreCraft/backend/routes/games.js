const express = require('express');
const router = express.Router();
// const Game = require('../models/Games'); 
const axios = require('axios'); // Importar axios para fazer requisições HTTP

const IGDB_API_URL = 'https://api.igdb.com/v4/games'; // URL da API
const IGDB_API_KEY = 'yqfxo07jpz3d01hcccr0e6ffqcce2l'; //chave da IGDB

const igdbAuth = (req, res, next) => {
    req.headers['Client-ID'] = 'h13prjmj1dgeq891fwaxyn3ydom2t6'; // Client ID
    req.headers['Authorization'] = `Bearer ${IGDB_API_KEY}`; // Bearer token
    next();
};



// Rota para obter todos os jogos com as capas

router.post('/popularidade', igdbAuth, async (req, res) => {
    try {
        // Consulta para obter os jogos pela popularidade
        const query = 'fields game_id,value,popularity_type; sort value desc; limit 10;';
        
        // Fazendo a requisição à API do IGDB
        const response = await axios.post('https://api.igdb.com/v4/popularity_primitives', query, {
            headers: {
                'Client-ID': req.headers['Client-ID'],
                'Authorization': req.headers['Authorization'],
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        // Verifica se os jogos foram encontrados
        if (response.data.length === 0) {
            return res.status(404).send({ message: 'No popular games found' });
        }

        // Retorna os dados dos jogos populares
        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching popular games:", error.message); // Log para depuração
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
                    }
                }
            );

            // Se a capa foi encontrada, adicione a URL ao jogo
            if (coverResponse.data.length > 0) {
                game.cover_url = coverResponse.data[0].url; // Adiciona a URL da capa ao objeto do jogo
            } else {
                game.cover_url = null; // Se não encontrou a capa, pode definir como null
            }
        }

        // Retorna os dados do jogo com a URL da capa, se disponível
        res.json(game);
    } catch (error) {
        console.error("Error fetching game data:", error.message); // Log para depuração
        res.status(500).send({ message: 'Server error', error: error.message });
    }
});





// // Rota para criar um novo jogo
// router.post('/', async (req, res) => {
//     const game = new Game({
//         id: req.body.id,
//         name: req.body.name,
//         picture: req.body.picture,
//         release_date: req.body.release_date,
//         summary: req.body.summary,
//         producer: req.body.producer,
//         genres: req.body.genres
//     });
//     try {
//         const newGame = await game.save();
//         res.status(201).json(newGame);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // Rota para atualizar um jogo existente
// router.patch('/:id', async (req, res) => {
//     if (req.body.name != null) {
//         res.game.name = req.body.name;
//     }
//     if (req.body.picture != null) {
//         res.game.picture = req.body.picture;
//     }
//     if (req.body.release_date != null) {
//         res.game.release_date = req.body.release_date;
//     }
//     if (req.body.summary != null) {
//         res.game.summary = req.body.summary;
//     }
//     if (req.body.producer != null) {
//         res.game.producer = req.body.producer;
//     }
//     if (req.body.genres != null) {
//         res.game.genres = req.body.genres;
//     }
//     try {
//         const updatedGame = await res.game.save();
//         res.json(updatedGame);
//     } catch (err) {
//         res.status(400).json({ message: err.message });
//     }
// });

// // Rota para deletar um jogo
// router.delete('/:id', async (req, res) => {
//     try {
//         await res.game.remove();
//         res.json({ message: 'Jogo removido com sucesso' });
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Rota para obter um jogo específico pelo ID
// router.get('/:id', async (req, res) => {
//     try {
//         const gameId = parseInt(req.params.id); // Converter para número se necessário
//         const game = await Game.findOne({ id: gameId });
//         if (!game) {
//             return res.status(404).send({ message: 'Game not found' });
//         }
//         res.send(game);
//     } catch (error) {
//         res.status(500).send({ message: 'Server error', error });
//     }
// });


module.exports = router;
