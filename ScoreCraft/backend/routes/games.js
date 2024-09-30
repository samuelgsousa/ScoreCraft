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

router.post('/', igdbAuth, async (req, res) => {
    try {
        // Busca todos os campos dos jogos, incluindo o campo cover (que contém o ID da capa)
        const response = await axios.post(IGDB_API_URL, 'fields *; limit 25;', {
            headers: {
                'Client-ID': req.headers['Client-ID'],
                'Authorization': req.headers['Authorization']
            }
        });

        const games = response.data;

        // Coleta os IDs das capas (cover) para fazer uma segunda requisição
        const coverIds = games.map(game => game.cover).filter(Boolean); // Filtra jogos que têm capa

        if (coverIds.length > 0) {
            // Requisição para obter apenas as URLs das capas
            const coverResponse = await axios.post('https://api.igdb.com/v4/covers', 
                `fields url; where id = (${coverIds.join(',')});`, 
                {
                    headers: {
                        'Client-ID': req.headers['Client-ID'],
                        'Authorization': req.headers['Authorization']
                    }
                }
            );

            const covers = coverResponse.data;

            // Associa as URLs das capas aos jogos correspondentes
            games.forEach(game => {
                const cover = covers.find(c => c.id === game.cover);
                if (cover) {
                    game.cover_url = cover.url; // Adiciona a URL da capa ao objeto do jogo
                }
            });
        }

        // Retorna os jogos com as URLs das capas adicionadas
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




router.post('/:id', igdbAuth, async (req, res) => {
    try {
        const gameId = req.params.id;
        console.log(`Fetching game with ID: ${gameId}`); // Log do ID do jogo
        const response = await axios.post(`${IGDB_API_URL}`, `fields *; where id = ${gameId};`, {
            headers: req.headers
        });
        
        if (response.data.length === 0) {
            return res.status(404).send({ message: 'Game not found' });
        }
        res.json(response.data[0]);
    } catch (error) {
        console.error('Error fetching game:', error); // Log do erro
        res.status(500).send({ message: 'Server error', error });
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
