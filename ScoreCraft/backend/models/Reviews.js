const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const reviewsSchema = new mongoose.Schema({
    review_id: { type: Number },
    id: { type: Number },
    user_id: { type: Number, required: true },
    game_id: { type: Number, required: true },
    played_data: { type: Date, default: Date.now, required: false },
    rating: { type: Number, required: true },
    review_text: { type: String, default: null, required: true },
});

reviewsSchema.statics.getNextId = async function() {
    const lastReview = await this.findOne().sort('-id');
    return lastReview ? lastReview.id + 1 : 1;
};

module.exports = mongoose.model('Review', reviewsSchema);