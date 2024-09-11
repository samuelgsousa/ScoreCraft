const express = require('express');
const router = express.Router();
const Profile = require('../models/profileModel');

// Rota para obter todos os perfis
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para obter um perfil específico por ID
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (profile) {
      res.json(profile);
    } else {
      res.status(404).json({ message: 'Perfil não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para criar um novo perfil
router.post('/', async (req, res) => {
  try {
    const { nome, bio, foto_perfil, fav_gen, streamer, seguindo, wallpaper, fav_games, email, senha } = req.body;
    
    // Cria uma nova instância de Profile
    const newProfile = new Profile({
      nome: nome, 
      bio: bio,
      foto_perfil: foto_perfil,
      fav_gen: fav_gen,
      streamer: streamer,
      seguindo: seguindo,
      wallpaper: wallpaper,
      fav_games: fav_games,
      email: email,
      senha: senha
    });

    // Salva o novo perfil no banco de dados
    const savedProfile = await newProfile.save();
    
    res.status(201).json(savedProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
