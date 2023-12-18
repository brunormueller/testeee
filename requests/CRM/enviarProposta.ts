import { LinksunBackend } from "@/services/api";

export async function enviarLinkProposta(data: any) {
  const nomeDaFuncao = "enviarLinkProposta";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Propostas`,
    data,
    { noToast: true }
  ).then((res) => res.body);
  return response;
}
export async function enviarLinkPropostaEmail(data: any) {
  const nomeDaFuncao = "enviarLinkPropostaEmail";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Propostas`,
    data
  ).then((res) => res.body);
  return response;
}
