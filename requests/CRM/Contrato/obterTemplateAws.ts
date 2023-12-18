import { LinksunBackend } from "@/services/api";

export async function obterTemplateAws() {
    const nomeDaFuncao = obterTemplateAws.name;
    return LinksunBackend.get(`?action=${nomeDaFuncao}&class=Contrato`).then(
        (res) => res.body
    );
}
