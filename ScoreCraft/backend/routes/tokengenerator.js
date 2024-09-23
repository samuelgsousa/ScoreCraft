const express = require('express');
const { User } = require('./models/User'); // Ajuste conforme seu modelo
const { generateResetToken } = require('./token.service'); // Sua função para gerar o token
const nodemailer = require('nodemailer'); // Importar nodemailer
const router = express.Router();

// Rota para solicitar redefinição de senha
router.post('/request-reset', async (req, res) => {
  const { email } = req.body;

  // Encontre o usuário pelo e-mail
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  // Gera o token
  const token = generateResetToken(user._id);

  // Aqui você deve enviar o token por e-mail
  // Use nodemailer para enviar um e-mail com o link que inclui o token
  // Exemplo do corpo do e-mail:
  const resetLink = `http://seu-frontend.com/reset-password/${token}`; // Altere para o seu link real
  // ... configurar nodemailer e enviar e-mail ...

  res.status(200).json({ message: 'E-mail de redefinição de senha enviado.' });
});

module.exports = router;
