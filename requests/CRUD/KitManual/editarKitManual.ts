import { LinksunBackend } from "@/services/api";

export async function editarKitManual(data: any) {
  const nomeDaFuncao = "editarKitManual";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=KitManual`,
    data
  ).then((response) => response.body);
  return response;
}
export async function editarItens(data: any) {
  const nomeDaFuncao = "editarItens";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=KitManual`,
    data
  ).then((response) => response.body);
  return response;
}
