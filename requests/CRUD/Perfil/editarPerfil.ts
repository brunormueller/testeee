import { LinksunBackend } from "@/services/api";

export async function editarPerfil(data: any) {
  const nomeDaFuncao = "editarPerfil";
  const res = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Perfil`,
    data
  ).then((response) => response.body);
  return res;
}
