import { LinksunBackend } from "@/services/api";

export async function cadastrarInclinacao(data: any) {
  const nomeDaFuncao = "cadastrarInclinacao";
  const response = await LinksunBackend.post(
    `/index.php?action=${nomeDaFuncao}&class=Inclinacao`,
    data
  );
  return response;
}
