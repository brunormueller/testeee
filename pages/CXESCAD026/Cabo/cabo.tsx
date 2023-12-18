import ReactTable from "@/components/ReactTable/ReactTable";
import { cadastrarItens } from "@/requests/CRUD/KitManual/cadastroKitManual";
import { editarItens } from "@/requests/CRUD/KitManual/editarKitManual";
import { listagemItens } from "@/requests/CRUD/KitManual/listarKitManual";
import _ from "lodash";
import { FieldValues } from "react-hook-form";
import FormCabo from "./FormCabo";

const ConsultaCabo = () => {
    const dados = [
        "id_cabo",
        "status_cabo",
        "codItem_cabo",
        "codFabricante_cabo",
        "descricao_cabo",
        "garantia_cabo",
    ];
    const columns = dados.map((e) => {
        let header = _.capitalize(e)
            .replaceAll("_cabo", "")
            .replaceAll("_", " ");
        header = header == "Coditem" ? "Cod Item" : header;
        header = header == "Codfabricante" ? "Cod Fabricante" : header;
        header = header == "Ultimaatualizacao" ? "Ultima Atualização" : header;
        console.log(header);
        return { header: header, accessorKey: e };
    });

    const onSubmitFunction = async (data: FieldValues) => {
        data["parametro"] = "cabo";
        data["parametro_coluna"] = "cabos";

        return cadastrarItens(data);
    };

    const sendEditarItens = async (data: any) => {
        data["parametro"] = "cabo";
        data["parametro_coluna"] = "cabos";

        return editarItens(data);
    };

    const listagemItensTotal = async () => {
        return listagemItens("cabos");
    };

    return (
        <>
            <ReactTable
                columns={columns}
                listFunction={listagemItensTotal}
                idCol="id_cabo"
                isActiveCol="status_cabo"
                canEdit
                canDesactive
                createFunction={onSubmitFunction}
                editFunction={sendEditarItens}
                Form={FormCabo}
                pageName="Cabos"
            />
        </>
    );
};

export default ConsultaCabo;
