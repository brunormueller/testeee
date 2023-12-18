"use client";
import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import { listarFabricante } from "@/requests/CRUD/KitManual/listarKitManual";
import { GetForm } from "@/utils";
import { useEffect, useState } from "react";
import * as yup from "yup";

const FormInversor = ({
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
                    name="codItem_inversor"
                    formulario={form}
                    mascara="numerico"
                    error={"Preencha o Código"}
                    required
                    defaultValue={
                        defaultValues && defaultValues["codItem_inversor"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "codItem_inversor"
                    )}
                />
                <InputSelectComponent
                    label="Fabricante"
                    name="codFabricante_inversor"
                    formulario={form}
                    error={"Preencha o Fabricante"}
                    options={dadosFabricante.map((e: any) => ({
                        value: e["id_fabricante"],
                        label: e["nome_fabricante"],
                    }))}
                    required
                    defaultValue={
                        defaultValues && defaultValues["codFabricante_inversor"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "codFabricante_inversor"
                    )}
                />
                <Input
                    label="Descrição"
                    name="descricao_inversor"
                    formulario={form}
                    mascara="letrasNumeros"
                    defaultValue={
                        defaultValues && defaultValues["descricao_inversor"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "descricao_inversor"
                    )}
                />
                <Input
                    label="Potencia"
                    name="potencia_inversor"
                    formulario={form}
                    mascara="numero"
                    prefix="kwp"
                    defaultValue={
                        defaultValues && defaultValues["potencia_inversor"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "potencia_inversor"
                    )}
                />
            </InputGroup>
            <InputGroup>
                <Input
                    label="Fase"
                    name="fases_inversor"
                    formulario={form}
                    mascara="numerico"
                    prefix="V"
                    defaultValue={
                        defaultValues && defaultValues["fases_inversor"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "fases_inversor"
                    )}
                />
                <Input
                    label="Voltagem"
                    name="voltagemCA_inversor"
                    formulario={form}
                    mascara="numerico"
                    prefix="V"
                    defaultValue={
                        defaultValues && defaultValues["voltagemCA_inversor"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "voltagemCA_inversor"
                    )}
                />
                <Input
                    label="Garantia"
                    name="garantia_inversor"
                    formulario={form}
                    mascara="numerico"
                    prefix="meses"
                    defaultValue={
                        defaultValues && defaultValues["garantia_inversor"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "garantia_inversor"
                    )}
                />
            </InputGroup>
            {children}
        </form>
    );
};

export default FormInversor;
