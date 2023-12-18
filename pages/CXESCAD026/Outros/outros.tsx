import ReactTable from "@/components/ReactTable/ReactTable";
import { cadastrarItens } from "@/requests/CRUD/KitManual/cadastroKitManual";
import { editarItens } from "@/requests/CRUD/KitManual/editarKitManual";
import { listagemItens } from "@/requests/CRUD/KitManual/listarKitManual";
import _ from "lodash";
import { FieldValues } from "react-hook-form";
import FormOutros from "./FormOutros";

const ConsultaOutros = () => {
    const dados = [
        "id_outro_componente",
        "status_outro_componente",
        "codItem_outro_componente",
        "codFabricante_outro_componente",
        "descricao_outro_componente",
        "garantia_outro_componente",
        "qtdKit_outro_componente",
        "tipo_outro_componente",
        "potencia_outro_componente",
    ];
    const columns = dados.map((e) => {
        let header = _.capitalize(e)
            .replaceAll("_outro_componente", "")
            .replaceAll("_", " ");
        header = header == "Coditem" ? "Cod Item" : header;
        header = header == "Codfabricante" ? "Cod Fabricante" : header;
        header = header == "Ultimaatualizacao" ? "Ultima Atualização" : header;
        header = header == "Qtdkit" ? "Qtd Kit" : header;
        console.log(header);
        return { header: header, accessorKey: e };
    });

    const onSubmitFunction = async (data: FieldValues) => {
        data["parametro"] = "outro_componente";
        data["parametro_coluna"] = "outros_componentes";

        return cadastrarItens(data);
    };

    const sendEditarItens = async (data: any) => {
        data["parametro"] = "outro_componente";
        data["parametro_coluna"] = "outros_componentes";

        return editarItens(data);
    };

    const listagemItensTotal = async () => {
        return listagemItens("outros_componentes");
    };

    return (
        <>
            <ReactTable
                columns={columns}
                listFunction={listagemItensTotal}
                idCol="id_outro_componente"
                isActiveCol="status_outro_componente"
                canEdit
                canDesactive
                createFunction={onSubmitFunction}
                editFunction={sendEditarItens}
                Form={FormOutros}
                pageName="Outros Componentes"
            />
        </>
    );
};

export default ConsultaOutros;
