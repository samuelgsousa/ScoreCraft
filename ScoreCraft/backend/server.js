const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware para processar JSON
app.use(express.json());

// Importando as rotas de perfil
const profileRoutes = require('./routes/profileRoutes');
app.use('/api/profiles', profileRoutes);

// Rota inicial
app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/perfisDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch(err => {
  console.error('Erro ao conectar ao MongoDB', err);
});
