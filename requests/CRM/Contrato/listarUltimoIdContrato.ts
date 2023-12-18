import { LinksunBackend } from "@/services/api";

export async function listarUltimoIdContrato() {
    const nomeDaFuncao = listarUltimoIdContrato.name;
    return LinksunBackend.get(
        `?action=${nomeDaFuncao}&class=Contrato`
    ).then((res) => res.body);
}
