const axios = require('axios');

async function registrarLead({ nome, telefone, mensagem }) {
    try {
        await axios.post("https://seu-endpoint-ou-crm.com/api/leads", {
            nome,
            telefone,
            mensagem,
            origem: "WhatsApp - Ease Engenharia",
            data: new Date().toISOString()
        });

        console.log("Lead registrado com sucesso:", nome);
    } catch (err) {
        console.error("Erro ao registrar lead:", err.message);
    }
}

module.exports = { registrarLead };
