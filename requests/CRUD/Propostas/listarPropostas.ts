import { LinksunBackend } from "@/services/api";

export async function listarPropostas(idColeta: any) {
    const nomeDaFuncao = listarPropostas.name;
    const res = await LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=Propostas&idCliente=${idColeta}`
    ).then((response) => response.body);
    return res;
}
export async function listarPropostasDados(idProposta: any) {
    const nomeDaFuncao = listarPropostasDados.name;
    const res = await LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=Propostas&idProposta=${idProposta}`
    ).then((response) => response.body);
    return res;
}
