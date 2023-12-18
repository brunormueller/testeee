import { LinksunBackend } from "@/services/api";

export async function cadastrarFornecedores(data: any) {
  const nomeDaFuncao = "cadastrarFornecedores";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Fornecedores`,
    data
  );
  return response;
}
