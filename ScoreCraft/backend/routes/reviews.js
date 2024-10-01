const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Review = require('../models/Reviews');

// Rota para obter todas as avaliações com paginação
router.get('/', async (req, res) => {
  try {
      const page = parseInt(req.query.page) || 1; // Página atual, padrão para 1
      const limit = parseInt(req.query.limit) || 10; // Limite de itens por página, padrão para 10
      const skip = (page - 1) * limit; // Cálculo de quantos itens pular

      // Busca as avaliações com base na página e no limite
      const reviews = await Review.find()
          .populate('user_id')
          .populate('game_id')
          .skip(skip) // Pula os primeiros 'skip' itens
          .limit(limit); // Limita o número de resultados

      const totalReviews = await Review.countDocuments(); // Conta o total de avaliações

      res.json({
          totalReviews,
          totalPages: Math.ceil(totalReviews / limit), // Calcula o total de páginas
          currentPage: page,
          reviews,
      });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});



// Rota para criar uma nova avaliação
router.post('/', async (req, res) => {
  const { id, game_id, review_text, rating, user_id} = req.body;
  
  console.log('Dados recebidos no backend:', req.body);
  try {

    const review = new Review({
      id,
      game_id,
      review_text, 
      rating,
      user_id,
    });

    console.log('reviews.js dados recebidos: ' + review)

    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rota para atualizar uma avaliação
router.patch('/:id', async (req, res) => {
  const { review_text, rating } = req.body;

  try {
      // Atualiza a review no banco de dados usando o id da URL
      const updatedReview = await Review.findOneAndUpdate(
          { id: req.params.id }, // Busca pelo campo `id`
          { review_text, rating }, // Atualiza os campos
          { new: true } // Retorna o documento atualizado
      );

      if (!updatedReview) {
          return res.status(404).send({ message: 'Review não encontrada' });
      }

      res.send(updatedReview);
  } catch (error) {
      res.status(400).send({ message: 'Erro ao atualizar a review', error });
  }
});


// Rota para deletar uma avaliação
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Converte o id para número se necessário (caso esteja armazenado como string)
    const deletedReview = await Review.findOneAndDelete({ id: id });

    if (deletedReview) {
      res.json({ message: 'Review deletada com sucesso' });
    } else {
      res.status(404).json({ message: 'Review não encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar a review', error });
  }
});

// Rota para obter uma avaliação específica por ID
router.get('/:id', async (req, res) => {
  try {
    const reviewId = parseInt(req.params.id)
    const review = await Review.findOne({id: reviewId})
    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint para obter reviews filtradas por user_id
router.get('/user/:id', async (req, res) => {
  try {
    // Extrair o user_id da URL
    const userId = parseInt(req.params.id);

    // Validar o user_id
    if (!userId) {
      return res.status(400).json({ message: 'user_id é necessário' });
    }
    // Consultar o banco de dados para encontrar reviews com o user_id fornecido
    const reviews = await Review.find({ user_id: userId });

    // Retornar as reviews filtradas
    res.json(reviews);
  } catch (error) {
    console.error('Erro ao buscar reviews:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

router.get('/reviews/last', async (req, res) => {
  try {
    const lastReview = await Review.findOne().sort({ id: -1 }); // Ordena pelo campo 'id' em ordem decrescente e pega o primeiro
    const nextId = lastReview ? lastReview.id + 1 : 1; // Se existir uma review, pega o maior id, senão começa de 1
    res.json(nextId);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Rota para obter avaliações por game_id
router.get('/game/:gameId', async (req, res) => {
  const gameId = parseInt(req.params.gameId);
  try {
      const reviews = await Review.find({ game_id: gameId });
      res.json(reviews);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

module.exports = router;
