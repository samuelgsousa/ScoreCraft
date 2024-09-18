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

// Rota para obter id do último perfil
router.get('/profiles/last', async (req, res) => {
  try {
    const lastProfile = await Profile.findOne().sort({ id: -1 }); // Ordena pelo campo 'id' em ordem decrescente e pega o maior
    const nextId = lastProfile ? lastProfile.id + 1 : 1; // Se existir um perfil, pega o maior id, senão começa de 1
    res.json(nextId);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Rota para criar um novo perfil
router.post('/', async (req, res) => {
  const profile = new Profile({
    id: req.body.id,
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    foto_perfil: req.body.foto_perfil,
    wallpaper: req.body.wallpaper,
    bio: req.body.bio
  });
  
  console.log('Dados recebidos no backend (profile.js):', req.body);
  try {
    const newProfile = await profile.save();
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(400).json({ message: err.message });
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

// Atualiza o perfil
router.patch('/:userId', async (req, res) => {
  const { userId } = req.params; // O ID para buscar o perfil
  const updatedProfileData = req.body; // Objeto contendo todos os dados atualizados do perfil

  try {
    // Atualiza todos os campos do perfil
    const updatedProfile = await Profile.findOneAndUpdate(
      { id: userId }, // Filtra pelo campo numérico `id`
      updatedProfileData, // Atualiza todos os campos com os dados recebidos
      { new: true } // Retorna o documento atualizado
      
    );
    console.log(updatedProfile)

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
