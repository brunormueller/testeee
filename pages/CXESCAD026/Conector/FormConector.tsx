"use client";
import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import { listarFabricante } from "@/requests/CRUD/KitManual/listarKitManual";
import { GetForm } from "@/utils";
import { useEffect, useState } from "react";
import * as yup from "yup";

const FormConector = ({
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
                    name="codItem_conector"
                    formulario={form}
                    mascara="numerico"
                    error={"Preencha o Código"}
                    required
                    defaultValue={
                        defaultValues && defaultValues["codItem_conector"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "codItem_conector"
                    )}
                />
                <InputSelectComponent
                    label="Fabricante"
                    name="codFabricante_conector"
                    formulario={form}
                    error={"Preencha o Fabricante"}
                    options={dadosFabricante.map((e: any) => ({
                        value: e["id_fabricante"],
                        label: e["nome_fabricante"],
                    }))}
                    required
                    defaultValue={
                        defaultValues && defaultValues["codFabricante_conector"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "codFabricante_conector"
                    )}
                />
            </InputGroup>
            <InputGroup>
                <Input
                    label="Descrição"
                    name="descricao_conector"
                    formulario={form}
                    mascara="letrasNumeros"
                    defaultValue={
                        defaultValues && defaultValues["descricao_conector"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "descricao_conector"
                    )}
                />
                <Input
                    label="Garantia"
                    name="garantia_conector"
                    formulario={form}
                    mascara="numerico"
                    prefix="meses"
                    defaultValue={
                        defaultValues && defaultValues["garantia_conector"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "garantia_conector"
                    )}
                />
            </InputGroup>
            {children}
        </form>
    );
};

export default FormConector;
