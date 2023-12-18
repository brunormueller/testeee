import { LinksunBackend } from "@/services/api";

export async function editarPrecoInstalacao(data: any) {
  const nomeDaFuncao = "editarPrecoInstalacao";
  const res = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=PrecosInstalacao`,
    data
  ).then((response) => response.body);
  return res;
}
