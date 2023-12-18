import ReactTable from "@/components/ReactTable/ReactTable";
import { cadastrarItens } from "@/requests/CRUD/KitManual/cadastroKitManual";
import { editarItens } from "@/requests/CRUD/KitManual/editarKitManual";
import { listagemItens } from "@/requests/CRUD/KitManual/listarKitManual";
import _ from "lodash";
import { FieldValues } from "react-hook-form";
import FormPerfilALuminio from "./FormPerfilALuminio";

const ConsultaPerfilAluminio = () => {
    const dados = [
        "id_aluminio",
        "status_aluminio",
        "codItem_aluminio",
        "codFabricante_aluminio",
        "descricao_aluminio",
        "garantia_aluminio",
        "fases_aluminio",
        "voltagemCA_aluminio",
    ];
    const columns = dados.map((e) => {
        let header = _.capitalize(e)
            .replaceAll("_aluminio", "")
            .replaceAll("_", " ");
        header = header == "Coditem" ? "Cod Item" : header;
        header = header == "Codfabricante" ? "Cod Fabricante" : header;
        header = header == "Ultimaatualizacao" ? "Ultima Atualização" : header;
        header = header == "Voltagemca" ? "Voltagem CA" : header;
        console.log(header);
        return { header: header, accessorKey: e };
    });

    const onSubmitFunction = async (data: FieldValues) => {
        data["parametro"] = "aluminio";
        data["parametro_coluna"] = "perfis_aluminio";

        return cadastrarItens(data);
    };

    const sendEditarItens = async (data: any) => {
        data["parametro"] = "aluminio";
        data["parametro_coluna"] = "perfis_aluminio";

        return editarItens(data);
    };

    const listagemItensTotal = async () => {
        return listagemItens("perfis_aluminio");
    };

    return (
        <>
            <ReactTable
                columns={columns}
                listFunction={listagemItensTotal}
                idCol="id_aluminio"
                isActiveCol="status_aluminio"
                canEdit
                canDesactive
                createFunction={onSubmitFunction}
                editFunction={sendEditarItens}
                Form={FormPerfilALuminio}
                pageName="Perfil Alumínio"
            />
        </>
    );
};

export default ConsultaPerfilAluminio;
