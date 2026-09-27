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
    cidade: "Porto Alegre — RS",
    /** Depois deste momento o site e o banco param de aceitar respostas. */
    prazoConfirmacao: "2026-10-17T23:59:59-03:00"
};
export const INFORMACOES = [
    {
        icone: "clock",
        titulo: "Horário",
        texto: "A cerimônia começa às 20h, no horário de Brasília. Chegue com 30 minutos de antecedência para escolher o lugar com calma."
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
        // IMG_0003 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0003.webp",
        miniatura: "./assets/fotos/mini/foto-0003.webp"
    },
    {
        // IMG_0007 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0007.webp",
        miniatura: "./assets/fotos/mini/foto-0007.webp"
    },
    {
        // IMG_0019 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0019.webp",
        miniatura: "./assets/fotos/mini/foto-0019.webp"
    },
    {
        // IMG_0053 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0053.webp",
        miniatura: "./assets/fotos/mini/foto-0053.webp"
    },
    {
        // IMG_0205 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0205.webp",
        miniatura: "./assets/fotos/mini/foto-0205.webp"
    },
    {
        // IMG_0240 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0240.webp",
        miniatura: "./assets/fotos/mini/foto-0240.webp"
    },
    {
        // IMG_0257 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0257.webp",
        miniatura: "./assets/fotos/mini/foto-0257.webp"
    },
    {
        // IMG_0348 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0348.webp",
        miniatura: "./assets/fotos/mini/foto-0348.webp"
    },
    {
        // IMG_0354 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0354.webp",
        miniatura: "./assets/fotos/mini/foto-0354.webp"
    },
    {
        // IMG_0447 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0447.webp",
        miniatura: "./assets/fotos/mini/foto-0447.webp"
    },
    {
        // IMG_0563 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0563.webp",
        miniatura: "./assets/fotos/mini/foto-0563.webp"
    },
    {
        // IMG_0578 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0578.webp",
        miniatura: "./assets/fotos/mini/foto-0578.webp"
    },
    {
        // IMG_0581 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0581.webp",
        miniatura: "./assets/fotos/mini/foto-0581.webp"
    },
    {
        // IMG_0582 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0582.webp",
        miniatura: "./assets/fotos/mini/foto-0582.webp"
    },
    {
        // IMG_0594 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0594.webp",
        miniatura: "./assets/fotos/mini/foto-0594.webp"
    },
    {
        // IMG_0606 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0606.webp",
        miniatura: "./assets/fotos/mini/foto-0606.webp"
    },
    {
        // IMG_0621 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0621.webp",
        miniatura: "./assets/fotos/mini/foto-0621.webp"
    },
    {
        // IMG_0664 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0664.webp",
        miniatura: "./assets/fotos/mini/foto-0664.webp"
    },
    {
        // IMG_0682 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0682.webp",
        miniatura: "./assets/fotos/mini/foto-0682.webp"
    },
    {
        // IMG_0719 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0719.webp",
        miniatura: "./assets/fotos/mini/foto-0719.webp"
    },
    {
        // IMG_0750 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0750.webp",
        miniatura: "./assets/fotos/mini/foto-0750.webp"
    },
    {
        // IMG_0878 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0878.webp",
        miniatura: "./assets/fotos/mini/foto-0878.webp"
    },
    {
        // IMG_0907 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0907.webp",
        miniatura: "./assets/fotos/mini/foto-0907.webp"
    },
    {
        // IMG_0925 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0925.webp",
        miniatura: "./assets/fotos/mini/foto-0925.webp"
    },
    {
        // IMG_0930 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0930.webp",
        miniatura: "./assets/fotos/mini/foto-0930.webp"
    },
    {
        // IMG_0950 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0950.webp",
        miniatura: "./assets/fotos/mini/foto-0950.webp"
    },
    {
        // IMG_0955 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0955.webp",
        miniatura: "./assets/fotos/mini/foto-0955.webp"
    },
    {
        // IMG_0983 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0983.webp",
        miniatura: "./assets/fotos/mini/foto-0983.webp"
    },
    {
        // IMG_0985 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0985.webp",
        miniatura: "./assets/fotos/mini/foto-0985.webp"
    },
    {
        // IMG_0986 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0986.webp",
        miniatura: "./assets/fotos/mini/foto-0986.webp"
    },
    {
        // IMG_1033 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-1033.webp",
        miniatura: "./assets/fotos/mini/foto-1033.webp"
    },
    {
        // IMG_1112 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-1112.webp",
        miniatura: "./assets/fotos/mini/foto-1112.webp"
    },
    {
        // IMG_1123 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-1123.webp",
        miniatura: "./assets/fotos/mini/foto-1123.webp"
    },
    {
        // IMG_8384 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-8384.webp",
        miniatura: "./assets/fotos/mini/foto-8384.webp"
    },
    {
        // IMG_8907 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-8907.webp",
        miniatura: "./assets/fotos/mini/foto-8907.webp"
    },
    {
        // IMG_9650 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-9650.webp",
        miniatura: "./assets/fotos/mini/foto-9650.webp"
    }
];
