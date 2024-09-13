const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Review = require('../models/Reviews');

// Rota para obter todas as avaliações
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('user_id').populate('game_id');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const getNextSequenceValue = async (sequenceName) => {
  const sequenceDocument = await ScoreCraftData.collection('counters').findOneAndUpdate(
    { id: sequenceName },
    { $inc: { sequence_value: 1 } },
    { returnOriginal: false }
  );
  return sequenceDocument.value.sequence_value;
};

// Rota para criar uma nova avaliação
router.post('/', async (req, res) => {
  const { user_id, game_id, rating, review_text } = req.body;



  try {
    const reviewId = await getNextSequenceValue('reviews_id');  // Obtém o próximo ID
    const review = new Review({
      id: reviewId,
      user_id,
      game_id,
      rating,
      review_text
    });

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
      // Atualiza a review no banco de dados
      const updatedReview = await Review.findOneAndUpdate(
        
          { review_text, rating },
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

module.exports = router;
