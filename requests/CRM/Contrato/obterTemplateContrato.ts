import { LinksunBackend } from "@/services/api";

export async function obterTemplateContrato() {
  const nomeDaFuncao = "obterTemplateContrato";
  return LinksunBackend.get(`?action=${nomeDaFuncao}&class=Contrato`).then(
    (res) => res.body
  );
}
