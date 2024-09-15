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

profileSchema.pre('save', async function(next) {
  if (this.isModified('senha') || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10); // Gera um salt
      this.senha = await bcrypt.hash(this.senha, salt); // Faz o hash da senha
      next();
    } catch (err) {
      next(err);
    }
  } else {
    return next();
  }
});

// Método para verificar se a senha é válida
profileSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.senha);
};

module.exports = mongoose.model('Profile', profileSchema);

