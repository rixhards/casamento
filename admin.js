import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";
import { rpc, supabaseConfigurado } from "./supabase.js";
const campo = (id) => document.getElementById(id);
const status = (texto) => { campo("admin-status").textContent = texto; };
const normalizar = (v) => v.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
const resposta = (v) => v === "nao vai" ? "Não vai" : v === "vai" ? "Vai" : "Sem resposta";
const idade = (p) => p.idade_pendente ? "A conferir" : p.idade === null ? "—" : `${p.idade} anos`;
const data = (v) => v ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short", timeZone: "America/Sao_Paulo" }).format(new Date(v)) : "—";
let acesso = null; // Só na memória desta aba; nunca no URL ou localStorage.
let painel = { limite: 180, convidados: [] };
let carregando = false;
let sessao = 0;
const selecionados = () => {
    const busca = normalizar(campo("admin-search").value);
    const filtro = campo("admin-filter").value;
    return painel.convidados.filter((p) => normalizar(`${p.nome} ${p.familia}`).includes(busca) &&
        (!filtro || (filtro === "idade" ? p.idade_pendente : p.status === filtro)));
};
const desenhar = () => {
    const pessoas = painel.convidados;
    const contados = pessoas.filter((p) => p.conta_no_limite);
    const confirmados = contados.filter((p) => p.status === "vai").length;
    const cards = [
        ["Convidados cadastrados", pessoas.length],
        ["Lista que conta no limite", `${contados.length} / ${painel.limite}`],
        ["Presenças que contam no limite", `${confirmados} / ${painel.limite}`],
        ["Presenças totais", pessoas.filter((p) => p.status === "vai").length],
        ["Menores de 6 confirmados", pessoas.filter((p) => !p.conta_no_limite && p.status === "vai").length],
        ["Não vão", pessoas.filter((p) => p.status === "nao vai").length],
        ["Sem resposta", pessoas.filter((p) => p.status === "sem resposta").length],
        ["Idades a conferir", pessoas.filter((p) => p.idade_pendente).length]
    ];
    campo("admin-summary").replaceChildren(...cards.map(([rotulo, valor]) => {
        const card = document.createElement("article");
        card.className = "panel";
        const numero = document.createElement("strong");
        numero.textContent = String(valor);
        const label = document.createElement("p");
        label.textContent = rotulo;
        card.append(numero, label);
        return card;
    }));
    campo("admin-capacity").textContent = contados.length > painel.limite
        ? `Atenção: a lista está ${contados.length - painel.limite} pessoa(s) acima do limite. As respostas continuam sendo registradas.`
        : `A lista tem ${painel.limite - contados.length} vaga(s) disponíveis no limite de ${painel.limite}.`;
    const filtrados = selecionados();
    campo("admin-results").textContent = `${filtrados.length} pessoa(s) nesta seleção. O CSV usa os mesmos filtros.`;
    campo("admin-rows").replaceChildren(...filtrados.map((p) => {
        const linha = document.createElement("tr");
        for (const valor of [p.familia, p.nome, idade(p), p.conta_no_limite ? "Sim" : "Não", resposta(p.status), data(p.atualizado_em)]) {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.append(celula);
        }
        return linha;
    }));
};
const sair = () => {
    acesso = null;
    sessao += 1;
    painel = { limite: 180, convidados: [] };
    campo("admin-rows").replaceChildren();
    campo("admin-summary").replaceChildren();
    campo("admin-panel").hidden = true;
    campo("admin-login").hidden = false;
    campo("admin-login").reset();
    status("Sessão encerrada.");
};
const atualizar = async () => {
    if (!acesso || carregando)
        return;
    const sessaoAtual = sessao;
    carregando = true;
    campo("admin-refresh").disabled = true;
    status("Atualizando confirmações…");
    try {
        const dados = await rpc("obter_painel", {}, acesso);
        if (sessao !== sessaoAtual)
            return;
        painel = dados;
        desenhar();
        campo("admin-panel").hidden = false;
        campo("admin-login").hidden = true;
        campo("admin-updated").textContent = `Atualizado em ${data(new Date().toISOString())}. Atualização automática a cada 30 segundos enquanto esta página estiver aberta.`;
        status("");
    }
    catch (erro) {
        if (sessao !== sessaoAtual)
            return;
        if (/Supabase (401|403)/.test(String(erro))) {
            sair();
            status("Acesso não autorizado ou sessão expirada. Entre com uma conta do casal autorizada.");
        }
        else
            status("Não foi possível atualizar. Os dados anteriores podem estar desatualizados; tente novamente.");
    }
    finally {
        carregando = false;
        campo("admin-refresh").disabled = false;
    }
};
campo("admin-login").addEventListener("submit", async (evento) => {
    evento.preventDefault();
    if (!supabaseConfigurado()) {
        status("Configure a conexão do Supabase antes de acessar o painel.");
        return;
    }
    const botao = campo("admin-login").querySelector("button");
    botao.disabled = true;
    status("Entrando…");
    try {
        const res = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=password`, {
            method: "POST", headers: { "Content-Type": "application/json", apikey: SUPABASE_ANON_KEY },
            body: JSON.stringify({ email: campo("admin-email").value.trim(), password: campo("admin-password").value }),
            signal: AbortSignal.timeout(15000)
        });
        if (!res.ok)
            throw new Error("login");
        const dados = await res.json();
        acesso = dados.access_token;
        sessao += 1;
        campo("admin-password").value = "";
        await atualizar();
    }
    catch {
        status("Não foi possível entrar. Confira e-mail, senha e conexão.");
    }
    finally {
        botao.disabled = false;
    }
});
campo("admin-refresh").addEventListener("click", () => { void atualizar(); });
campo("admin-logout").addEventListener("click", sair);
campo("admin-search").addEventListener("input", desenhar);
campo("admin-filter").addEventListener("change", desenhar);
campo("admin-export").addEventListener("click", () => {
    const csv = (v) => `"${(/^[=+@\-\t\r]/.test(v) ? "'" + v : v).replaceAll('"', '""')}"`;
    const linhas = [["Família", "Convidado", "Idade", "Conta no limite", "Resposta", "Atualizado em"],
        ...selecionados().map((p) => [p.familia, p.nome, idade(p), p.conta_no_limite ? "Sim" : "Não", resposta(p.status), data(p.atualizado_em)])];
    const url = URL.createObjectURL(new Blob(["\uFEFF" + linhas.map((l) => l.map(csv).join(",")).join("\r\n")], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "confirmacoes-casamento.csv";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
});
setInterval(() => { if (!document.hidden)
    void atualizar(); }, 30000);
