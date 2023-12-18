import { LinksunBackend } from "@/services/api";

export async function listarKitsManual() {
  const nomeDaFuncao = "listarKitsManual";
  const res = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=KitManual`
  ).then((response) => response.body);
  console.log(res);
  return res;
}
export async function listarFabricante() {
  const nomeDaFuncao = "listarFabricante";
  const res = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=KitManual`
  ).then((response) => response.body);
  console.log(res);
  return res;
}

export async function listagemItens(data: any) {
  const nomeDaFuncao = "listagemItens";
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=KitManual&data=${data}`
  ).then((res) => res.body);
  return response;
}
