import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Container from "@/components/Forms/Container";
import { useState } from "react";
import ConsultaAterramento from "./Aterramento/aterramento";
import ConsultaCabo from "./Cabo/cabo";
import ConsultaConector from "./Conector/conector";
import ConsultaInversor from "./Inversor/inversor";
import ConsultaModulo from "./Modulo/modulo";
import ConsultaOutros from "./Outros/outros";
import ConsultaPerfilAluminio from "./PerfisALuminio/perfisAluminio";
import ConsultaStringBox from "./StringBox/stringBox";
import ConsultaSuporte from "./Suporte/suporte";
import ConsultaTerminal from "./Terminal/terminal";
const KitManual = () => {
    const [showContent, setShowContent] = useState(0); // Defina o valor padrão

    const SwitchContent = ({ showContent }: { showContent: number }) => {
        switch (showContent) {
            case 0:
                return <ConsultaAterramento />;
            case 1:
                return <ConsultaCabo />;
            case 2:
                return <ConsultaConector />;
            case 3:
                return <ConsultaInversor />;
            case 4:
                return <ConsultaModulo />;
            case 5:
                return <ConsultaPerfilAluminio />;
            case 6:
                return <ConsultaSuporte />;
            case 7:
                return <ConsultaStringBox />;
            case 8:
                return <ConsultaTerminal />;
            case 9:
                return <ConsultaOutros />;
            default:
                return <p>Valor Não Encontrado</p>;
        }
    };

    const Componentes = [
        { value: 0, label: "Aterramento" },
        { value: 1, label: "Cabo" },
        { value: 2, label: "Conector" },
        { value: 3, label: "Inversor" },
        { value: 4, label: "Módulo" },
        { value: 5, label: "Perfil" },
        { value: 6, label: "Suporte" },
        { value: 7, label: "StringBox" },
        { value: 8, label: "Terminal" },
        { value: 9, label: "Outros" },
    ];

    return (
        <>
            <Breadcrumb pageName="Itens Kit Manual" />
            <Container>
                <Navbar items={Componentes} setShowContent={setShowContent} />
                <SwitchContent showContent={showContent} />
            </Container>
        </>
    );
};

const Navbar = ({ items, setShowContent }: any) => {
    const [selectedContent, setSelectedContent] = useState(0);
    return (
        <nav>
            <ul className="flex rounded-md flex-row gap-[30px] justify-start border-2 w-full items-center text-[16px] text-black-2 mb-4 dark:text-white overflow-auto p-2">
                {items.map((item: any) => (
                    <li key={item.value}>
                        <button
                            type="button"
                            onClick={() => {
                                setShowContent(item.value);
                                setSelectedContent(item.value);
                                console.log(selectedContent);
                            }}
                            className={`hover:bg-bodydark1 dark:hover:bg-black rounded-md p-2 px-5 ${
                                item.value == selectedContent &&
                                "bg-bodydark dark:bg-black"
                            }`}
                        >
                            {item.label}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default KitManual;
