import ReactTable from "@/components/ReactTable/ReactTable";
import { cadastrarItens } from "@/requests/CRUD/KitManual/cadastroKitManual";
import { editarItens } from "@/requests/CRUD/KitManual/editarKitManual";
import { listagemItens } from "@/requests/CRUD/KitManual/listarKitManual";
import _ from "lodash";
import { FieldValues } from "react-hook-form";
import FormConector from "./FormConector";

const ConsultaConector = () => {
    const dados = [
        "id_conector",
        "status_conector",
        "codItem_conector",
        "codFabricante_conector",
        "descricao_conector",
        "garantia_conector",
    ];
    const columns = dados.map((e) => {
        let header = _.capitalize(e)
            .replaceAll("_conector", "")
            .replaceAll("_", " ");
        header = header == "Coditem" ? "Cod Item" : header;
        header = header == "Codfabricante" ? "Cod Fabricante" : header;
        header = header == "Ultimaatualizacao" ? "Ultima Atualização" : header;
        console.log(header);
        return { header: header, accessorKey: e };
    });

    const onSubmitFunction = async (data: FieldValues) => {
        data["parametro"] = "conector";
        data["parametro_coluna"] = "conectores";
        return cadastrarItens(data);
    };

    const sendEditarItens = async (data: any) => {
        data["parametro"] = "conector";
        data["parametro_coluna"] = "conectores";
        return editarItens(data);
    };

    const listagemItensTotal = async () => {
        return listagemItens("conectores");
    };

    return (
        <>
            <ReactTable
                columns={columns}
                listFunction={listagemItensTotal}
                idCol="id_conector"
                isActiveCol="status_conector"
                canEdit
                canDesactive
                createFunction={onSubmitFunction}
                editFunction={sendEditarItens}
                Form={FormConector}
                pageName="Conector"
            />
        </>
    );
};

export default ConsultaConector;
