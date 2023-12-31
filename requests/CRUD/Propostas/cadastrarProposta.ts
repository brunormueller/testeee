import { LinksunBackend } from "@/services/api";

export async function cadastrarProposta(data: any) {
  const nomeDaFuncao = "cadastrarProposta";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Propostas`,
    data,
    { noToast: true }
  );
  return response;
}

export async function RSIB(data: any) {
  const nomeDaFuncao = "RSIB";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=RSI`,
    data,
    { noToast: true }
  );
  return response;
}
