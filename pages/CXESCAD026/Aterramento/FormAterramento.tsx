"use client";
import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import { listarFabricante } from "@/requests/CRUD/KitManual/listarKitManual";
import { GetForm } from "@/utils";
import { useEffect, useState } from "react";
import * as yup from "yup";

const FormAterramento = ({
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
                    label="Código Aterramento"
                    name="codItem_aterramento"
                    formulario={form}
                    mascara="numerico"
                    error={"Preencha o Código"}
                    required
                    defaultValue={
                        defaultValues && defaultValues["codItem_aterramento"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "codItem_aterramento"
                    )}
                />
                <InputSelectComponent
                    label="Fabricante"
                    name="codFabricante_aterramento"
                    formulario={form}
                    error={"Preencha o Fabricante"}
                    options={dadosFabricante.map((e: any) => ({
                        value: e["id_fabricante"],
                        label: e["nome_fabricante"],
                    }))}
                    required
                    defaultValue={
                        defaultValues &&
                        defaultValues["codFabricante_aterramento"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "codFabricante_aterramento"
                    )}
                />
            </InputGroup>
            <InputGroup>
                <Input
                    label="Descrição"
                    name="descricao_aterramento"
                    formulario={form}
                    mascara="letrasNumeros"
                    defaultValue={
                        defaultValues && defaultValues["descricao_aterramento"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "descricao_aterramento"
                    )}
                />
                <Input
                    label="Garantia"
                    name="garantia_aterramento"
                    formulario={form}
                    mascara="numerico"
                    prefix="meses"
                    defaultValue={
                        defaultValues && defaultValues["garantia_aterramento"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "garantia_aterramento"
                    )}
                />
            </InputGroup>
            {children}
        </form>
    );
};

export default FormAterramento;
