// services/token.service.js
const jwt = require('jsonwebtoken');

// Gera um token
const generateResetToken = (userId) => {
  const token = jwt.sign({ id: userId }, 'seu-segredo', { expiresIn: '15m' });
  return token;
};

module.exports = { generateResetToken };
