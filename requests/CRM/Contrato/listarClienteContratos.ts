import { LinksunBackend } from "@/services/api";

export async function listarClienteContratos(cliente_contrato: string) {
  const nomeDaFuncao = "listarClienteContratos";
  return LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Contrato&cliente_contrato=${cliente_contrato}`
  ).then((res) => res.body);
}
