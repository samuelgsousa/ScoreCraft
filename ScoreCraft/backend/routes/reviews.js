const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Definindo o esquema para avaliações
const reviewSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true
  },
  game_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Game',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review_text: {
    type: String,
    required: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Criando o modelo para avaliações
const Review = mongoose.model('Review', reviewSchema);

// Rota para obter todas as avaliações
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('user_id').populate('game_id');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para obter uma avaliação específica por ID
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id).populate('user_id').populate('game_id');
    if (review) {
      res.json(review);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Rota para criar uma nova avaliação
router.post('/', async (req, res) => {
  const { user_id, game_id, rating, review_text } = req.body;
  const review = new Review({
    user_id,
    game_id,
    rating,
    review_text
  });

  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rota para atualizar uma avaliação
router.put('/:id', async (req, res) => {
  const { user_id, game_id, rating, review_text } = req.body;
  try {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { user_id, game_id, rating, review_text },
      { new: true }
    ).populate('user_id').populate('game_id');
    if (updatedReview) {
      res.json(updatedReview);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rota para deletar uma avaliação
router.delete('/:id', async (req, res) => {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (deletedReview) {
      res.json({ message: 'Review deleted' });
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
