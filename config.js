/**
 * Tudo que vocês dois podem querer mudar sem mexer no resto do código.
 */
/* ---------- Supabase ---------- */
// Painel do Supabase > Project Settings > Data API
// A anon key é pública de propósito: ela sozinha não lê nenhuma tabela,
// Busca por nome resolve um convite; respostas e recados exigem seu token.
export const SUPABASE_URL = "https://otwcscimzptdpvurggjx.supabase.co";
export const SUPABASE_ANON_KEY = "sb_publishable_WTKEyV5bg6iPCWgCP6tdcA_0-yOSs-Z";
/* ---------- O casamento ---------- */
export const CASAMENTO = {
    noiva: "Ana",
    noivo: "Richard",
    /** ISO com fuso de Brasília. Usado na contagem regressiva. */
    dataHora: "2026-11-07T20:00:00-03:00",
    dataExtenso: "07 de novembro de 2026",
    horaCerimonia: "20h",
    cidade: "Porto Alegre — RS"
};
export const INFORMACOES = [
    {
        icone: "clock",
        titulo: "Horário",
        texto: "A cerimônia começa às 20h, no horário de Brasília. Chegue uns 20 minutos antes para escolher o lugar com calma."
    },
    {
        icone: "dress",
        titulo: "Traje",
        texto: "Traje social. Terno para eles, vestido para elas — sem precisar de gravata se o calor apertar."
    },
    {
        icone: "kids",
        titulo: "Crianças",
        texto: "Bem-vindas, claro. Se os pequenos estão no convite, estão convidados — traga a família inteira."
    },
    {
        icone: "car",
        titulo: "Estacionamento",
        texto: "Na igreja não há estacionamento próprio; dá para deixar o carro nas ruas ao redor. Na festa, o estacionamento fica na entrada do salão."
    }
];
export const LOCAIS = [
    {
        id: "igreja",
        tipo: "Cerimônia",
        nome: "Paróquia São José",
        endereco: "Av. Assis Brasil, 6400 — Sarandi, Porto Alegre — RS",
        horario: "20h",
        nota: "Cerimônia religiosa. Não há estacionamento próprio: as ruas do entorno costumam ter vaga.",
        imagem: "./assets/venue-church.webp",
        imagemFallback: "./assets/venue-church.jpg",
        mapa: "Paróquia São José, Av. Assis Brasil, 6400 - Sarandi, Porto Alegre - RS, 91140-000"
    },
    {
        id: "festa",
        tipo: "Recepção",
        nome: "Salão DCG — Sogipa",
        endereco: "R. Dona Leopoldina — São João, Porto Alegre — RS",
        horario: "logo após a cerimônia",
        nota: "Estacionamento na entrada do salão. É onde a festa acontece de verdade.",
        imagem: "./assets/venue-party.webp",
        imagemFallback: "./assets/venue-party.jpg",
        mapa: "Sogipa, R. Dona Leopoldina, São João, Porto Alegre - RS, 90550-130"
    }
];
/* ---------- Presentes ---------- */
export const PIX = {
    chave: "d6e06819-b467-42c0-9ed8-5e0ab0fd11a6",
    /** Como aparece no app de quem paga. Máx. 25 caracteres, sem acento. */
    recebedor: "RICHARD RODRIGUES",
    cidade: "PORTO ALEGRE",
    qrcode: "./assets/pix-qrcode.svg"
};
/** Valores são sugestão — o Pix é livre, quem quiser manda o que puder. */
export const PRESENTES = [
    {
        id: "internet",
        titulo: "5 primeiros meses de internet",
        descricao: "Para o casal brigar por causa do Wi-Fi, e não por causa da falta dele.",
        valor: 350,
        emoji: "📡"
    },
    {
        id: "estatueta",
        titulo: "Uma estatueta de anime",
        descricao: "O Richard vai começar a coleção. A Ana vai fingir que aprova. Todo mundo sai ganhando.",
        valor: 180,
        emoji: "🗿"
    },
    {
        id: "spa",
        titulo: "Dia de spa para a noiva",
        descricao: "Depois de organizar um casamento inteiro, é o mínimo.",
        valor: 250,
        emoji: "💆"
    },
    {
        id: "cafe",
        titulo: "Fundo do café de sábado de manhã",
        descricao: "Aquele café demorado, sem pressa, que é praticamente um plano de vida.",
        valor: 80,
        emoji: "☕"
    },
    {
        id: "panela",
        titulo: "A panela que vamos queimar primeiro",
        descricao: "Sabemos que vai acontecer. Preferimos estar preparados.",
        valor: 120,
        emoji: "🍳"
    },
    {
        id: "streaming",
        titulo: "Assinatura de streaming",
        descricao: "Para as maratonas de série em que um dos dois dorme no terceiro episódio.",
        valor: 60,
        emoji: "🍿"
    },
    {
        id: "sofa",
        titulo: "Cota do sofá",
        descricao: "Precisa caber dois adultos, um cobertor e o controle remoto no meio.",
        valor: 500,
        emoji: "🛋️"
    },
    {
        id: "pizza",
        titulo: "Rodízio do primeiro mês de casados",
        descricao: "Para comemorar que sobrevivemos ao primeiro mês dividindo o banheiro.",
        valor: 150,
        emoji: "🍕"
    },
    {
        id: "lua-de-mel",
        titulo: "Cota da lua de mel",
        descricao: "Se preferir o clássico sem piada, essa aqui é a sua.",
        valor: 300,
        emoji: "✈️"
    }
];
export const FOTOS = [
    {
        titulo: "Richard & Ana",
        descricao: "Substituir por foto real — ver pendencias-de-conteudo.md",
        imagem: "./assets/couple-1.svg"
    },
    {
        titulo: "Richard & Ana",
        descricao: "Substituir por foto real — ver pendencias-de-conteudo.md",
        imagem: "./assets/couple-2.svg"
    },
    {
        titulo: "Richard & Ana",
        descricao: "Substituir por foto real — ver pendencias-de-conteudo.md",
        imagem: "./assets/couple-3.svg"
    },
    {
        titulo: "Richard & Ana",
        descricao: "Substituir por foto real — ver pendencias-de-conteudo.md",
        imagem: "./assets/couple-4.svg"
    }
];
