const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// Rota para realizar o login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const profile = await Profile.findOne({ email });

    if (!profile) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const isMatch = await profile.comparePassword(senha);

    if (isMatch) {
      res.json({ message: 'Login bem-sucedido' });
    } else {
      res.status(401).json({ message: 'Credenciais inválidas' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
