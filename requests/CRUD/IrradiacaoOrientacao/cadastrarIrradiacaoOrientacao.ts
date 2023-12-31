import { LinksunBackend } from "@/services/api";

export async function cadastrarIrradiacaoOrientacao(data: any) {
  const nomeDaFuncao = "cadastrarIrradiacaoOrientacao";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=IrradiacaoOrientacao`,
    data
  );
  return response;
}
