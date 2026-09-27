import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";
import { rpc, supabaseConfigurado } from "./supabase.js";
const campo = (id) => document.getElementById(id);
const status = (texto) => { campo("admin-status").textContent = texto; };
const normalizar = (v) => v.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();
const resposta = (v) => v === "nao vai" ? "Não vai" : v === "vai" ? "Vai" : "Sem resposta";
const data = (v) => v ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "short", timeStyle: "short", timeZone: "America/Sao_Paulo" }).format(new Date(v)) : "—";
let acesso = null; // Só na memória desta aba; nunca no URL ou localStorage.
let painel = { limite: 180, convidados: [] };
let carregando = false;
let sessao = 0;
const selecionados = () => {
    const busca = normalizar(campo("admin-search").value);
    const filtro = campo("admin-filter").value;
    return painel.convidados.filter((p) => normalizar(`${p.nome} ${p.familia}`).includes(busca) &&
        (!filtro || p.status === filtro));
};
const desenhar = () => {
    const pessoas = painel.convidados;
    const confirmados = pessoas.filter((p) => p.status === "vai").length;
    const cards = [
        ["Convidados na lista", pessoas.length, ""],
        ["Confirmados", `${confirmados} / ${painel.limite}`, "vai"],
        ["Não vão", pessoas.filter((p) => p.status === "nao vai").length, "nao-vai"],
        ["Sem resposta", pessoas.filter((p) => p.status === "sem resposta").length, "sem-resposta"]
    ];
    campo("admin-summary").replaceChildren(...cards.map(([rotulo, valor, tom]) => {
        const card = document.createElement("article");
        card.className = tom ? `panel admin-card--${tom}` : "panel";
        const numero = document.createElement("strong");
        numero.textContent = String(valor);
        const label = document.createElement("p");
        label.textContent = rotulo;
        card.append(numero, label);
        return card;
    }));
    campo("admin-capacity").textContent = confirmados > painel.limite
        ? `Atenção: já são ${confirmados - painel.limite} confirmado(s) acima do limite de ${painel.limite}.`
        : "";
    const filtrados = selecionados();
    campo("admin-results").textContent = `${filtrados.length} pessoa(s) nesta seleção. O CSV usa os mesmos filtros.`;
    campo("admin-rows").replaceChildren(...filtrados.map((p) => {
        const linha = document.createElement("tr");
        const tom = p.status.replace(" ", "-");
        linha.className = `admin-row--${tom}`;
        for (const valor of [p.familia, p.nome]) {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.append(celula);
        }
        const celulaResposta = document.createElement("td");
        const selo = document.createElement("span");
        selo.className = `admin-badge admin-badge--${tom}`;
        selo.textContent = resposta(p.status);
        celulaResposta.append(selo);
        const celulaData = document.createElement("td");
        celulaData.textContent = data(p.atualizado_em);
        linha.append(celulaResposta, celulaData);
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
    const linhas = [["Família", "Convidado", "Resposta", "Atualizado em"],
        ...selecionados().map((p) => [p.familia, p.nome, resposta(p.status), data(p.atualizado_em)])];
    const url = URL.createObjectURL(new Blob(["\uFEFF" + linhas.map((l) => l.map(csv).join(",")).join("\r\n")], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "confirmacoes-casamento.csv";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
});
setInterval(() => { if (!document.hidden)
    void atualizar(); }, 30000);
