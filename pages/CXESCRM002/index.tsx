import Board from "@/pages/CXESCRM002/Board";

import { listarDadosFunil, listarKanban } from "@/requests/CRM/kanban";
import KanbanContext from "@/src/contexts/kanbanContext";
import { useContext, useEffect, useState } from "react";
import DashboardFunil from "./Dashboard";
import { Filter, Settings } from "lucide-react";
import ModalComponente from "@/components/Modal/ModalComponente";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import PopoverCorFunil from "@/components/Kanban/popoverCorFunil";

const Kanban = () => {
  const [lists, setLists] = useState<any[]>([]);
  const [originalLists, setOriginalLists] = useState<any[]>([]); // New state variable for original lists
  const [visualizacao, setVisualizacao] = useState("Kanban");
  const { updateKanban, setUpdateKanban } = useContext(KanbanContext);
  const [tituloKanban, setTituloKanban] = useState("");
  const [openModalConfig, setOpenModalConfig] = useState(false);
  const searchParams = new URLSearchParams(window.location.search);
  const [corKanbanSelecionada, setCorKanbanSelecionada] = useState("#d71295");
  const funil = searchParams.get("funil");

  const visualizacaoKanban = ["Kanban", "Gráfico Funil"];
  useEffect(() => {
    const listaDadosKanban = async () => {
      await listarKanban(funil).then((res: any) => {
        res = res.sort((a: any, b: any) => parseInt(a.id) - parseInt(b.id));
        console.log(res);
        setOriginalLists(res);
        setLists(res);
      });
    };
    listarDadosFunil(funil).then((res) => {
      setTituloKanban(res);
    });

    listaDadosKanban();
  }, [funil, updateKanban]);
  const handleModalConfig = () => {
    setOpenModalConfig(!openModalConfig);
  };
  const handlePesquisaKanban = (e: any) => {
    // Check if the search input is empty
    if (e.trim() === "") {
      // If empty, restore the original lists
      setLists(originalLists);
    } else {
      // If not empty, filter the lists based on the search input
      const filteredLists = originalLists
        .map((list) => ({
          ...list,
          cards: list.cards.filter((card: any) =>
            card.content.toLowerCase().includes(e.toLowerCase())
          ),
        }))
        .filter((list) => list.cards.length > 0);

      setLists(filteredLists);
    }
  };
  return (
    <>
      <div className="bg-white rounded p-3">
        <div className="flex gap-6 w-full text-2xl text-black items-center justify-between px-3 font-medium">
          <div className="flex  gap-5">
            {tituloKanban}
            <span className="border-r-2 "></span>
            <ul className="flex  text-base">
              {visualizacaoKanban.map((visual, index) => (
                <li
                  key={index}
                  className={`pt-1 cursor-pointer ${
                    visualizacao === visual && "border-b-2 border-b-primary"
                  } px-4`}
                  onClick={() => setVisualizacao(visual)}
                >
                  {visual}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-3">
            <input
              type="text"
              className="text-base border-b-2"
              placeholder="Pesquisar"
              onKeyUp={(e) =>
                handlePesquisaKanban((e.target as HTMLInputElement).value)
              }
            />
            <div
              onClick={handleModalConfig}
              className="hover:bg-stroke p-1 rounded-md"
            >
              <Filter size={20} />
            </div>
            <div
              onClick={handleModalConfig}
              className="hover:bg-stroke p-1 rounded-md"
            >
              <Settings size={21} />
            </div>
          </div>
        </div>
      </div>
      <ModalComponente
        size="sm"
        header={`Configuração de  ${tituloKanban}`}
        opened={openModalConfig}
        onClose={handleModalConfig}
      >
        <Popover>
          <PopoverTrigger className="flex gap-3 items-center rounded w-full hover:bg-stroke p-2">
            <div
              style={{ backgroundColor: corKanbanSelecionada }}
              className="h-5 w-5  rounded"
            ></div>
            Cor Funil
          </PopoverTrigger>
          <PopoverContent style={{ zIndex: "99999999999999999" }}>
            <PopoverCorFunil corSelecionada={setCorKanbanSelecionada} />
          </PopoverContent>
        </Popover>
      </ModalComponente>
      {visualizacao === "Kanban" && (
        <KanbanContext.Provider value={{ updateKanban, setUpdateKanban }}>
          <Board
            kanbanId={funil}
            listas={lists}
            corListaKanban={corKanbanSelecionada}
            atualizaKanban={() => console.log("")}
          />
        </KanbanContext.Provider>
      )}
      {visualizacao === "Gráfico Funil" && <DashboardFunil listas={lists} />}
    </>
  );
};

export default Kanban;
