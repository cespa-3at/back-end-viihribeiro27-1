const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

const db = new sqlite3.Database('./sistema.db');

db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cidade TEXT
)`);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/salvar', (req, res) => {
    const { nome, cidade } = req.body;
    const sql = `INSERT INTO usuarios (nome, cidade) VALUES (?, ?)`;

    db.run(sql, [nome, cidade], (err) => {
        if (err) return res.send("Erro ao salvar: " + err.message);
        
        res.send(`
            <h3 style="color:green">✅ Sucesso! Dados salvos no banco.</h3>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Cidade:</strong> ${cidade}</p>
            <br>
            <a href='/'>← Cadastrar outro aluno</a>
        `);
    });
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});