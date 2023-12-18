import { LinksunBackend } from "@/services/api";

export async function editarInclinacao(data: any) {
  const nomeDaFuncao = "editarInclinacao";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Inclinacao`,
    data
  ).then((response) => response.body);
  return response;
}
