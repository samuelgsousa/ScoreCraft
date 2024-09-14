const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 3000;

const uri = 'mongodb+srv://samuelgsousa:srKpSrufmbqDMwYJ@cluster0.7tlos.mongodb.net/ScoreCraftData';

// Middleware
app.use(cors());
app.use(express.json());

let db; // Variável para armazenar a conexão com o banco de dados

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Conectar ao MongoDB
    await client.connect();
    db = client.db('ScoreCraftData'); // Define a variável db com a conexão ao banco de dados
    console.log('Conectado ao MongoDB');

    // Send a ping to confirm a successful connection
    await db.command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");

    // Aqui você pode usar o db na aplicação
    // Defina suas rotas dentro desta função, ou use a variável global db nas rotas externas

  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err);
  }
}

run().catch(console.dir);

// Conectar ao MongoDB com o mongoose (opcional, dependendo se você vai usar mongoose ou MongoClient)
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB conectado via mongoose'))
  .catch(err => console.error('Erro ao conectar ao MongoDB com mongoose', err));

// Rotas
app.use('/api/profiles', require('./routes/profiles'));
app.use('/api/games', require('./routes/games')); 
app.use('/api/reviews', require('./routes/reviews')); 

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

// Exportar a variável db para uso em outros arquivos
module.exports = db;
