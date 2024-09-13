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

reviewsSchema.plugin(AutoIncrement, { inc_field: 'review_id' });

// Middleware para copiar review_id para id
reviewsSchema.pre('save', function (next) {
    if (!this.id) {
        this.id = this.review_id;
    }
    next();
});

module.exports = mongoose.model('Review', reviewsSchema);