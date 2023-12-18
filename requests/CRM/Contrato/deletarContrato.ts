import { LinksunBackend } from "@/services/api";

export async function deletarContrato(data: any) {
  const nomeDaFuncao = "deletarContrato";
  return LinksunBackend.post(`?action=${nomeDaFuncao}&class=Contrato`, data, {
    noToast: true,
  }).then((res) => res.body);
}
