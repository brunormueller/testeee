import { LinksunBackend } from "../../services/api";

export async function listarUsuario() {
  const nomeDaFuncao = "listarUsuario";
  const tipos = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Usuario`
  ).then((response) => response.body);
  return tipos;
}

export async function listarCliente() {
  const nomeDaFuncao = "listarCliente";
  const tipos = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Agenda`
  ).then((response) => response.body);
  return tipos;
}

export async function cadastrarAgendamento(data: any) {
  const nomeDaFuncao = "cadastrarAgendamento";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Agenda`,
    data
  );
  return response;
}

export async function editarAgendamento(data: any) {
  const nomeDaFuncao = "editarAgendamento";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Agenda`,
    data
  );
  return response;
}

export async function apagarAgendamento(data: any) {
  const nomeDaFuncao = "apagarAgendamento";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Agenda`,
    data
  );
  return response;
}

export async function listarAgendamentos(idUsuario: any) {
  const nomeDaFuncao = "listarAgendamentos";
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Agenda&idUsuario=${idUsuario}`
  ).then((response) => response.body);
  return response;
}

export async function listarAgendamentosUsuarios() {
  const nomeDaFuncao = "listarAgendamentosUsuarios";
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Agenda`
  ).then((response) => response.body);
  return response;
}

// export async function GravaLogAgenda() {
//   const nomeDaFuncao = GravaLogAgenda.name;
//   const response = await LinksunBackend.get(
//     `?action=${nomeDaFuncao}&class=Agenda`
//   ).then((response) => response.body);
//   return response;
// }
