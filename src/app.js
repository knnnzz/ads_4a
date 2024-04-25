const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); // Importe o módulo 'path'

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// Importe as rotas do arquivo de rotas
const produtosRoutes = require('./routes/produto');

// Use as rotas importadas para lidar com as solicitações relacionadas a produtos
app.use('/api/produtos', produtosRoutes);

// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rota para servir a página de cadastro de produtos
app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rota de teste para verificar se o servidor está ativo
app.get('/', (req, res) => {
  res.send('Servidor ligado com sucesso!');
});

// Configuração para lidar com erros 404 (página não encontrada)
app.use((req, res, next) => {
  res.status(404).send('Página não encontrada');
});

// Configuração para lidar com outros erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

app.listen(PORT, () => {
  console.log(`Servidor ativo e rodando na porta ${PORT}`);
});
