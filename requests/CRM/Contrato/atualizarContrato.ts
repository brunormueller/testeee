import { LinksunBackend } from "@/services/api";

export async function atualizarContrato(data: any) {
    const nomeDaFuncao = atualizarContrato.name;
    return LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=Contrato`,
        data
    ).then((res) => res.body);
}
