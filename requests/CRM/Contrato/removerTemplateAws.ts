import { LinksunBackend } from "@/services/api";

export async function removerTemplateAws(data: any) {
    const nomeDaFuncao = removerTemplateAws.name;
    const response = await LinksunBackend.post(
        `?action=${nomeDaFuncao}&class=Contrato`,
        data
    );
    return response;
}
