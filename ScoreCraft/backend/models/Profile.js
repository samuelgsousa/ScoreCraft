const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const profileSchema = new mongoose.Schema({
    id: { type: Number },  // Campo id para o código existente
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

profileSchema.statics.getNextId = async function() {
    const lastProfile = await this.findOne().sort('-id');
    return lastProfile ? lastProfile.id + 1 : 1;
};


module.exports = mongoose.model('Profile', profileSchema);

