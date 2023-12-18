import { LinksunBackend } from "@/services/api";

export async function enviarEmailRepresentante(data: any) {
  const nomeDaFuncao = "enviarEmailRepresentante";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Propostas`,
    data,
    { noToast: true }
  );
  return response;
}
