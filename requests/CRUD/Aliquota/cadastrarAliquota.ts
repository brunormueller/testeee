import { LinksunBackend } from "@/services/api";

export async function cadastrarAliquota(data: any) {
  const nomeDaFuncao = "cadastrarAliquota";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Aliquota`,
    data
  );
  return response;
}
