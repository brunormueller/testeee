import { LinksunBackend } from "@/services/api";

export async function salvarContrato(data: any) {
  const nomeDaFuncao = "salvarContrato";
  return LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Contrato`,
    data
  ).then((res) => res.body);
}
