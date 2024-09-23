const express = require('express');
const router = express.Router();
const { generateResetToken } = require('../services/token.service'); // Importa sua função de gerar token

router.post('/', async (req, res) => {
    const { userId } = req.body; // Suponha que você esteja recebendo o userId no corpo da requisição

    try {
        const token = generateResetToken(userId);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao gerar o token.' });
    }
});

module.exports = router;
