const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

const router = express.Router();

const configDatabase = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'produto'
};

// Rota para servir a página de cadastro
router.get('/cadastro', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Rota para listar produtos
router.get('/', async (req, res) => {
  try {
    const connection = await mysql.createConnection(configDatabase);
    const [rows] = await connection.query('SELECT * FROM produtos');

    connection.end();

    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({ error: 'Erro interno no servidor ao listar produtos' });
  }
});

// Rota para cadastrar um novo produto
router.post('/', async (req, res) => {
  try {
    const connection = await mysql.createConnection(configDatabase);

    const newProduct = {
      codprod: req.body.codprod,
      numlote: req.body.numlote,
      nomeprod: req.body.nomeprod,
      validade: req.body.validade,
      datafab: req.body.datafab,
      token: req.body.token
    };

    const [result] = await connection.query(
      'INSERT INTO produtos (codprod, numlote, nomeprod, validade, datafab, token) VALUES (?, ?, ?, ?, ?, ?)',
      [newProduct.codprod, newProduct.numlote, newProduct.nomeprod, newProduct.validade, newProduct.datafab, newProduct.token]
    );

    connection.end();

    res.status(201).json({ message: 'Produto cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar produto:', error);
    res.status(500).json({ error: 'Erro interno no servidor ao cadastrar produto' });
  }
});

// Rota para remover um produto
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const connection = await mysql.createConnection(configDatabase);
    await connection.query('DELETE FROM produtos WHERE codprod = ?', [id]);

    connection.end();

    res.status(200).json({ message: 'Produto removido com sucesso!' });
  } catch (error) {
    console.error('Erro ao remover produto:', error);
    res.status(500).json({ error: 'Erro interno no servidor ao remover produto' });
  }
});

// Rota para atualizar o token de um produto
router.put('/:id/token', async (req, res) => {
  const { id } = req.params;
  const { token } = req.body;
  try {
    const connection = await mysql.createConnection(configDatabase);
    await connection.query('UPDATE produtos SET token = ? WHERE codprod = ?', [token, id]);

    connection.end();

    res.status(200).json({ message: 'Token atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar token:', error);
    res.status(500).json({ error: 'Erro interno no servidor ao atualizar token' });
  }
});

module.exports = router;
