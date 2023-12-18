import { LinksunBackend } from "@/services/api";

export async function removerTemplateAws(data: any) {
  const nomeDaFuncao = "removerTemplateAws";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Contrato`,
    data
  );
  return response;
}
