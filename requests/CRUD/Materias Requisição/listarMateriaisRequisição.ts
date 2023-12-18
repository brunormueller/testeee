import { LinksunBackend } from "@/services/api";

export async function listarMaterialRequisicao() {
  const nomeDaFuncao = "listarMaterialRequisicao";
  const res = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=MaterialRequisicao`
  ).then((response) => response.body);
  return res;
}
