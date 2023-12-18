import { LinksunBackend } from "@/services/api";

export async function listarUsuarios() {
  const nomeDaFuncao = "listarUsuarios";
  const res = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Usuario`
  ).then((response) => response.body);
  return res;
}
export async function listarUsuariosPaginados(data: any) {
  const nomeDaFuncao = "listarUsuariosPaginados";
  const res = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Usuario&request_body=${data}`
  ).then((response) => response.body);
  return res;
}

export async function listarUsuarioPeloId(data: any) {
  const nomeDaFuncao = "listarUsuarioPeloId";
  const res = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Usuario&id_usuario=${data}`
  ).then((response) => response.body);
  return res;
}
