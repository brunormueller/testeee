import ReactTable from "@/components/ReactTable/ReactTable";
import { cadastrarItens } from "@/requests/CRUD/KitManual/cadastroKitManual";
import { editarItens } from "@/requests/CRUD/KitManual/editarKitManual";
import { listagemItens } from "@/requests/CRUD/KitManual/listarKitManual";
import _ from "lodash";
import { FieldValues } from "react-hook-form";
import FormSuporte from "./FormSuporte";

const ConsultaSuporte = () => {
    const dados = [
        "id_suporte",
        "status_suporte",
        "codItem_suporte",
        "codFabricante_suporte",
        "descricao_suporte",
        "garantia_suporte",
    ];
    const columns = dados.map((e) => {
        let header = _.capitalize(e)
            .replaceAll("_suporte", "")
            .replaceAll("_", " ");
        header = header == "Coditem" ? "Cod Item" : header;
        header = header == "Codfabricante" ? "Cod Fabricante" : header;
        header = header == "Ultimaatualizacao" ? "Ultima Atualização" : header;
        console.log(header);
        return { header: header, accessorKey: e };
    });

    const onSubmitFunction = async (data: FieldValues) => {
        data["parametro"] = "suporte";
        data["parametro_coluna"] = "suportes";

        return cadastrarItens(data);
    };

    const sendEditarItens = async (data: any) => {
        data["parametro"] = "suporte";
        data["parametro_coluna"] = "suportes";

        return editarItens(data);
    };

    const listagemItensTotal = async () => {
        return listagemItens("suportes");
    };

    return (
        <>
            <ReactTable
                columns={columns}
                listFunction={listagemItensTotal}
                idCol="id_suporte"
                isActiveCol="status_suporte"
                canEdit
                canDesactive
                createFunction={onSubmitFunction}
                editFunction={sendEditarItens}
                Form={FormSuporte}
                pageName="Suporte"
            />
        </>
    );
};

export default ConsultaSuporte;
