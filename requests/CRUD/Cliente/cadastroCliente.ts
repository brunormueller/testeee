import { LinksunBackend } from "@/services/api";

export async function cadastrarCliente(data: any) {
  const nomeDaFuncao = "cadastrarCliente";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Clientes`,
    data
  );
  return response;
}

export async function cadastrarNovoContato(data: any) {
  const nomeDaFuncao = "cadastrarNovoContato";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Clientes`,
    data
  );
  return response;
}

export async function listarOrigemCliente() {
  const nomeDaFuncao = "listarOrigemCliente";
  const tipos = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Clientes`
  ).then((res) => res.body);
  return tipos;
}

export async function listarResponsavel() {
  const nomeDaFuncao = "listarResponsavel";
  const tipos = await LinksunBackend.get(
    `?action=${nomeDaFuncao}&class=Clientes`
  ).then((res) => res.body);
  return tipos;
}
