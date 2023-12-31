import { LinksunBackend } from "@/services/api";

export async function listarRegionais() {
  const nomeDaFuncao = "listarRegionais";
  const tipos = await LinksunBackend.get(
    `/index.php?action=${nomeDaFuncao}&class=Regionais`
  ).then((res) => res.body);
  return tipos;
}
