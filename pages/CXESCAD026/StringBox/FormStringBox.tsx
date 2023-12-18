"use client";
import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import { listarFabricante } from "@/requests/CRUD/KitManual/listarKitManual";
import { GetForm } from "@/utils";
import { useEffect, useState } from "react";
import * as yup from "yup";

const FormStringBox = ({
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
                    name="codItem_stringbox"
                    formulario={form}
                    mascara="numerico"
                    error={"Preencha o Código"}
                    required
                    defaultValue={
                        defaultValues && defaultValues["codItem_stringbox"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "codItem_stringbox"
                    )}
                />
                <InputSelectComponent
                    label="Fabricante"
                    name="codFabricante_stringbox"
                    formulario={form}
                    error={"Preencha o Fabricante"}
                    options={dadosFabricante.map((e: any) => ({
                        value: e["id_fabricante"],
                        label: e["nome_fabricante"],
                    }))}
                    required
                    defaultValue={
                        defaultValues &&
                        defaultValues["codFabricante_stringbox"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "codFabricante_stringbox"
                    )}
                />
            </InputGroup>
            <InputGroup>
                <Input
                    label="Descrição"
                    name="descricao_stringbox"
                    formulario={form}
                    mascara="letrasNumeros"
                    defaultValue={
                        defaultValues && defaultValues["descricao_stringbox"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "descricao_stringbox"
                    )}
                />
                <Input
                    label="Garantia"
                    name="garantia_stringbox"
                    formulario={form}
                    mascara="numerico"
                    prefix="meses"
                    defaultValue={
                        defaultValues && defaultValues["garantia_stringbox"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "garantia_stringbox"
                    )}
                />
            </InputGroup>
            {children}
        </form>
    );
};

export default FormStringBox;
