// import { IResponse } from "../types/responseInterface";
import { LinksunBackend } from "@/services/api";

export async function listarCategoriasTelhados() {
  const nomeDaFuncao = "listarCategoriasTelhados";
  const orientacoes = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=CategoriaTelhado`
  ).then((response) => response.body);
  return orientacoes;
}
export async function listarImgCategoriasTelhados() {
  const nomeDaFuncao = "listarImgCategoriasTelhados";
  const orientacoes = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=CategoriaTelhado`
  ).then((response) => response.body);
  return orientacoes;
}
