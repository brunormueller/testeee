import { LinksunBackend } from "@/services/api";

export async function listarKanban(data: any) {
  const nomeDaFuncao = "listarKanban";
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Kanban&request_body=${data}`
  ).then((response) => response.body);
  return response;
}
export async function listarDadosFunil(data: any) {
  const nomeDaFuncao = "listarDadosFunil";
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Kanban&id_kanban=${data}`
  ).then((response) => response.body);
  return response;
}
export async function listarConfiguracoesAnexos() {
  const nomeDaFuncao = "listarConfiguracoesAnexos";
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Kanban`
  ).then((response) => response.body);
  return response;
}
export async function novaLista(data: any) {
  const nomeDaFuncao = "novaLista";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Kanban`,
    data
  );
  return response;
}
export async function atualizarDadosKanban(data: any) {
  const nomeDaFuncao = "atualizarDadosKanban";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Kanban`,
    data
  );
}
export async function cadastroNovoCard(data: any) {
  const nomeDaFuncao = "cadastroNovoCard";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Kanban`,
    data
  );
  return response;
}
export async function listarTodosKanbans() {
  const nomeDaFuncao = "listarTodosKanbans";
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Kanban`
  ).then((response) => response.body);
  return response;
}
export async function criarNovoKanban(data: any) {
  const nomeDaFuncao = "criarNovoKanban";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Kanban`,
    data
  );
  return response;
}
export async function excluirLista(data: any) {
  const nomeDaFuncao = "excluirLista";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Kanban`,
    data
  );
  return response;
}
export async function listarEtiquetas() {
  const nomeDaFuncao = "listarEtiquetas";
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Kanban`
  ).then((response) => response.body);
  return response;
}
export async function listarEtiquetasCard(data: any) {
  const nomeDaFuncao = "listarEtiquetasCard";
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Kanban&request_body=${data}`
  ).then((response) => response.body);
  return response;
}
export async function cadastroEtiquetas(data: any) {
  const nomeDaFuncao = "cadastroEtiquetas";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Kanban`,
    data
  );
  return response;
}
export async function cadastrarEtiquetasCard(data: any) {
  const nomeDaFuncao = "cadastrarEtiquetasCard";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Kanban`,
    data
  );
  return response;
}
export async function listarDadosCard(id_card: any, id_cliente: any) {
  const nomeDaFuncao = "listarDadosCard";
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Kanban&id_card=${id_card}&id_cliente=${id_cliente}`
  ).then((response) => response.body);
  return response;
}
export async function atualizarListasKanbans(data: any) {
  const nomeDaFuncao = "atualizarListasKanbans";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Kanban`,
    data
  );
  return response;
}

export async function listarAutomatizacoes() {
  const nomeDaFuncao = "listarAutomatizacoes";
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=AutomatizacaoKanban`
  ).then((res) => res.body);
  return response;
}

export async function cadastrarAutomatizacao(data: any) {
  const nomeDaFuncao = "cadastrarAutomatizacao";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=AutomatizacaoKanban`,
    data
  ).then((res) => res.body);
  return response;
}

export async function editarAutomatizacao(data: any) {
  const nomeDaFuncao = "editarAutomatizacao";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=AutomatizacaoKanban`,
    data
  ).then((res) => res.body);
  return response;
}

export async function deletarAutomatizacao(data: any) {
  const nomeDaFuncao = "deletarAutomatizacao";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=AutomatizacaoKanban`,
    data
  ).then((res) => res.body);
  return response;
}

export async function alterarListaDadosKanban(data: any) {
  const nomeDaFuncao = "alterarListaDadosKanban";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Kanban`,
    data
  ).then((res) => res.body);
  return response;
}
