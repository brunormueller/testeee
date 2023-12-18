import ReactTable from "@/components/ReactTable/ReactTable";
import { cadastrarItens } from "@/requests/CRUD/KitManual/cadastroKitManual";
import { editarItens } from "@/requests/CRUD/KitManual/editarKitManual";
import { listagemItens } from "@/requests/CRUD/KitManual/listarKitManual";
import _ from "lodash";
import { FieldValues } from "react-hook-form";
import FormStringBox from "./FormStringBox";

const ConsultaStringBox = () => {
    const dados = [
        "id_stringbox",
        "status_stringbox",
        "codItem_stringbox",
        "codFabricante_stringbox",
        "descricao_stringbox",
        "garantia_stringbox",
    ];
    const columns = dados.map((e) => {
        let header = _.capitalize(e)
            .replaceAll("_stringbox", "")
            .replaceAll("_", " ");
        header = header == "Coditem" ? "Cod Item" : header;
        header = header == "Codfabricante" ? "Cod Fabricante" : header;
        header = header == "Ultimaatualizacao" ? "Ultima Atualização" : header;
        console.log(header);
        return { header: header, accessorKey: e };
    });

    const onSubmitFunction = async (data: FieldValues) => {
        data["parametro"] = "stringbox";
        data["parametro_coluna"] = "stringbox";

        return cadastrarItens(data);
    };

    const sendEditarItens = async (data: any) => {
        data["parametro"] = "stringbox";
        data["parametro_coluna"] = "stringbox";

        return editarItens(data);
    };

    const listagemItensTotal = async () => {
        return listagemItens("stringbox");
    };

    return (
        <>
            <ReactTable
                columns={columns}
                listFunction={listagemItensTotal}
                idCol="id_stringbox"
                isActiveCol="status_stringbox"
                canEdit
                canDesactive
                createFunction={onSubmitFunction}
                editFunction={sendEditarItens}
                Form={FormStringBox}
                pageName="StringBox"
            />
        </>
    );
};

export default ConsultaStringBox;
