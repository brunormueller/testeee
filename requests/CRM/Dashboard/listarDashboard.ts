import { LinksunBackend } from "@/services/api";

export async function listarCfgDashboard() {
  const nomeDaFuncao = "listarCfgDashboard";
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Dashboard`
  ).then((response) => response.body);
  return response;
}
