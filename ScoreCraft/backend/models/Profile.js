const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const profileSchema = new mongoose.Schema({
    profile_id: { type: Number },  // Campo para auto-incremento
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

profileSchema.plugin(AutoIncrement, { inc_field: 'profile_id' });  // Auto-incremento em profile_id

// Middleware para copiar profile_id para id
profileSchema.pre('save', function (next) {
    if (!this.id) {
        this.id = this.profile_id;
    }
    next();
});



module.exports = mongoose.model('Profile', profileSchema);

