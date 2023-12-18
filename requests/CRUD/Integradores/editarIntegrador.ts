import { LinksunBackend } from "@/services/api";

export async function editarIntegradores(data: any) {
  const nomeDaFuncao = "editarIntegradores";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Integradores`,
    data
  ).then((response) => response.body);
  return response;
}
