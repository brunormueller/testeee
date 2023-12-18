"use client";
import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import { listarFabricante } from "@/requests/CRUD/KitManual/listarKitManual";
import { GetForm } from "@/utils";
import { useEffect, useState } from "react";
import * as yup from "yup";

const FormOutros = ({
    onSubmitFunction,
    defaultValues,
    disabledFields,
    children,
    ...rest
}: any) => {
    const [dadosFabricante, setDadosFabricante] = useState([]);
    const [yupSchema, setYupSchema] = useState<
        yup.ObjectSchema<{}, yup.AnyObject, {}, "">
    >(yup.object().shape({}));

    const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);

    useEffect(() => {
        listarFabricante().then((e) => {
            setDadosFabricante(e);
        });
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmitFunction)} {...rest}>
            <InputGroup>
                <Input
                    label="Código"
                    name="codItem_outro_componente"
                    formulario={form}
                    mascara="numerico"
                    error={"Preencha o Código"}
                    required
                    defaultValue={
                        defaultValues &&
                        defaultValues["codItem_outro_componente"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "codItem_outro_componente"
                    )}
                />
                <InputSelectComponent
                    label="Fabricante"
                    name="codFabricante_outro_componente"
                    formulario={form}
                    error={"Preencha o Fabricante"}
                    options={dadosFabricante.map((e: any) => ({
                        value: e["id_fabricante"],
                        label: e["nome_fabricante"],
                    }))}
                    required
                    defaultValue={
                        defaultValues &&
                        defaultValues["codFabricante_outro_componente"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) =>
                            field == "codFabricante_outro_componente"
                    )}
                />
                <Input
                    label="Tipo"
                    name="tipo_outro_componente"
                    formulario={form}
                    mascara="letrasNumeros"
                    defaultValue={
                        defaultValues && defaultValues["tipo_outro_componente"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "tipo_outro_componente"
                    )}
                />
                <Input
                    label="Potencia"
                    name="potencia_outro_componente"
                    formulario={form}
                    mascara="numero"
                    prefix="V"
                    defaultValue={
                        defaultValues &&
                        defaultValues["potencia_outro_componente"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "potencia_outro_componente"
                    )}
                />
            </InputGroup>
            <InputGroup>
                <Input
                    label="Descrição"
                    name="descricao_outro_componente"
                    formulario={form}
                    mascara="letrasNumeros"
                    defaultValue={
                        defaultValues &&
                        defaultValues["descricao_outro_componente"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "descricao_outro_componente"
                    )}
                />
                <Input
                    label="Garantia"
                    name="garantia_outro_componente"
                    formulario={form}
                    mascara="numerico"
                    prefix="meses"
                    defaultValue={
                        defaultValues &&
                        defaultValues["garantia_outro_componente"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "garantia_outro_componente"
                    )}
                />
                <Input
                    label="Quantidade Kit"
                    name="qtdKit_outro_componente"
                    formulario={form}
                    mascara="numerico"
                    prefix="qtd"
                    defaultValue={
                        defaultValues &&
                        defaultValues["qtdKit_outro_componente"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "qtdKit_outro_componente"
                    )}
                />
            </InputGroup>
            {children}
        </form>
    );
};

export default FormOutros;
