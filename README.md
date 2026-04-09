[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/8Cul6ZCR)
# Recuperacao-back-end
Atividade de Recuperação: Sistema de Cadastro (HTML + Node + SQLite)

Esta atividade vai te ajudar a conectar uma página de internet (Front-End) a um banco de dados real (Back-End).

 Passo 1: Criando o Banco de Dados (Terminal)

No terminal do seu Codespaces, vamos criar a "gaveta" onde as informações serão guardadas:

1.  **Inicie o SQLite:**  
    `sqlite3 sistema.db`
2.  **Crie a tabela (Copie e cole este comando):**
    
    sql
    
    ```
    CREATE TABLE usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        cidade TEXT
    );
    .exit
    
    ```
    
    Use o código com cuidado.
    

----------

Passo 2: Criando a Interface (index.html)

Crie um arquivo chamado  **`index.html`**  e cole este código. Ele é o formulário que o usuário vai preencher:

html
```

    <h2> Cadastro de Alunos</h2>
    <!-- O 'action' diz para onde os dados vão quando clicamos no botão -->
    <form action="/salvar" method="POST">
        <input type="text" name="nome" placeholder="Digite seu nome" required>
        <br><br>
        <input type="text" name="cidade" placeholder="Digite sua cidade">
        <br><br>
        <button type="submit">Cadastrar no Banco</button>
    </form>


```

Use o código com cuidado.

----------

 Passo 3: Criando o Servidor (app.js)

Crie um arquivo chamado  **`app.js`**. Ele é o "cérebro" que recebe o que foi digitado no HTML e salva no banco:

javascript

```
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();

// Prepara o servidor para ler os dados do formulário
app.use(express.urlencoded({ extended: true }));
const db = new sqlite3.Database('./sistema.db');

// Rota para abrir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota que recebe os dados e salva no SQLite
app.post('/salvar', (req, res) => {
    const { nome, cidade } = req.body;
    const sql = `INSERT INTO usuarios (nome, cidade) VALUES (?, ?)`;

    db.run(sql, [nome, cidade], (err) => {
        if (err) return res.send("Erro ao salvar: " + err.message);
        res.send("<h3> Sucesso! Dados salvos no banco.</h3><a href='/'>Voltar</a>");
    });
});

app.listen(3000, () => console.log("Servidor rodando em http://localhost:3000"));

```

Use o código com cuidado.

----------

 Passo 4: Testando tudo

1.  **Instale as ferramentas no terminal:**  
    `npm install express sqlite3`
2.  **Ligue o servidor:**  
    `node app.js`
3.  **Abra no navegador:**  Clique em "Open in Browser".
4.  **Verifique o banco:**  Após cadastrar, pare o servidor e digite:  
    `sqlite3 sistema.db "SELECT * FROM usuarios;"`

----------

 Entrega de Recuperação (Classroom):

Para validar, poste no comentário da tarefa:

1.  O nome e a cidade que você cadastrou.
2.  O que aconteceu quando você rodou o comando  `SELECT`  no terminal? (Apareceu seu nome lá?).
