import { LinksunBackend } from "@/services/api";

export async function aprovarProposta(data: any) {
  const nomeDaFuncao = "aprovarProposta";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Propostas`,
    data
  );
  return response;
}
