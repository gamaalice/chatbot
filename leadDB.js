const db = require('./db');

function salvarLead({ nome, telefone, mensagem }) {
    const stmt = db.prepare(`
        INSERT INTO leads (nome, telefone, mensagem, data)
        VALUES (?, ?, ?, ?)
    `);

    stmt.run(nome, telefone, mensagem, new Date().toISOString());

    console.log("Lead salvo no banco:", nome);
}

module.exports = { salvarLead };
