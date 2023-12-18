"use client";
import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import { listarFabricante } from "@/requests/CRUD/KitManual/listarKitManual";
import { GetForm } from "@/utils";
import { useEffect, useState } from "react";
import * as yup from "yup";

const FormTerminal = ({
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
                    name="codItem_terminal"
                    formulario={form}
                    mascara="numerico"
                    error={"Preencha o Código"}
                    required
                    defaultValue={
                        defaultValues && defaultValues["codItem_terminal"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "codItem_terminal"
                    )}
                />
                <InputSelectComponent
                    label="Fabricante"
                    name="codFabricante_terminal"
                    formulario={form}
                    error={"Preencha o Fabricante"}
                    options={dadosFabricante.map((e: any) => ({
                        value: e["id_fabricante"],
                        label: e["nome_fabricante"],
                    }))}
                    required
                    defaultValue={
                        defaultValues && defaultValues["codFabricante_terminal"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "codFabricante_terminal"
                    )}
                />
            </InputGroup>
            <InputGroup>
                <Input
                    label="Descrição"
                    name="descricao_terminal"
                    formulario={form}
                    mascara="letrasNumeros"
                    defaultValue={
                        defaultValues && defaultValues["descricao_terminal"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "descricao_terminal"
                    )}
                />
                <Input
                    label="Garantia"
                    name="garantia_terminal"
                    formulario={form}
                    mascara="numerico"
                    prefix="meses"
                    defaultValue={
                        defaultValues && defaultValues["garantia_terminal"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "garantia_terminal"
                    )}
                />
            </InputGroup>
            {children}
        </form>
    );
};

export default FormTerminal;
