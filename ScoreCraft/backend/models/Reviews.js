const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    game_id: { type: Number, required: true },
    review_text: { type: String, default: null, required: true },
    rating: { type: Number, required: true },
    user_id: { type: Number, required: true },
    played_data: { type: Date, default: Date.now, required: false },
} )
 

module.exports = mongoose.model('Review', reviewsSchema);