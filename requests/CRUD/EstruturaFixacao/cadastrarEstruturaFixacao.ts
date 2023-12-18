import { LinksunBackend } from "@/services/api";

export async function cadastrarEstrutura(data: any) {
  const nomeDaFuncao = "cadastrarEstrutura";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=EstruturaFixacao`,
    data
  );
  return response;
}

export async function listarTipoInstalacao() {
  const nomeDaFuncao = "listarTipoInstalacao";
  const tipos = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=EstruturaFixacao`
  );
  return tipos;
}
