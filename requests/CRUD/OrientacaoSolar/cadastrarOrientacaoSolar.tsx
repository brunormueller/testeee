import { LinksunBackend } from "@/services/api";

export async function cadastrarOrientacaoSolar(data: any) {
  const nomeDaFuncao = "cadastrarOrientacaoSolar";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=OrientacoesSolar`,
    data
  );
  return response;
}
