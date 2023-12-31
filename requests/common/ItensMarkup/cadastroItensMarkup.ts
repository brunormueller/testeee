import { LinksunBackend } from "@/services/api";

export async function listarCidadesComEstado() {
  const nomeDaFuncao = "listarCidadesComEstado";
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Cidade`
  ).then((response) => response.body);
  return response;
}
