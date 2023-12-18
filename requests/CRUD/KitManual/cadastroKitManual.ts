import { LinksunBackend } from "../../../services/api";

export async function cadastrarKit(data: any) {
  const nomeDaFuncao = "cadastrarKit";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=KitManual`,
    data
  );
  return response;
}
export async function cadastrarItens(data: any) {
  const nomeDaFuncao = "cadastrarItens";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=KitManual`,
    data
  ).then((response) => response.body);
  return response;
}

// export async function listarPotenciaModulos() {
//   const parametro = { listarPotenciaModulos: true };
//   const { data } = await LinksunBackend.post(
//     "/classes/RequisicoesGerais.php",
//     parametro
//   );

//   return data;
// // }
export async function listarPotenciaModulos() {
  const nomeDaFuncao = "listarPotenciaModulos";
  const tipos = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=RequisicoesGerais`
  );
  return tipos;
}
export async function listarInversores() {
  const nomeDaFuncao = "listarInversores";
  const tipos = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=RequisicoesGerais`
  );
  return tipos;
}
