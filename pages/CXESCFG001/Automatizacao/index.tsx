import Button from "@/components/Forms/Button";
import {
    cadastrarAutomatizacao,
    deletarAutomatizacao,
    editarAutomatizacao,
    listarAutomatizacoes,
    listarTodosKanbans,
} from "@/requests/CRM/kanban";
import { useEffect, useState } from "react";
import CardEtapaAutomatizada from "./CardEtapaAutomatizada";
import FormParametorosAutomatizacao from "./FomParametrosAutomatizacao";

const FomParametrosAutomatizacaoComponent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [etapasAutomatizadas, setEtapasAutomatizadas] = useState<any[]>([]);

    const [etapas, setEtapas] = useState<any[]>([]);
    const [funis, setFunis] = useState<any[]>([]);

    useEffect(() => {
        listarFunis();
        atualizarListaAutomatizacoes();
    }, []);

    const atualizarListaAutomatizacoes = () => {
        listarAutomatizacoes().then((res: any) => setEtapasAutomatizadas(res));
    };

    useEffect(() => {
        setEtapas([...funis.map((funil) => funil.listas_kanban).flat()]);
    }, [funis]);

    const listarFunis = () => {
        listarTodosKanbans().then((res) => setFunis(res));
    };

    const removerAutomatizacao = async (id_automatizacao: any) => {
        setIsLoading(true);
        return deletarAutomatizacao({ id_automatizacao }).finally(
            () => {
                setIsLoading(false);
                atualizarListaAutomatizacoes();
            }
        );
    };

    // const statusEtapa = ["Cancelada", "Em Andamento", "Concluído"];

    const onSubmitFunction = async (data: any) => {
        setIsLoading(true);
        const { funil_destino, ...formattedData } = data;
        data = formattedData;

        const indexOfEtapa = etapasAutomatizadas.findIndex(
            (e: any) => e.acao_automatizacao == data.acao_automatizacao && e.status_acao_automatizacao == data.status_acao_automatizacao
        );
        if (indexOfEtapa == -1) {
            // return [...etapasAuto, data];
            cadastrarAutomatizacao(data).finally(() => {
                atualizarListaAutomatizacoes();

                setIsLoading(false);
            });
        } else {
            // return etapasAuto.splice(indexOfEtapa, 1, data);
            editarAutomatizacao(data).finally(() => {
                setEtapasAutomatizadas((etapasAuto) => {
                    etapasAuto.splice(indexOfEtapa, 1, data);
                    return etapasAuto;
                });

                setIsLoading(false);
                atualizarListaAutomatizacoes();
            });
        }
    };

    return (
        <>
            <FormParametorosAutomatizacao
                onSubmitFunction={onSubmitFunction}
                // className="h-[400px]"
                funis={funis}
                etapas={etapas}
                etapasDisponiveis={
                    etapas
                        .filter(
                            (etapa) =>
                                [
                                    "Geração da Proposta",
                                    "Envio da Proposta",
                                    "Geração do Contrato",
                                    "Envio do Contrato",
                                    "Proposta Enviada",
                                ].includes(etapa.titulo_kanban)
                            //  &&
                            // !etapasAutomatizadas.some(
                            //     (e) =>
                            //         e.acao_automatizacao == etapa.id_kanban
                            // )
                        )
                        .concat([
                            {
                                ...etapas.find(
                                    (e) => e.titulo_kanban == "Proposta Enviada"
                                ),
                                titulo_kanban: "Proposta Rejeitada",
                            },
                        ])
                    // .concat([
                    //     etapas.find((e) => {
                    //         const etapa = e;
                    //         if (etapa.titulo_kanban == "Proposta Enviada") {
                    //             etapa.titulo_kanban = "Proposta Rejeitada";
                    //             return true;
                    //         }
                    //         return false;
                    //     }),
                    // ])
                }
            >
                <div className="w-full flex flex-row justify-center p-4">
                    <Button loading={isLoading}>Salvar</Button>
                </div>
            </FormParametorosAutomatizacao>
            <div
                className={`flex ${
                    etapasAutomatizadas.length > 0 ? "flex-col" : "flex-row"
                } bg-body bg-opacity-10 rounded-md min-h-[200px]`}
            >
                {etapasAutomatizadas.length > 0 ? (
                    <table>
                        <tbody>
                            {funis &&
                                etapas &&
                                etapasAutomatizadas?.map((etapaAuto, index) => {
                                    let etapaAtual = etapas.find(
                                        (etapa: any) =>
                                            etapa.id_kanban ==
                                            etapaAuto.acao_automatizacao
                                    );
                                    if(etapaAtual?.titulo_kanban != undefined) {
                                        etapaAtual = {
                                            ...etapaAtual,
                                            titulo_kanban:
                                                etapaAuto.status_acao_automatizacao ==
                                                "0"
                                                    ? etapaAtual.titulo_kanban +
                                                      " Rejeitada"
                                                    : etapaAtual.titulo_kanban,
                                        };
                                    }
                                    const etapaDestino = etapas.find(
                                        (etapa: any) =>
                                            etapa.id_kanban ==
                                            etapaAuto.etapa_destino_automatizacao
                                    );
                                    const funilDestino = funis.find(
                                        (funil: any) =>
                                            funil.id_kanban ==
                                            etapaDestino?.grupo_kanban
                                    );
                                    return (
                                        funilDestino?.id_kanban && (
                                            <CardEtapaAutomatizada
                                                etapaAuto={etapaAuto}
                                                etapaAtual={etapaAtual}
                                                etapaDestino={etapaDestino}
                                                funilDestino={funilDestino}
                                                funis={funis}
                                                etapas={etapas}
                                                onSubmitFunction={
                                                    onSubmitFunction
                                                }
                                                isLoading={isLoading}
                                                removerAutomatizacao={
                                                    removerAutomatizacao
                                                }
                                                key={index}
                                            />
                                        )
                                    );
                                })}
                        </tbody>
                    </table>
                ) : (
                    <div className="w-full h-full flex flex-col justify-center items-center self-center">
                        Não há etapas Configuradas
                    </div>
                )}
            </div>
        </>
    );
};

export default FomParametrosAutomatizacaoComponent;
