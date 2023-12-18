import ReactTable from "@/components/ReactTable/ReactTable";
import { cadastrarItens } from "@/requests/CRUD/KitManual/cadastroKitManual";
import { editarItens } from "@/requests/CRUD/KitManual/editarKitManual";
import { listagemItens } from "@/requests/CRUD/KitManual/listarKitManual";
import _ from "lodash";
import { FieldValues } from "react-hook-form";
import FormInversor from "./FormInversor";

const ConsultaInversor = () => {
    const dados = [
        "id_inversor",
        "status_inversor",
        "codItem_inversor",
        "codFabricante_inversor",
        "descricao_inversor",
        "garantia_inversor",
        "potencia_inversor",
        "fases_inversor",
        "voltagemCA_inversor",
    ];
    const columns = dados.map((e) => {
        let header = _.capitalize(e)
            .replaceAll("_inversor", "")
            .replaceAll("_", " ");
        header = header == "Coditem" ? "Cod Item" : header;
        header = header == "Codfabricante" ? "Cod Fabricante" : header;
        header = header == "Ultimaatualizacao" ? "Ultima Atualização" : header;
        header = header == "Voltagemca" ? "Voltagem CA" : header;
        console.log(header);
        return { header: header, accessorKey: e };
    });

    const onSubmitFunction = async (data: FieldValues) => {
        data["parametro"] = "inversor";
        data["parametro_coluna"] = "inversores";

        return cadastrarItens(data);
    };

    const sendEditarItens = async (data: any) => {
        data["parametro"] = "inversor";
        data["parametro_coluna"] = "inversores";

        return editarItens(data);
    };

    const listagemItensTotal = async () => {
        return listagemItens("inversores");
    };

    return (
        <>
            <ReactTable
                columns={columns}
                listFunction={listagemItensTotal}
                idCol="id_inversor"
                isActiveCol="status_inversor"
                canEdit
                canDesactive
                createFunction={onSubmitFunction}
                editFunction={sendEditarItens}
                Form={FormInversor}
                pageName="Inversor"
            />
        </>
    );
};

export default ConsultaInversor;
