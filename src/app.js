const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path'); 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

const produtosRoutes = require('./routes/produto');

app.use('/api/produtos', produtosRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/validar', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'validate.html'));
});

app.get('/', (req, res) => {
  res.send('Servidor ligado com sucesso!');
});

app.use((req, res, next) => {
  res.status(404).send('Página não encontrada');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

app.listen(PORT, () => {
  console.log(`Servidor ativo e rodando na porta ${PORT}`);
});
