import { LinksunBackend } from "@/services/api";

export async function baixarAws(caminho: any) {
    const nomeDaFuncao = baixarAws.name;
    const response = await LinksunBackend.get(
      `?action=${nomeDaFuncao}&class=Aws&caminho=${caminho}`
    ).then((response) => response.body);
    return response;
  }