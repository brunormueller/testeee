import { LinksunBackend } from "@/services/api";

export async function cadastrarTarifaEnergia(data: any) {
  const nomeDaFuncao = "cadastrarTarifaEnergia";
  const response = await LinksunBackend.post(
    `/index.php?action=${nomeDaFuncao}&class=TarifasEnergia`,
    data
  );
  return response;
}

export async function listarTiposFatura() {
  const nomeDaFuncao = "listarTiposFatura";
  const tipos = await LinksunBackend.get(
    `/index.php?action=${nomeDaFuncao}&class=TarifasEnergia`
  ).then((res) => res.body);
  return tipos;
}
