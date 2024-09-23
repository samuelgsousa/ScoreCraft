const jwt = require('jsonwebtoken');

// Segredo para assinar os tokens
const SECRET_KEY = 'seu-segredo'; // Altere para algo mais seguro em produção

// Gera um token de redefinição
const generateResetToken = (userId) => {
  const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: '15m' });
  return token;
};

// Verifica se um token é válido
const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return reject(err); // Retorna erro se o token for inválido ou expirado
      }
      resolve(decoded); // Retorna os dados decodificados do token
    });
  });
};

module.exports = {
  generateResetToken,
  verifyToken
};
