require('dotenv').config();
const express = require('express');

const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

// Inicializa o app Express
const app = express();

// Conecta ao banco de dados
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rotas
const mangaRoutes = require('./routes/mangaRoutes');
const autorRoutes = require('./routes/autorRoutes');
const editoraRoutes = require('./routes/editoraRoutes');
const estudioRoutes = require('./routes/estudioRoutes');
const animeRoutes = require('./routes/animeRoutes');


// Usar rotas
app.use('/api/mangas', mangaRoutes);
app.use('/api/autores', autorRoutes);
app.use('/api/editoras', editoraRoutes);
app.use('/api/estudios', estudioRoutes);
app.use('/api/animes', animeRoutes);

// Rota base para verificar se API está funcionando
app.get('/', (req, res) => {
  res.json({ message: 'API do Catálogo de Animes está funcionando!' });
});

// Porta do servidor
const PORT = process.env.PORT || 3000;

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});


