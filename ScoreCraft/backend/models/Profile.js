const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    id: Number,
    nome: { type: String, required: true },
    foto_perfil: { type: String, default: null },
    fav_gen: { type: [String], default: [] }, // Array de strings
    streamer: { type: Boolean, default: false },
    seguindo: { type: [Number], default: [] }, // Array de números
    wallpaper: { type: String, default: null },
    bio: { type: String, default: null },
    fav_games: { type: [Number], default: [] }, // Array de números
    email: { type: String, default: null, required: true },
    senha: { type: String, default: null, required: true },
});

module.exports = mongoose.model('Profile', profileSchema);

