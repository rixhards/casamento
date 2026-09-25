import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config.js";
export const supabaseConfigurado = () => /^https?:\/\//.test(SUPABASE_URL) &&
    !SUPABASE_ANON_KEY.includes("__SUPABASE_") && SUPABASE_ANON_KEY.length > 20;
export const rpc = async (funcao, args, acesso) => {
    if (!supabaseConfigurado()) {
        throw new Error("Supabase ainda não configurado (veja src/config.ts).");
    }
    const resposta = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${funcao}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_ANON_KEY,
            ...(acesso ? { Authorization: `Bearer ${acesso}` } :
                SUPABASE_ANON_KEY.startsWith("eyJ") ? { Authorization: `Bearer ${SUPABASE_ANON_KEY}` } : {})
        },
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify(args)
    });
    if (!resposta.ok) {
        const detalhe = await resposta.text().catch(() => "");
        throw new Error(`Supabase ${resposta.status}: ${detalhe.slice(0, 200)}`);
    }
    return (await resposta.json());
};
/* ---------- Chamadas ---------- */
export const buscarConvite = (token) => rpc("buscar_convite", { p_token: token });
export const sugerirConvidados = (nome) => rpc("sugerir_convidados", { p_nome: nome });
export const salvarConfirmacao = (token, convidadoId, vai) => rpc("salvar_confirmacao", {
    p_token: token,
    p_convidado_id: convidadoId,
    p_vai: vai
});
export const publicarRecado = (nome, texto) => rpc("publicar_recado", { p_nome: nome, p_texto: texto });
export const listarRecados = () => rpc("listar_recados", {});
