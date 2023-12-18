import { LinksunBackend } from "@/services/api";

export async function cadastrarIsencaoGeracao(data: any) {
  const nomeDaFuncao = "cadastrarIsencaoGeracao";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=IsencaoGeracao`,
    data
  );
  return response;
}
