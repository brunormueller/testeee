import { LinksunBackend } from "@/services/api";

export async function listarInversores() {
  const nomeDaFuncao = "listarInversores";
  const res = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Inversor`
  ).then((response) => response.body);
  return res;
}
