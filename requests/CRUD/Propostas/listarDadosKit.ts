import { LinksunBackend } from "@/services/api";

export async function dadosKit(id: any) {
  const nomeDaFuncao = "dadosKit";
  const res = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Propostas&id=${id}`
  ).then((response) => response.body);
  return res;
}
