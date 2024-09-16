const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile'); // Certifique-se de que o caminho está correto

const bcrypt = require('bcrypt');

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

// Rota temporária para hash de todas as senhas não hasheadas
// router.put('/hash-passwords', async (req, res) => {
//     try {
//       // Encontra todos os perfis
//       const profiles = await Profile.find();
  
//       // Itera sobre os perfis e hashea senhas que não estão hasheadas
//       for (let profile of profiles) {
//         if (profile.senha && !profile.senha.startsWith('$2b$')) {  // Verifica se a senha não é nula e não é um hash do bcrypt
//           const salt = await bcrypt.genSalt(10);
//           profile.senha = await bcrypt.hash(profile.senha, salt);
//           await profile.save();  // Salva o perfil com a senha hasheada
//         }
//       }
  
//       res.status(200).json({ message: 'Senhas criptografadas com sucesso' });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });

module.exports = router;
