const Database = require('better-sqlite3');

// Cria ou abre o banco
const db = new Database('easebot.db');

// Tabela de leads
db.prepare(`
    CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        telefone TEXT,
        mensagem TEXT,
        data TEXT
    )
`).run();

module.exports = db;
