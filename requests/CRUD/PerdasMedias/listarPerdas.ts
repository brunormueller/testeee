import { LinksunBackend } from "@/services/api";

export async function listarPerdas() {
  const nomeDaFuncao = "listarPerdas";
  const res = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=PerdasMedias`
  ).then((response) => response.body);
  return res;
}
