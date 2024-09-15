const mongoose = require('mongoose');

const gamesSchema = new mongoose.Schema({
    _id: String,
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String, default: null },
    release_date: { type: Date,  default: null, required: true },
    summary: { type: String, default: null, required: true },
    producer: { type: String, default: null, required: true },
    genres: { type: [Number], default: [] },
});

module.exports = mongoose.model('Game', gamesSchema);