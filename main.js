import { CASAMENTO, FOTOS, INFORMACOES, LOCAIS, PIX, PRESENTES } from "./config.js";
import { buscarConvite, sugerirConvidados, listarRecados, publicarRecado, salvarConfirmacao, supabaseConfigurado } from "./supabase.js";
/* =========================================================
   Utilidades
   ========================================================= */
const $ = (seletor) => document.querySelector(seletor);
/** Cria elemento sem nunca usar innerHTML com dado de usuário. */
const el = (tag, attrs = {}, ...filhos) => {
    const node = document.createElement(tag);
    for (const [chave, valor] of Object.entries(attrs)) {
        if (chave === "class")
            node.className = valor;
        else
            node.setAttribute(chave, valor);
    }
    for (const filho of filhos) {
        if (filho === null || filho === undefined || filho === false)
            continue;
        node.append(typeof filho === "string" ? document.createTextNode(filho) : filho);
    }
    return node;
};
const svgIcone = (nome) => {
    const caminhos = {
        clock: "M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
        dress: "M12 5.2a2 2 0 1 1 2 2c-1.1 0-2 .7-2 1.8M12 9 4.1 15.3c-.9.7-.4 2.2.7 2.2h14.4c1.1 0 1.6-1.5.7-2.2L12 9Z",
        kids: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM4 21c0-3 2.2-5 5-5s5 2 5 5M17 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM15 21c0-2 1-3.5 2.5-3.5S20 19 20 21",
        car: "M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm10 0a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM4 17H3v-4l2-5h14l2 5v4h-1M9 17h6M3 13h18"
    };
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.6");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", caminhos[nome] ?? caminhos.clock);
    svg.appendChild(path);
    return svg;
};
const moeda = (valor) => new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0
}).format(valor);
const dataCurta = (iso) => new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(new Date(iso));
const semMovimento = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const definirStatus = (seletor, mensagem, tipo) => {
    const alvo = $(seletor);
    if (!alvo)
        return;
    alvo.textContent = mensagem;
    alvo.classList.remove("is-success", "is-error");
    if (tipo === "sucesso")
        alvo.classList.add("is-success");
    if (tipo === "erro")
        alvo.classList.add("is-error");
};
/* =========================================================
   Menu (mobile)
   ========================================================= */
const montarMenu = () => {
    const botao = $("#menu-toggle");
    const menu = $("#menu");
    if (!botao || !menu)
        return;
    const fechar = () => {
        menu.classList.remove("is-open");
        botao.setAttribute("aria-expanded", "false");
    };
    botao.addEventListener("click", () => {
        const aberto = menu.classList.toggle("is-open");
        botao.setAttribute("aria-expanded", String(aberto));
    });
    menu.addEventListener("click", (evento) => {
        if (evento.target.tagName === "A")
            fechar();
    });
    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape")
            fechar();
    });
};
/* =========================================================
   Contagem regressiva
   ========================================================= */
const alvoContagem = new Date(CASAMENTO.dataHora);
const atualizarContagem = () => {
    const dias = $("#days");
    const horas = $("#hours");
    const minutos = $("#minutes");
    const segundos = $("#seconds");
    if (!dias || !horas || !minutos || !segundos)
        return;
    const restante = alvoContagem.getTime() - Date.now();
    if (restante <= 0) {
        dias.textContent = "000";
        horas.textContent = "00";
        minutos.textContent = "00";
        segundos.textContent = "00";
        return;
    }
    const d = Math.floor(restante / 86_400_000);
    const h = Math.floor((restante / 3_600_000) % 24);
    const m = Math.floor((restante / 60_000) % 60);
    const s = Math.floor((restante / 1000) % 60);
    dias.textContent = String(d).padStart(3, "0");
    horas.textContent = String(h).padStart(2, "0");
    minutos.textContent = String(m).padStart(2, "0");
    segundos.textContent = String(s).padStart(2, "0");
};
/* =========================================================
   Informações práticas
   ========================================================= */
const montarInformacoes = () => {
    const grade = $("#info-grid");
    if (!grade)
        return;
    grade.replaceChildren(...INFORMACOES.map((info) => el("article", { class: "info-card" }, el("div", { class: "info-card__icon" }, svgIcone(info.icone)), el("h3", {}, info.titulo), el("p", {}, info.texto))));
};
/* =========================================================
   Locais
   ========================================================= */
const cartaoLocal = (local) => {
    const linkMapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(local.mapa)}`;
    const embedMapa = `https://www.google.com/maps?q=${encodeURIComponent(local.mapa)}&z=16&output=embed`;
    const imagem = el("img", {
        class: "venue-card__image",
        src: local.imagemFallback,
        alt: local.nome,
        loading: "lazy",
        decoding: "async",
        width: "1040",
        height: "693"
    });
    const figura = el("picture", {}, el("source", { srcset: local.imagem, type: "image/webp" }), imagem);
    const mapa = el("iframe", {
        class: "venue-card__map",
        src: embedMapa,
        loading: "lazy",
        referrerpolicy: "no-referrer-when-downgrade",
        title: `Mapa — ${local.nome}`
    });
    return el("article", { class: "venue-card" }, figura, el("div", { class: "venue-card__body" }, el("p", { class: "eyebrow" }, local.tipo), el("h3", {}, local.nome), el("p", { class: "venue-card__time" }, `Começa ${local.horario}`), el("p", { class: "venue-card__address" }, local.endereco), el("p", {}, local.nota), mapa, el("a", {
        class: "button button--ghost venue-card__link",
        href: linkMapa,
        target: "_blank",
        rel: "noreferrer"
    }, "Abrir no Google Maps")));
};
const montarLocais = () => {
    const grade = $("#venue-grid");
    if (!grade)
        return;
    grade.replaceChildren(...LOCAIS.map(cartaoLocal));
};
/* =========================================================
   Fotos (carrossel)
   ========================================================= */
let indiceFoto = 0;
let timerFoto;
const desenharCarrossel = () => {
    const palco = $("#carousel-image");
    const titulo = $("#carousel-title");
    const descricao = $("#carousel-description");
    const miniaturas = $("#carousel-thumbs");
    if (!palco || !titulo || !descricao || !miniaturas)
        return;
    const foto = FOTOS[indiceFoto];
    palco.src = foto.imagem;
    palco.alt = foto.titulo;
    titulo.textContent = foto.titulo;
    descricao.textContent = foto.descricao;
    miniaturas.replaceChildren(...FOTOS.map((item, indice) => {
        const botao = el("button", {
            type: "button",
            class: `carousel__thumb${indice === indiceFoto ? " is-active" : ""}`,
            "aria-label": `Ver foto ${indice + 1} de ${FOTOS.length}`,
            "aria-current": indice === indiceFoto ? "true" : "false"
        }, el("img", { src: item.imagem, alt: "", loading: "lazy", decoding: "async" }));
        botao.addEventListener("click", () => {
            indiceFoto = indice;
            desenharCarrossel();
            reiniciarAutoplay();
        });
        return botao;
    }));
};
const girarFoto = (direcao) => {
    indiceFoto = (indiceFoto + direcao + FOTOS.length) % FOTOS.length;
    desenharCarrossel();
};
const pararAutoplay = () => {
    if (timerFoto !== undefined)
        window.clearInterval(timerFoto);
    timerFoto = undefined;
};
const reiniciarAutoplay = () => {
    pararAutoplay();
    if (semMovimento() || FOTOS.length < 2)
        return;
    timerFoto = window.setInterval(() => girarFoto(1), 7000);
};
const montarCarrossel = () => {
    const carrossel = $("#carousel");
    const anterior = $("#prev-slide");
    const proximo = $("#next-slide");
    anterior?.addEventListener("click", () => {
        girarFoto(-1);
        reiniciarAutoplay();
    });
    proximo?.addEventListener("click", () => {
        girarFoto(1);
        reiniciarAutoplay();
    });
    carrossel?.addEventListener("keydown", (evento) => {
        const tecla = evento.key;
        if (tecla === "ArrowLeft") {
            girarFoto(-1);
            reiniciarAutoplay();
        }
        if (tecla === "ArrowRight") {
            girarFoto(1);
            reiniciarAutoplay();
        }
    });
    // pausa quando o dedo/mouse está em cima ou algo dentro recebe foco
    carrossel?.addEventListener("mouseenter", pararAutoplay);
    carrossel?.addEventListener("mouseleave", reiniciarAutoplay);
    carrossel?.addEventListener("focusin", pararAutoplay);
    carrossel?.addEventListener("focusout", reiniciarAutoplay);
    document.addEventListener("visibilitychange", () => {
        if (document.hidden)
            pararAutoplay();
        else
            reiniciarAutoplay();
    });
    desenharCarrossel();
    reiniciarAutoplay();
};
/* =========================================================
   Presentes (Pix)
   ========================================================= */
const abrirModalPresente = (presente) => {
    const modal = $("#pix-modal");
    const titulo = $("#pix-modal-title");
    const descricao = $("#pix-modal-description");
    const valor = $("#pix-modal-value");
    if (!modal || !titulo || !descricao || !valor)
        return;
    titulo.textContent = presente.titulo;
    descricao.textContent = presente.descricao;
    valor.textContent = `Sugestão: ${moeda(presente.valor)} — mas o valor é livre.`;
    definirStatus("#pix-copy-status", "", "neutro");
    if (typeof modal.showModal === "function")
        modal.showModal();
    else
        modal.setAttribute("open", "");
};
const montarModalPix = () => {
    const modal = $("#pix-modal");
    const fechar = $("#pix-modal-close");
    const copiar = $("#pix-copy");
    const chave = $("#pix-key");
    const qr = $("#pix-qr");
    if (chave)
        chave.textContent = PIX.chave;
    if (qr)
        qr.src = PIX.qrcode;
    fechar?.addEventListener("click", () => modal?.close());
    modal?.addEventListener("click", (evento) => {
        if (evento.target === modal)
            modal.close();
    });
    copiar?.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(PIX.chave);
            definirStatus("#pix-copy-status", "Chave copiada!", "sucesso");
        }
        catch {
            definirStatus("#pix-copy-status", "Não consegui copiar. Selecione a chave acima e copie na mão.", "erro");
        }
    });
};
const montarPresentes = () => {
    const grade = $("#gift-grid");
    if (!grade)
        return;
    grade.replaceChildren(...PRESENTES.map((presente) => {
        const botao = el("button", { class: "button button--solid gift-card__button", type: "button" }, "Presentear com Pix");
        botao.addEventListener("click", () => abrirModalPresente(presente));
        return el("article", { class: "gift-card" }, el("div", { class: "gift-card__emoji", "aria-hidden": "true" }, presente.emoji), el("div", { class: "gift-card__body" }, el("h3", {}, presente.titulo), el("p", {}, presente.descricao), el("p", { class: "gift-card__price" }, moeda(presente.valor)), botao));
    }));
};
/* =========================================================
   RSVP por nome ou link personalizado
   ========================================================= */
let tokenConvite = null;
let convite = null;
const lerToken = () => {
    const parametro = new URLSearchParams(window.location.search).get("c");
    if (parametro && /^[a-z0-9]{6,32}$/i.test(parametro))
        return parametro;
    return null;
};
const mostrarEtapaRsvp = (id) => {
    document.querySelectorAll("#rsvp-flow .rsvp-step").forEach((etapa) => {
        etapa.classList.toggle("rsvp-step--hidden", etapa.id !== id);
    });
};
const desenharConvite = (dados) => {
    const titulo = $("#rsvp-family-title");
    const lista = $("#rsvp-member-list");
    const resumo = $("#rsvp-summary");
    if (!titulo || !lista || !resumo)
        return;
    titulo.textContent = dados.rotulo;
    const atualizarResumo = () => {
        const total = dados.convidados.length;
        const respondidos = dados.convidados.filter((c) => c.vai !== null).length;
        const indo = dados.convidados.filter((c) => c.vai === true).length;
        if (respondidos === 0) {
            resumo.textContent = `${total} ${total === 1 ? "pessoa convidada" : "pessoas convidadas"}. Marque quem vai.`;
            return;
        }
        if (respondidos < total) {
            resumo.textContent = `Faltam ${total - respondidos} de ${total}. Até agora, ${indo} ${indo === 1 ? "confirmado" : "confirmados"}.`;
            return;
        }
        resumo.textContent =
            indo === 0
                ? "Tudo respondido. Sentiremos falta de vocês!"
                : `Tudo respondido — ${indo} ${indo === 1 ? "confirmado" : "confirmados"}. Até lá!`;
    };
    lista.replaceChildren(...dados.convidados.map((membro) => {
        const controles = el("div", { class: "rsvp-member__controls", role: "group", "aria-label": membro.nome });
        const criarBotao = (rotulo, valor, icone) => {
            const ativo = membro.vai === valor;
            const botao = el("button", {
                type: "button",
                class: `rsvp-toggle${ativo ? " rsvp-toggle--active" : ""}`,
                "data-value": valor ? "sim" : "nao",
                "aria-pressed": String(ativo)
            }, el("span", { class: "rsvp-toggle__icon", "aria-hidden": "true" }, icone), rotulo);
            botao.addEventListener("click", async () => {
                if (!tokenConvite)
                    return;
                const tokenDaResposta = tokenConvite;
                const botoes = document.querySelectorAll("#rsvp-confirm button");
                botoes.forEach((outro) => { outro.disabled = true; });
                definirStatus("#rsvp-saved-msg", "Salvando…", "neutro");
                try {
                    const ok = await salvarConfirmacao(tokenDaResposta, membro.id, valor);
                    if (!ok)
                        throw new Error("recusado");
                    membro.vai = valor;
                    controles.querySelectorAll(".rsvp-toggle").forEach((outro) => {
                        const marcado = outro.dataset.value === (valor ? "sim" : "nao");
                        outro.classList.toggle("rsvp-toggle--active", marcado);
                        outro.setAttribute("aria-pressed", String(marcado));
                    });
                    atualizarResumo();
                    definirStatus("#rsvp-saved-msg", `${membro.nome}: ${valor ? "presença confirmada" : "ausência registrada"}.`, "sucesso");
                }
                catch {
                    definirStatus("#rsvp-saved-msg", "Não consegui salvar. Verifique a internet e tente de novo.", "erro");
                }
                finally {
                    botoes.forEach((outro) => { outro.disabled = false; });
                }
            });
            return botao;
        };
        controles.append(criarBotao("Vou", true, "✓"), criarBotao("Não vou", false, "✕"));
        return el("div", { class: "rsvp-member" }, el("span", { class: "rsvp-member__name" }, membro.nome), controles);
    }));
    atualizarResumo();
    mostrarEtapaRsvp("rsvp-confirm");
};
const montarRsvp = async () => {
    const campoNome = $("#rsvp-name");
    const sugestoes = $("#rsvp-suggestions");
    const formulario = $("#rsvp-search-form");
    const botaoBusca = formulario?.querySelector("button[type=submit]");
    if (!campoNome || !sugestoes || !formulario || !botaoBusca)
        return;
    let resultados = [];
    let indiceAtivo = -1;
    let versaoBusca = 0;
    let timerBusca;
    let abrindoConvite = false;
    const fecharSugestoes = () => {
        window.clearTimeout(timerBusca);
        versaoBusca++;
        sugestoes.hidden = true;
        campoNome.setAttribute("aria-expanded", "false");
        campoNome.removeAttribute("aria-activedescendant");
        if (campoNome.hasAttribute("aria-busy"))
            definirStatus("#rsvp-search-status", "", "neutro");
        campoNome.removeAttribute("aria-busy");
        indiceAtivo = -1;
    };
    const selecionar = async (resultado) => {
        if (abrindoConvite)
            return;
        fecharSugestoes();
        abrindoConvite = true;
        campoNome.disabled = true;
        botaoBusca.disabled = true;
        definirStatus("#rsvp-search-status", "Abrindo seu convite…", "neutro");
        try {
            const dados = await buscarConvite(resultado.token);
            if (!dados)
                throw new Error("convite não encontrado");
            tokenConvite = resultado.token;
            convite = dados;
            campoNome.value = resultado.nome;
            desenharConvite(dados);
            $("#rsvp-family-title")?.focus();
            definirStatus("#rsvp-search-status", "", "neutro");
        }
        catch {
            definirStatus("#rsvp-search-status", "Não foi possível abrir seu convite. Busque seu nome e tente novamente.", "erro");
        }
        finally {
            abrindoConvite = false;
            campoNome.disabled = false;
            botaoBusca.disabled = false;
        }
    };
    const pesquisar = async () => {
        fecharSugestoes();
        resultados = [];
        const nome = campoNome.value.trim();
        if (!nome) {
            definirStatus("#rsvp-search-status", "", "neutro");
            return;
        }
        const versao = versaoBusca;
        campoNome.setAttribute("aria-busy", "true");
        definirStatus("#rsvp-search-status", "Buscando nomes…", "neutro");
        try {
            const encontrados = await sugerirConvidados(nome);
            if (versao !== versaoBusca)
                return;
            resultados = encontrados;
            sugestoes.replaceChildren(...resultados.map((resultado, indice) => {
                const opcao = el("li", {
                    id: `rsvp-option-${indice}`, class: "rsvp-suggestion", role: "option", "aria-selected": "false"
                }, el("strong", {}, resultado.nome), el("span", { class: "rsvp-suggestion__family" }, resultado.familia));
                // Mantém o foco no combobox até a seleção por mouse ou toque terminar.
                opcao.addEventListener("pointerdown", (evento) => evento.preventDefault());
                opcao.addEventListener("click", () => { void selecionar(resultado); });
                return opcao;
            }));
            sugestoes.hidden = resultados.length === 0;
            campoNome.setAttribute("aria-expanded", String(resultados.length > 0));
            definirStatus("#rsvp-search-status", resultados.length
                ? resultados.length === 20
                    ? "Mostrando até 20 nomes. Continue digitando para refinar ou selecione seu nome na lista."
                    : "Selecione seu nome na lista para abrir o convite da sua família."
                : "Não encontramos esse nome. Tente seu sobrenome ou o nome de um familiar.", "neutro");
        }
        catch {
            if (versao !== versaoBusca)
                return;
            definirStatus("#rsvp-search-status", "Não foi possível consultar agora. Toque em Buscar nomes para tentar novamente.", "erro");
        }
        finally {
            if (versao === versaoBusca)
                campoNome.removeAttribute("aria-busy");
        }
    };
    campoNome.addEventListener("input", () => {
        fecharSugestoes();
        resultados = [];
        definirStatus("#rsvp-search-status", "", "neutro");
        if (campoNome.value.trim())
            timerBusca = window.setTimeout(() => { void pesquisar(); }, 200);
    });
    campoNome.addEventListener("focus", () => {
        if (campoNome.value.trim() && !abrindoConvite)
            void pesquisar();
    });
    campoNome.addEventListener("blur", fecharSugestoes);
    campoNome.addEventListener("keydown", (evento) => {
        if (evento.isComposing)
            return;
        if (evento.key === "Escape") {
            evento.preventDefault();
            fecharSugestoes();
        }
        else if (evento.key === "ArrowDown" || evento.key === "ArrowUp") {
            evento.preventDefault();
            if (sugestoes.hidden) {
                void pesquisar();
                return;
            }
            indiceAtivo = (indiceAtivo + (evento.key === "ArrowDown" ? 1 : indiceAtivo < 0 ? 0 : -1) + resultados.length) % resultados.length;
            Array.from(sugestoes.children).forEach((opcao, indice) => {
                opcao.setAttribute("aria-selected", String(indice === indiceAtivo));
            });
            const ativa = sugestoes.children[indiceAtivo];
            if (ativa) {
                campoNome.setAttribute("aria-activedescendant", ativa.id);
                ativa.scrollIntoView({ block: "nearest" });
            }
        }
        else if (evento.key === "Enter" && !sugestoes.hidden && indiceAtivo >= 0) {
            evento.preventDefault();
            void selecionar(resultados[indiceAtivo]);
        }
    });
    formulario.addEventListener("submit", (evento) => {
        evento.preventDefault();
        if (!abrindoConvite) {
            if (document.activeElement === campoNome)
                void pesquisar();
            else
                campoNome.focus();
        }
    });
    const abrirBusca = () => {
        fecharSugestoes();
        resultados = [];
        tokenConvite = null;
        convite = null;
        const url = new URL(window.location.href);
        url.searchParams.delete("c");
        window.history.replaceState(null, "", url);
        definirStatus("#rsvp-saved-msg", "", "neutro");
        formulario.reset();
        definirStatus("#rsvp-search-status", "", "neutro");
        mostrarEtapaRsvp("rsvp-busca");
        $("#rsvp-name")?.focus();
    };
    $("#rsvp-change")?.addEventListener("click", abrirBusca);
    $("#rsvp-retry")?.addEventListener("click", abrirBusca);
    tokenConvite = lerToken();
    if (!tokenConvite) {
        mostrarEtapaRsvp("rsvp-busca");
        return;
    }
    if (!supabaseConfigurado()) {
        mostrarEtapaRsvp("rsvp-erro");
        definirStatus("#rsvp-erro-msg", "A confirmação está indisponível no momento. Tente novamente em instantes ou fale com a gente.", "erro");
        return;
    }
    mostrarEtapaRsvp("rsvp-carregando");
    try {
        convite = await buscarConvite(tokenConvite);
        if (!convite) {
            mostrarEtapaRsvp("rsvp-erro");
            definirStatus("#rsvp-erro-msg", "Não encontramos esse convite. Confira se o link veio completo.", "erro");
            return;
        }
        desenharConvite(convite);
    }
    catch {
        mostrarEtapaRsvp("rsvp-erro");
        definirStatus("#rsvp-erro-msg", "Deu problema ao carregar seu convite. Tente recarregar a página.", "erro");
    }
};
/* =========================================================
   Recados
   ========================================================= */
const desenharRecados = async () => {
    const mural = $("#message-wall");
    if (!mural)
        return;
    if (!supabaseConfigurado()) {
        mural.replaceChildren(el("div", { class: "message-card--empty" }, "Mural indisponível no momento."));
        return;
    }
    try {
        const recados = await listarRecados();
        if (recados.length === 0) {
            mural.replaceChildren(el("div", { class: "message-card--empty" }, "Ainda não há recados. O primeiro pode ser o seu!"));
            return;
        }
        mural.replaceChildren(...recados.map((recado) => el("article", { class: "message-card" }, el("div", { class: "message-card__body" }, el("p", { class: "message-card__meta" }, recado.nome, el("span", { class: "message-card__date" }, dataCurta(recado.criado_em))), el("p", {}, recado.texto)))));
    }
    catch {
        mural.replaceChildren(el("div", { class: "message-card--empty" }, "Não consegui carregar os recados."));
    }
};
const montarFormularioRecado = () => {
    const formulario = $("#message-form");
    const nome = $("#message-name");
    const texto = $("#message-text");
    const contador = $("#message-counter");
    if (!formulario || !nome || !texto)
        return;
    const LIMITE = 600;
    texto.setAttribute("maxlength", String(LIMITE));
    const atualizarContador = () => {
        if (contador)
            contador.textContent = `${texto.value.length}/${LIMITE}`;
    };
    texto.addEventListener("input", atualizarContador);
    atualizarContador();
    formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault();
        const valorNome = nome.value.trim();
        const valorTexto = texto.value.trim();
        if (!valorNome || !valorTexto) {
            definirStatus("#message-status", "Preencha nome e recado.", "erro");
            return;
        }
        const botao = formulario.querySelector("button[type=submit]");
        if (botao)
            botao.disabled = true;
        definirStatus("#message-status", "Enviando…", "neutro");
        try {
            const ok = await publicarRecado(valorNome, valorTexto);
            if (!ok)
                throw new Error("recusado");
            texto.value = "";
            atualizarContador();
            definirStatus("#message-status", "Recado publicado. Obrigado!", "sucesso");
            await desenharRecados();
        }
        catch {
            definirStatus("#message-status", "Não consegui enviar agora. Tente de novo em instantes.", "erro");
        }
        finally {
            if (botao)
                botao.disabled = false;
        }
    });
};
/* =========================================================
   Início
   ========================================================= */
const preencherTextosFixos = () => {
    const data = $("#hero-date");
    if (data)
        data.textContent = `${CASAMENTO.dataExtenso} · ${CASAMENTO.horaCerimonia} · ${CASAMENTO.cidade}`;
};
const iniciar = async () => {
    montarMenu();
    preencherTextosFixos();
    atualizarContagem();
    window.setInterval(atualizarContagem, 1000);
    montarInformacoes();
    montarLocais();
    montarCarrossel();
    montarPresentes();
    montarModalPix();
    montarFormularioRecado();
    await Promise.all([montarRsvp(), desenharRecados()]);
};
void iniciar();
