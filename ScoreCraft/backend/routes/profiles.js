const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// Rota para obter todos os perfis
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para obter um perfil pelo ID
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (profile == null) {
      return res.status(404).json({ message: 'Perfil não encontrado' });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para criar um novo perfil
router.post('/', async (req, res) => {
  const profile = new Profile({
    name: req.body.name,
    // adicione outros campos conforme necessário
  });
  try {
    const newProfile = await profile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para atualizar um perfil
router.put('/:id', async (req, res) => {
  try {
    const updatedProfile = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedProfile == null) {
      return res.status(404).json({ message: 'Perfil não encontrado' });
    }
    res.json(updatedProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Rota para deletar um perfil
router.delete('/:id', async (req, res) => {
  try {
    const deletedProfile = await Profile.findByIdAndDelete(req.params.id);
    if (deletedProfile == null) {
      return res.status(404).json({ message: 'Perfil não encontrado' });
    }
    res.json({ message: 'Perfil deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
