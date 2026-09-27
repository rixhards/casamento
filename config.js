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
        imagem: "./assets/venue-church.webp?v=bc44319c",
        imagemFallback: "./assets/venue-church.jpg?v=06534c0f",
        mapa: "Paróquia São José, Av. Assis Brasil, 6400 - Sarandi, Porto Alegre - RS, 91140-000"
    },
    {
        id: "festa",
        tipo: "Recepção",
        nome: "Exxplêndido Festas e Eventos",
        endereco: "Av. Pres. Getúlio Vargas, 5436 — Alvorada — RS",
        horario: "logo após a cerimônia",
        nota: "É onde a festa acontece de verdade.",
        imagem: "./assets/venue-party.webp?v=6152c030",
        imagemFallback: "./assets/venue-party.jpg?v=c6a67538",
        // Nome e número exatamente como estão no Google Maps, para o pino cair no salão certo.
        mapa: "Exxplendido eventos, Av. Pres. Getúlio Vargas, 5430 - Maria Regina, Alvorada - RS"
    }
];
/* ---------- Presentes ---------- */
export const PIX = {
    chave: "d6e06819-b467-42c0-9ed8-5e0ab0fd11a6",
    /** Como aparece no app de quem paga. Máx. 25 caracteres, sem acento. */
    recebedor: "RICHARD RODRIGUES",
    cidade: "PORTO ALEGRE",
    qrcode: "./assets/pix-qrcode.svg?v=c9e2fa57"
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
        imagem: "./assets/fotos/foto-0003.webp?v=d44427f1",
        miniatura: "./assets/fotos/mini/foto-0003.webp?v=440c924e"
    },
    {
        // IMG_0007 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0007.webp?v=a23bc0d2",
        miniatura: "./assets/fotos/mini/foto-0007.webp?v=a4350b62"
    },
    {
        // IMG_0019 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0019.webp?v=c3328347",
        miniatura: "./assets/fotos/mini/foto-0019.webp?v=6dfbd598"
    },
    {
        // IMG_0053 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0053.webp?v=83b7a486",
        miniatura: "./assets/fotos/mini/foto-0053.webp?v=3db9d6ea"
    },
    {
        // IMG_0205 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0205.webp?v=8c65c638",
        miniatura: "./assets/fotos/mini/foto-0205.webp?v=0452a60b"
    },
    {
        // IMG_0240 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0240.webp?v=c6ee81cd",
        miniatura: "./assets/fotos/mini/foto-0240.webp?v=de1b9847"
    },
    {
        // IMG_0257 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0257.webp?v=ea5e248f",
        miniatura: "./assets/fotos/mini/foto-0257.webp?v=76b70ea7"
    },
    {
        // IMG_0348 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0348.webp?v=8c3f4d9e",
        miniatura: "./assets/fotos/mini/foto-0348.webp?v=ce83345d"
    },
    {
        // IMG_0354 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0354.webp?v=4b9822c7",
        miniatura: "./assets/fotos/mini/foto-0354.webp?v=528ea809"
    },
    {
        // IMG_0447 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0447.webp?v=9e4c9e61",
        miniatura: "./assets/fotos/mini/foto-0447.webp?v=9ea130ee"
    },
    {
        // IMG_0563 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0563.webp?v=f2931692",
        miniatura: "./assets/fotos/mini/foto-0563.webp?v=845d3a3d"
    },
    {
        // IMG_0578 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0578.webp?v=497763bb",
        miniatura: "./assets/fotos/mini/foto-0578.webp?v=03fd5ae2"
    },
    {
        // IMG_0581 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0581.webp?v=76cde3cb",
        miniatura: "./assets/fotos/mini/foto-0581.webp?v=e56c07f7"
    },
    {
        // IMG_0582 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0582.webp?v=c56846a0",
        miniatura: "./assets/fotos/mini/foto-0582.webp?v=c9518881"
    },
    {
        // IMG_0594 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0594.webp?v=5237af88",
        miniatura: "./assets/fotos/mini/foto-0594.webp?v=f00d7612"
    },
    {
        // IMG_0606 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0606.webp?v=a0d6aa56",
        miniatura: "./assets/fotos/mini/foto-0606.webp?v=8437363d"
    },
    {
        // IMG_0621 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0621.webp?v=d18160f5",
        miniatura: "./assets/fotos/mini/foto-0621.webp?v=bd4527a3"
    },
    {
        // IMG_0664 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0664.webp?v=2725f731",
        miniatura: "./assets/fotos/mini/foto-0664.webp?v=a9c60530"
    },
    {
        // IMG_0682 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0682.webp?v=d7a264b5",
        miniatura: "./assets/fotos/mini/foto-0682.webp?v=215cbe37"
    },
    {
        // IMG_0719 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0719.webp?v=2cbaf04a",
        miniatura: "./assets/fotos/mini/foto-0719.webp?v=ed799d00"
    },
    {
        // IMG_0750 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0750.webp?v=b8699790",
        miniatura: "./assets/fotos/mini/foto-0750.webp?v=5b290e94"
    },
    {
        // IMG_0878 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0878.webp?v=03e9c23c",
        miniatura: "./assets/fotos/mini/foto-0878.webp?v=62651f02"
    },
    {
        // IMG_0907 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0907.webp?v=5433e2de",
        miniatura: "./assets/fotos/mini/foto-0907.webp?v=52628cc0"
    },
    {
        // IMG_0925 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0925.webp?v=331e3658",
        miniatura: "./assets/fotos/mini/foto-0925.webp?v=23c3652f"
    },
    {
        // IMG_0930 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0930.webp?v=3beb818b",
        miniatura: "./assets/fotos/mini/foto-0930.webp?v=805c4a2e"
    },
    {
        // IMG_0950 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0950.webp?v=77704154",
        miniatura: "./assets/fotos/mini/foto-0950.webp?v=844d54d9"
    },
    {
        // IMG_0955 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0955.webp?v=f3998cf9",
        miniatura: "./assets/fotos/mini/foto-0955.webp?v=ec46425e"
    },
    {
        // IMG_0983 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0983.webp?v=7f00fe5e",
        miniatura: "./assets/fotos/mini/foto-0983.webp?v=15f4d130"
    },
    {
        // IMG_0985 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0985.webp?v=ef70f2b6",
        miniatura: "./assets/fotos/mini/foto-0985.webp?v=362fbd5d"
    },
    {
        // IMG_0986 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-0986.webp?v=56660c95",
        miniatura: "./assets/fotos/mini/foto-0986.webp?v=529245a4"
    },
    {
        // IMG_1033 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-1033.webp?v=c4ef6222",
        miniatura: "./assets/fotos/mini/foto-1033.webp?v=9800e61b"
    },
    {
        // IMG_1112 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-1112.webp?v=341f18d6",
        miniatura: "./assets/fotos/mini/foto-1112.webp?v=abcdd44f"
    },
    {
        // IMG_1123 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-1123.webp?v=5a6f51d8",
        miniatura: "./assets/fotos/mini/foto-1123.webp?v=f5cad312"
    },
    {
        // IMG_8384 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-8384.webp?v=c9da8f08",
        miniatura: "./assets/fotos/mini/foto-8384.webp?v=771f96ba"
    },
    {
        // IMG_8907 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-8907.webp?v=e1339f5f",
        miniatura: "./assets/fotos/mini/foto-8907.webp?v=3edda69b"
    },
    {
        // IMG_9650 (pasta FotosSite)
        titulo: "Ana & Richard",
        descricao: "",
        imagem: "./assets/fotos/foto-9650.webp?v=3db96695",
        miniatura: "./assets/fotos/mini/foto-9650.webp?v=261d7c12"
    }
];
