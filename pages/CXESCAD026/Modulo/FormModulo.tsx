"use client";
import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import { listarFabricante } from "@/requests/CRUD/KitManual/listarKitManual";
import { GetForm } from "@/utils";
import { useEffect, useState } from "react";
import * as yup from "yup";

const FormModulo = ({
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
                    name="codItem_modulo"
                    formulario={form}
                    mascara="numerico"
                    error={"Preencha o Código"}
                    required
                    defaultValue={
                        defaultValues && defaultValues["codItem_modulo"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "codItem_modulo"
                    )}
                />
                <InputSelectComponent
                    label="Fabricante"
                    name="codFabricante_modulo"
                    formulario={form}
                    error={"Preencha o Fabricante"}
                    options={dadosFabricante.map((e: any) => ({
                        value: e["id_fabricante"],
                        label: e["nome_fabricante"],
                    }))}
                    required
                    defaultValue={
                        defaultValues && defaultValues["codFabricante_modulo"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "codFabricante_modulo"
                    )}
                />
            </InputGroup>
            <InputGroup>
                <Input
                    label="Potencia"
                    name="potencia_modulo"
                    formulario={form}
                    mascara="numerico"
                    prefix="V"
                    defaultValue={
                        defaultValues && defaultValues["potencia_modulo"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "potencia_modulo"
                    )}
                />
                <Input
                    label="Descrição"
                    name="descricao_modulo"
                    formulario={form}
                    mascara="letrasNumeros"
                    defaultValue={
                        defaultValues && defaultValues["descricao_modulo"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "descricao_modulo"
                    )}
                />
                <Input
                    label="Garantia"
                    name="garantia_modulo"
                    formulario={form}
                    mascara="numerico"
                    prefix="meses"
                    defaultValue={
                        defaultValues && defaultValues["garantia_modulo"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "garantia_modulo"
                    )}
                />
            </InputGroup>
            {children}
        </form>
    );
};

export default FormModulo;
