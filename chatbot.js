const qrcode = require('qrcode-terminal');
const { Client } = require('whatsapp-web.js');

const { registrarLead } = require('./leadService');
await registrarLead({
    nome,
    telefone: msg.from.replace("@c.us", ""),
    mensagem: msg.body
});

const { salvarLead } = require('./leadDB');
salvarLead({
    nome,
    telefone: msg.from.replace("@c.us", ""),
    mensagem: msg.body
});



// Inicializa o cliente do WhatsApp
const client = new Client();

// Função utilitária para criar delays
const delay = ms => new Promise(res => setTimeout(res, ms));

// Função para simular digitação
const digitar = async (chat, tempo = 3000) => {
    await chat.sendStateTyping();
    await delay(tempo);
};

// Mensagens organizadas por opção, com múltiplas respostas
const respostas = {
    menu: [
        msg => `Olá! ${msg.contactName}, sou o assistente virtual da *ThirdWell*, empresa especializada em gestão de projetos. Como posso ajudá-lo hoje?\n\nDigite uma das opções abaixo:\n\n1 - O que fazemos\n2 - Nossos planos\n3 - Benefícios\n4 - Como contratar\n5 - Outras dúvidas`
    ],
    '1': [
        () => `A *ThirdWell* oferece soluções completas para gestão de projetos, desde planejamento até execução.`,
        () => `Trabalhamos com metodologias ágeis, KPIs personalizados e suporte estratégico para empresas de todos os portes.`,
        () => `Nosso foco é transformar ideias em resultados reais.`,
        () => `Link para saber mais: https://thirdwell.com`
    ],
    '2': [
        () => `*Plano Essencial:* $150/mês — ideal para freelancers e pequenos negócios.`,
        () => `*Plano Profissional:* $400/mês — inclui dashboards, relatórios e suporte dedicado.`,
        () => `*Plano Corporativo:* Sob consulta — soluções personalizadas para grandes equipes.`,
        () => `Link para contratação: https://thirdwell.com`
    ],
    '3': [
        () => `✔️ Acompanhamento em tempo real dos projetos`,
        () => `✔️ Relatórios automáticos`,
        () => `✔️ Suporte estratégico com especialistas`,
        () => `✔️ Integração com MS Projet, N8N e outras ferramentas`,
        () => `✔️ Treinamentos e workshops incluídos`,
        () => `Link para benefícios: https://thirdwell.com`
    ],
    '4': [
        () => `Você pode contratar nossos serviços diretamente pelo site ou falando com um consultor aqui no WhatsApp.`,
        () => `Após a contratação, você recebe acesso imediato à nossa plataforma.`,
        () => `Link para contratação: https://thirdwell.com`
    ],
    '5': [
        () => `Se tiver outras dúvidas, envie sua pergunta aqui ou acesse nosso site: https://thirdwell.com`
    ]
};

// Evento de leitura do QR Code
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Evento de conexão bem-sucedida
client.on('ready', () => {
    console.log('Tudo certo! WhatsApp conectado.');
});

// Inicializa o cliente
client.initialize();

// Evento de recebimento de mensagem
client.on('message', async msg => {
    const chat = await msg.getChat();
    const texto = msg.body?.trim();
    const contact = await msg.getContact();
    const nome = contact.pushname?.split(" ")[0] || 'cliente';

    // Adiciona nome ao contexto da mensagem
    msg.contactName = nome;

    // Verifica se é saudação ou pedido de menu
    if (/^(menu|oi|olá|ola|bom dia|boa tarde|boa noite)$/i.test(texto) && msg.from.endsWith('@c.us')) {
        for (const resposta of respostas.menu) {
            await digitar(chat);
            await client.sendMessage(msg.from, resposta(msg));
        }
        return;
    }
    // Verifica se é uma opção válida
    if (respostas[texto] && msg.from.endsWith('@c.us')) {
        for (const resposta of respostas[texto]) {
            await digitar(chat);
            await client.sendMessage(msg.from, resposta(msg));
        }
        return;
    }
});

// no terminal digitar: node chatbot.js