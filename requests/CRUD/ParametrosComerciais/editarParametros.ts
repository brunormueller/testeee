import { LinksunBackend } from "@/services/api";

export async function editarParametros(data: any) {
  const nomeDaFuncao = "editarParametros";
  const res = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=ParametrosComerciais`,
    data
  ).then((response) => response.body);
  return res;
}
