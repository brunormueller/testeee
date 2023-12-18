import { LinksunBackend } from "@/services/api";

export async function salvarTemplateContrato(data: any) {
  const nomeDaFuncao = "salvarTemplateContrato";
  return LinksunBackend.post(`?action=${nomeDaFuncao}&class=Contrato`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.body);
}
