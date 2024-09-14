const mongoose = require('mongoose');

const reviewsSchema = new mongoose.Schema({
    id: { type: Number },
    review_id: { type: Number },
    user_id: { type: Number, required: true },
    game_id: { type: Number, required: true },
    played_data: { type: Date, default: Date.now, required: false },
    rating: { type: Number, required: true },
    review_text: { type: String, default: null, required: true },
});
 

module.exports = mongoose.model('Review', reviewsSchema);