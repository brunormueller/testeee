import { LinksunBackend } from "@/services/api";

export async function enviarTemplateAws(data: any) {
  const nomeDaFuncao = "enviarTemplateAws";
  const response = await LinksunBackend.post(
    `?action=${nomeDaFuncao}&class=Contrato`,
    data,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response;
}
