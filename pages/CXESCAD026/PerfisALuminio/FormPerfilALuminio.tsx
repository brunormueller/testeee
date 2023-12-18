"use client";
import Input from "@/components/Forms/Input";
import InputGroup from "@/components/Forms/InputGroup";
import InputSelectComponent from "@/components/Forms/InputSelect";
import { listarFabricante } from "@/requests/CRUD/KitManual/listarKitManual";
import { GetForm } from "@/utils";
import { useEffect, useState } from "react";
import * as yup from "yup";

const FormPerfilALuminio = ({
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
                    name="codItem_aluminio"
                    formulario={form}
                    mascara="numerico"
                    error={"Preencha o Código"}
                    required
                    defaultValue={
                        defaultValues && defaultValues["codItem_aluminio"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "codItem_aluminio"
                    )}
                />
                <InputSelectComponent
                    label="Fabricante"
                    name="codFabricante_aluminio"
                    formulario={form}
                    error={"Preencha o Fabricante"}
                    options={dadosFabricante.map((e: any) => ({
                        value: e["id_fabricante"],
                        label: e["nome_fabricante"],
                    }))}
                    required
                    defaultValue={
                        defaultValues && defaultValues["codFabricante_aluminio"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "codFabricante_aluminio"
                    )}
                />
                <Input
                    label="Voltagem"
                    name="voltagemCA_aluminio"
                    formulario={form}
                    mascara="numerico"
                    prefix="V"
                    defaultValue={
                        defaultValues && defaultValues["voltagemCA_aluminio"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "voltagemCA_aluminio"
                    )}
                />
            </InputGroup>
            <InputGroup>
                <Input
                    label="Fase"
                    name="fases_aluminio"
                    formulario={form}
                    mascara="numerico"
                    prefix="V"
                    defaultValue={
                        defaultValues && defaultValues["fases_aluminio"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "fases_aluminio"
                    )}
                />
                <Input
                    label="Descrição"
                    name="descricao_aluminio"
                    formulario={form}
                    mascara="letrasNumeros"
                    defaultValue={
                        defaultValues && defaultValues["descricao_aluminio"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "descricao_aluminio"
                    )}
                />
                <Input
                    label="Garantia"
                    name="garantia_aluminio"
                    formulario={form}
                    mascara="numerico"
                    prefix="meses"
                    defaultValue={
                        defaultValues && defaultValues["garantia_aluminio"]
                    }
                    disabled={disabledFields?.some(
                        (field: string) => field == "garantia_aluminio"
                    )}
                />
            </InputGroup>
            {children}
        </form>
    );
};

export default FormPerfilALuminio;
