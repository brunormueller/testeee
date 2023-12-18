import { LinksunBackend } from "@/services/api";

export async function listarClientes(data: any) {
  const nomeDaFuncao = "listarClientes";
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Kanban&request_body=${data}`
  ).then((response) => response.body);
  return response;
}
export async function listarClientesPorId(data: any) {
  const nomeDaFuncao = "listarClientesPorId";
  const response = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Clientes&request_body=${data}`
  ).then((response) => response.body);
  return response;
}
export async function listarClientesConsulta() {
  const nomeDaFuncao = "listarClientesConsulta";
  const res = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Clientes`
  ).then((response) => response.body);
  return res;
}

export async function listarContatos() {
  const nomeDaFuncao = "listarContatos";
  const res = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Clientes`
  ).then((response) => response.body);
  return res;
}
