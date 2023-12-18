import { LinksunBackend } from "@/services/api";

export async function cadastrarIntegrador(data: any) {
  const nomeDaFuncao = "cadastrarIntegrador";
  const response = await LinksunBackend.post(
    `/index.php?action=${nomeDaFuncao}&class=Integradores`,
    data
  );
  return response;
}
