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


// Rota para criar um novo perfil
router.post('/profiles', async (req, res) => {
  try {
    const nextId = await Profile.getNextId();
    const newProfile = new Profile({ ...req.body, id: nextId });
    await newProfile.save();
    res.status(201).send(newProfile);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao criar perfil', error });
  }
});

// Rota para obter um perfil pelo ID
router.get('/:id', async (req, res) => {
  const profileId = parseInt(req.params.id);
  try {
    const profile = await Profile.findOne({ id: profileId });
    if (!profile) {
      return res.status(404).json({ message: 'Perfil não encontrado' });
    }
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Rota para obter seguidores de um usuário específico
router.get('/followers/:id', async (req, res) => {
  try {
    const profileId = parseInt(req.params.id);
    const profiles = await Profile.find({ seguindo: profileId });  // Ajuste conforme sua estrutura de dados
    res.json(profiles);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar seguidores', error });
  }
});

// Atualiza um campo específico de um perfil
router.patch('/:userId', async (req, res) => {
  const { userId } = req.params; // O ID que você vai usar para buscar o perfil
  const { field, value } = req.body; // Campo e valor para atualizar

  try {
    // Atualiza o perfil pelo campo numérico `id`
    const updatedProfile = await Profile.findOneAndUpdate(
      { id: userId }, // Filtra pelo campo numérico `id`
      { [field]: value }, // Atualiza o campo dinâmico
      { new: true } // Retorna o documento atualizado
    );

    if (!updatedProfile) {
      return res.status(404).send({ message: 'Perfil não encontrado' });
    }
    res.send(updatedProfile);
  } catch (error) {
    console.error(error);
    res.status(400).send({ message: 'Erro ao atualizar o perfil', error });
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
