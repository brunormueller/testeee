import { LinksunBackend } from "@/services/api";

export async function listarModulos() {
  const nomeDaFuncao = "listarModulos";
  const res = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Modulos`
  ).then((response) => response.body);
  return res;
}
