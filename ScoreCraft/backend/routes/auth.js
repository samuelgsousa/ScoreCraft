const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile'); // Certifique-se de que o caminho está correto

router.get('/login', async (req, res) => {
    try {
      const profiles = await Profile.find();
      res.json(profiles);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
// Rota para login

 router.post('/login', async (req, res) => {
     const { email, senha } = req.body;

     try {
          //Buscar o usuário pelo email
         const user = await Profile.findOne({ email });
         if (!user) {
             return res.status(404).json({ message: 'Usuário não encontrado' });
         }

          //Verificar a senha
         const isMatch = await user.compararSenha(senha);
         if (!isMatch) {
             return res.status(401).json({ message: 'Credenciais inválidas' });
         }

          //Se a senha estiver correta, retorne os dados do usuário (exceto a senha)
         const { senha: _, ...userData } = user.toObject();  //Excluir a senha da resposta
         res.json(userData);
     } catch (error) {
         res.status(500).json({ message: 'Erro no servidor', error });
     }
 });

module.exports = router;
