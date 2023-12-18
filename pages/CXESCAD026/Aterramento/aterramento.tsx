import ReactTable from "@/components/ReactTable/ReactTable";
import { cadastrarItens } from "@/requests/CRUD/KitManual/cadastroKitManual";
import { editarItens } from "@/requests/CRUD/KitManual/editarKitManual";
import { listagemItens } from "@/requests/CRUD/KitManual/listarKitManual";
import _ from "lodash";
import { FieldValues } from "react-hook-form";
import FormAterramento from "./FormAterramento";

const ConsultaAterramento = () => {
    const dados = [
        "id_aterramento",
        "status_aterramento",
        "codItem_aterramento",
        "codFabricante_aterramento",
        "descricao_aterramento",
        "garantia_aterramento",
    ];
    const columns = dados.map((e) => {
        let header = _.capitalize(e)
            .replaceAll("_aterramento", "")
            .replaceAll("_", " ");
        header = header == "Coditem" ? "Cod Item" : header;
        header = header == "Codfabricante" ? "Cod Fabricante" : header;
        header = header == "Ultimaatualizacao" ? "Ultima Atualização" : header;
        console.log(header);
        return { header: header, accessorKey: e };
    });

    const onSubmitFunction = async (data: FieldValues) => {
        data["parametro"] = "aterramento";
        data["parametro_coluna"] = "aterramentos";

        return cadastrarItens(data);
    };

    const sendEditarAterramento = async (data: any) => {
        data["parametro"] = "aterramento";
        data["parametro_coluna"] = "aterramentos";

        return editarItens(data);
    };

    const listagemAterramentos = async () => {
        return listagemItens("aterramentos");
    };

    return (
        <>
            <ReactTable
                columns={columns}
                listFunction={listagemAterramentos}
                idCol="id_aterramento"
                isActiveCol="status_aterramento"
                canEdit
                canDesactive
                createFunction={onSubmitFunction}
                editFunction={sendEditarAterramento}
                Form={FormAterramento}
                pageName="Aterramento"
            />
        </>
    );
};

export default ConsultaAterramento;
