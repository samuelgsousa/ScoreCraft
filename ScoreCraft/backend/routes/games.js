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



// Rota para obter todos os jogos
router.get('/', igdbAuth, async (req, res) => {
    try {
        const response = await axios.post(IGDB_API_URL, 'fields *; limit 100;', {
            headers: req.headers
        });
        res.json(response.data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', igdbAuth, async (req, res) => {
    try {
        const gameId = req.params.id;
        const response = await axios.post(`${IGDB_API_URL}`, `fields *; where id = ${gameId};`, {
            headers: req.headers
        });
        if (response.data.length === 0) {
            return res.status(404).send({ message: 'Game not found' });
        }
        res.json(response.data[0]);
    } catch (error) {
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
