const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
    email: { type: String, default: null, required: true, unique: true },
    senha: { type: String, default: null, required: true },
});

profileSchema.pre('save', async function (next) {
    try {
      if (!this.isModified('password')) return next();
  
      // Gera um salt com fator de custo 10
      const salt = await bcrypt.genSalt(10);
      
      // Hash da senha com o salt
      this.password = await bcrypt.hash(this.password, salt);
      
      next();
    } catch (error) {
      next(error);
    }
  });

  profileSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
  };


module.exports = mongoose.model('Profile', profileSchema);

