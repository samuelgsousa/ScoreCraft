const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Importar bcrypt para criptografar senhas

const profileSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    nome: { type: String, required: true },
    foto_perfil: { type: String, default: null },
    fav_gen: { type: [String], default: [] },
    streamer: { type: Boolean, default: false },
    seguindo: { type: [Number], default: [] },
    wallpaper: { type: String, required: true },
    bio: { type: String, default: null },
    fav_games: { type: [Number], default: [] },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true }, // Armazenar a senha criptografada
});

// Middleware do Mongoose para criptografar a senha antes de salvar
profileSchema.pre('save', async function (next) {
    const profile = this;

    // Apenas hashear a senha se ela foi modificada ou é nova
    if (!profile.isModified('senha')) return next();

    try {
        // Gerar o hash da senha com um fator de custo (salt rounds)
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(profile.senha, salt);
        profile.senha = hash; // Salvar a senha hash
        next();
    } catch (error) {
        return next(error);
    }
});

// Método para verificar a senha ao fazer login
profileSchema.methods.compararSenha = function (senhaDigitada) {
    return bcrypt.compare(senhaDigitada, this.senha);
};

module.exports = mongoose.model('Profile', profileSchema);
