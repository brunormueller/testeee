import { LinksunBackend } from "@/services/api";

export async function editarInstituicao(data: any) {
  const nomeDaFuncao = "editarInstituicao";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=InstituicaoFinanceira`,
    data
  ).then((response) => response.body);
  return response;
}
