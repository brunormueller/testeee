import { LinksunBackend } from "@/services/api";

export async function listarNotasCard(data: any) {
  const nomeDaFuncao = "listarNotasCard";
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Kanban&request_body=${data}`
  ).then((response) => response.body);
  return response;
}
export async function cadastroNotasCard(data: any) {
  const nomeDaFuncao = "cadastroNotasCard";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Kanban`,
    data
  ).then((response) => response.body);
  return response;
}
