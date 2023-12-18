import InputSelectComponent from "@/components/Forms/InputSelect";
import { GetForm } from "@/utils";
import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import * as yup from "yup";

const FormParametorosAutomatizacao = ({
    onSubmitFunction,
    children,
    funis,
    etapas,
    etapasDisponiveis,
    ...rest
}: any) => {
    const [yupSchema, setYupSchema] = useState<
        yup.ObjectSchema<{}, yup.AnyObject, {}, "">
    >(yup.object().shape({}));
    const [selectedFunil, setSelectedFunil] = useState<any>("");
    const [acaoSelecionada, setAcaoSelecionada] = useState<any>({})

    const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);

    const clearFormToSubmit = (data: any) => {
        for (let key in data) {
            form.setValue(key as never, "" as never);
        }
        if (data["acao_automatizacao"].includes("Rejeitada")) {
            data["status_acao_automatizacao"] = "0";
        } else {
            data["status_acao_automatizacao"] = "1";
        }
        data["acao_automatizacao"] = etapasDisponiveis.find(
            (e: any) => e.titulo_kanban == data["acao_automatizacao"]
        ).id_kanban;

        onSubmitFunction(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(clearFormToSubmit)} {...rest}>
                <div className="flex flex-row items-center">
                    <InputSelectComponent
                        name="acao_automatizacao"
                        label="Ação"
                        formulario={form}
                        options={etapasDisponiveis
                            .filter(
                                (etapa: any) => etapa?.id_kanban != undefined
                            )
                            .map((etapa: any) => {
                                return {
                                    value: etapa.titulo_kanban,
                                    label: etapa.titulo_kanban,
                                };
                            })}
                        onChange={(e:any) => setAcaoSelecionada(e.value)}
                        error="Selecione uma etapa"
                        required
                    />
                    <MdKeyboardArrowRight className="w-20" />
                    <InputSelectComponent
                        name="funil_destino"
                        label="Funil"
                        formulario={form}
                        options={funis.map((funil: any) => ({
                            value: String(funil.id_kanban),
                            label: funil.titulo_kanban,
                        }))}
                        onChange={(e: any) => {
                            // setDefaultStepValue()
                            setSelectedFunil(String(e.value));
                        }}
                        error="Selecione um funil"
                        required
                    />
                    <MdKeyboardArrowRight className="w-20" />
                    <InputSelectComponent
                        name="etapa_destino_automatizacao"
                        label="Etapa Destino"
                        formulario={form}
                        options={etapas
                            .filter(
                                (etapa: any) =>
                                    etapa.grupo_kanban == selectedFunil && acaoSelecionada != etapa.titulo_kanban
                            )
                            .map((etapa: any) => ({
                                value: String(etapa.id_kanban),
                                label: etapa.titulo_kanban,
                            }))}
                        defaultValue={
                            funis.find(
                                (funil: any) => funil.id_kanban == selectedFunil
                            )?.listas_kanban[0]?.id_kanban
                        }
                        error="Selecione uma etapa"
                        required
                    />
                </div>
                {children}
            </form>
        </>
    );
};

export default FormParametorosAutomatizacao;
