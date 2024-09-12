const express = require('express');
const router = express.Router();
const Game = require('../models/Games'); 
// Rota para obter todos os jogos
router.get('/', async (req, res) => {
    try {
        const games = await Game.find();
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Rota para obter um jogo específico pelo ID
router.get('/:id', getGame, (req, res) => {
    res.json(res.game);
});

// Rota para criar um novo jogo
router.post('/', async (req, res) => {
    const game = new Game({
        id: req.body.id,
        name: req.body.name,
        picture: req.body.picture,
        release_date: req.body.release_date,
        summary: req.body.summary,
        producer: req.body.producer,
        genres: req.body.genres
    });
    try {
        const newGame = await game.save();
        res.status(201).json(newGame);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Rota para atualizar um jogo existente
router.patch('/:id', getGame, async (req, res) => {
    if (req.body.name != null) {
        res.game.name = req.body.name;
    }
    if (req.body.picture != null) {
        res.game.picture = req.body.picture;
    }
    if (req.body.release_date != null) {
        res.game.release_date = req.body.release_date;
    }
    if (req.body.summary != null) {
        res.game.summary = req.body.summary;
    }
    if (req.body.producer != null) {
        res.game.producer = req.body.producer;
    }
    if (req.body.genres != null) {
        res.game.genres = req.body.genres;
    }
    try {
        const updatedGame = await res.game.save();
        res.json(updatedGame);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Rota para deletar um jogo
router.delete('/:id', getGame, async (req, res) => {
    try {
        await res.game.remove();
        res.json({ message: 'Jogo removido com sucesso' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware para obter jogo pelo ID
async function getGame(req, res, next) {
    let game;
    try {
        game = await Game.findById(req.params.id);
        if (game == null) {
            return res.status(404).json({ message: 'Jogo não encontrado' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.game = game;
    next();
}

module.exports = router;
