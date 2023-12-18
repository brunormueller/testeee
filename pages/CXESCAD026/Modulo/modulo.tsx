import ReactTable from "@/components/ReactTable/ReactTable";
import { cadastrarItens } from "@/requests/CRUD/KitManual/cadastroKitManual";
import { editarItens } from "@/requests/CRUD/KitManual/editarKitManual";
import { listagemItens } from "@/requests/CRUD/KitManual/listarKitManual";
import _ from "lodash";
import { FieldValues } from "react-hook-form";
import FormModulo from "./FormModulo";

const ConsultaModulo = () => {
    const dados = [
        "id_modulo",
        "status_modulo",
        "codItem_modulo",
        "codFabricante_modulo",
        "descricao_modulo",
        "potencia_modulo",
        "garantia_modulo",
    ];
    const columns = dados.map((e) => {
        let header = _.capitalize(e)
            .replaceAll("_modulo", "")
            .replaceAll("_", " ");
        header = header == "Coditem" ? "Cod Item" : header;
        header = header == "Codfabricante" ? "Cod Fabricante" : header;
        header = header == "Ultimaatualizacao" ? "Ultima Atualização" : header;
        console.log(header);
        return { header: header, accessorKey: e };
    });

    const onSubmitFunction = async (data: FieldValues) => {
        data["parametro"] = "modulo";
        data["parametro_coluna"] = "modulos";

        return cadastrarItens(data);
    };

    const sendEditarItens = async (data: any) => {
        data["parametro"] = "modulo";
        data["parametro_coluna"] = "modulos";

        return editarItens(data);
    };

    const listagemItensTotal = async () => {
        return listagemItens("modulos");
    };

    return (
        <>
            <ReactTable
                columns={columns}
                listFunction={listagemItensTotal}
                idCol="id_modulo"
                isActiveCol="status_modulo"
                canEdit
                canDesactive
                createFunction={onSubmitFunction}
                editFunction={sendEditarItens}
                Form={FormModulo}
                pageName="Modulo"
            />
        </>
    );
};

export default ConsultaModulo;
