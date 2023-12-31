import { LinksunBackend } from "@/services/api";

export async function listarInclinacao() {
  const nomeDaFuncao = "listarInclinacao";
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Inclinacao`
  ).then((response) => response.body);
  return response;
}
