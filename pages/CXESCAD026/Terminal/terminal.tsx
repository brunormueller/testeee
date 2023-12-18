import ReactTable from "@/components/ReactTable/ReactTable";
import { cadastrarItens } from "@/requests/CRUD/KitManual/cadastroKitManual";
import { editarItens } from "@/requests/CRUD/KitManual/editarKitManual";
import { listagemItens } from "@/requests/CRUD/KitManual/listarKitManual";
import _ from "lodash";
import { FieldValues } from "react-hook-form";
import FormTerminal from "./FormTerminal";

const ConsultaTerminal = () => {
    const dados = [
        "id_terminal",
        "status_terminal",
        "codItem_terminal",
        "codFabricante_terminal",
        "descricao_terminal",
        "garantia_terminal",
    ];
    const columns = dados.map((e) => {
        let header = _.capitalize(e)
            .replaceAll("_terminal", "")
            .replaceAll("_", " ");
        header = header == "Coditem" ? "Cod Item" : header;
        header = header == "Codfabricante" ? "Cod Fabricante" : header;
        header = header == "Ultimaatualizacao" ? "Ultima Atualização" : header;
        console.log(header);
        return { header: header, accessorKey: e };
    });

    const onSubmitFunction = async (data: FieldValues) => {
        data["parametro"] = "terminal";
        data["parametro_coluna"] = "terminais";

        return cadastrarItens(data);
    };

    const sendEditarItens = async (data: any) => {
        data["parametro"] = "terminal";
        data["parametro_coluna"] = "terminais";

        return editarItens(data);
    };

    const listagemItensTotal = async () => {
        return listagemItens("terminais");
    };

    return (
        <>
            <ReactTable
                columns={columns}
                listFunction={listagemItensTotal}
                idCol="id_terminal"
                isActiveCol="status_terminal"
                canEdit
                canDesactive
                createFunction={onSubmitFunction}
                editFunction={sendEditarItens}
                Form={FormTerminal}
                pageName="Terminais"
            />
        </>
    );
};

export default ConsultaTerminal;
