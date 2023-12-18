import { Template, checkTemplate } from "@pdfme/common";
import { Form, Viewer } from "@pdfme/ui";
import { useEffect, useRef, useState } from "react";

import LoaderSun from "@/components/common/Loader/LoaderSun";
import { Menubar } from "@/components/ui/menubar";
import { deletarContrato } from "@/requests/CRM/Contrato/deletarContrato";
import { listarUltimoIdContrato } from "@/requests/CRM/Contrato/listarUltimoIdContrato";
import { obterTemplateContrato } from "@/requests/CRM/Contrato/obterTemplateContrato";
import { salvarContrato } from "@/requests/CRM/Contrato/salvarContrato";
import { useContractContext } from "@/src/contexts/ContractProvider";
import { useAuth } from "@/src/contexts/authContext";
import {
    addAnexo,
    generatePDF,
    getFontsData,
    getPlugins,
    getTemplate,
    openBlob,
} from "@/utils/pdfme/helper";
import { FaFileUpload, FaRegFilePdf } from "react-icons/fa";

type Mode = "form" | "viewer";
let contratoIdTemporario = 0;
let contratoSalvo = false;

const FormContrato = ({
    dadosCard,
    dadosCliente,
    proposta,
    clienteContratos,
}: any) => {
    const uiRef = useRef<HTMLDivElement | null>(null);
    const ui = useRef<Form | Viewer | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    // const [contratoIdTemporario, setContratoIdTemporario] =
    //     useState<any>(undefined);
    // const [contratoSalvo, setContratoSalvo] = useState(false);
    const { valuesSession } = useAuth();

    const { relacionar } = useContractContext();

    const initTemplate = async () => {
        let template: Template = getTemplate();
        try {
            // const templateString = localStorage.getItem("template");

            const templateString = await obterTemplateContrato().then(
                (res) => res.template_contrato
            );

            const contratoId = Number(await listarUltimoIdContrato());

            // setContratoIdTemporario(contratoId);
            contratoIdTemporario = contratoId;

            let templateJson = templateString
                ? JSON.parse(
                      relacionar(templateString, {
                          ...dadosCliente,
                          ...proposta,
                          ...dadosCard,
                          revisaoContrato: clienteContratos.length + 1,
                          contratoId,
                      })
                  )
                : getTemplate();

            const basePdf = await addAnexo(templateJson.basePdf, proposta);
            templateJson = {
                ...templateJson,
                basePdf: basePdf,
                schemas: [...templateJson.schemas, {}],
            };
            checkTemplate(templateJson);
            template = templateJson as Template;
            setIsLoaded(true);
        } catch {
            localStorage.removeItem("template");
        }
        return template;
    };

    const [mode, setMode] = useState<Mode>(
        (localStorage.getItem("mode") as Mode) ?? "form"
    );

    useEffect(() => {
        return () => {
            if (!contratoSalvo) {
                deletarContrato({ id_contrato: contratoIdTemporario });
            }
        };
    }, []);

    useEffect(() => {
        async function loadTemplate() {
            const template = await initTemplate();

            let inputs = template.sampledata ?? [{}];
            try {
                const inputsString = localStorage.getItem("inputs");
                const inputsJson = inputsString
                    ? JSON.parse(inputsString)
                    : template.sampledata ?? [{}];
                inputs = inputsJson;
            } catch {
                localStorage.removeItem("inputs");
            }

            getFontsData().then((font) => {
                if (uiRef.current) {
                    ui.current = new (mode === "form" ? Form : Viewer)({
                        domContainer: uiRef.current,
                        template,
                        inputs,
                        options: {
                            font,
                            // labels: { clear: "消去" },
                            theme: {
                                token: {
                                    colorPrimary: "#25c2a0",
                                },
                            },
                        },
                        plugins: getPlugins(),
                    });
                }
            });
        }

        loadTemplate();

        // return () => {
        //     if (ui.current) {
        //         ui.current.destroy();
        //     }
        // };
    }, [uiRef, mode]);

    const onChangeMode = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value as Mode;
        setMode(value);
        localStorage.setItem("mode", value);
    };

    // const onSaveInputs = () => {
    //     if (ui.current) {
    //         const inputs = ui.current.getInputs();
    //         localStorage.setItem("inputs", JSON.stringify(inputs));
    //         toast.success("Salvo");
    //     }
    // };

    const onResetInputs = async () => {
        localStorage.removeItem("inputs");
        if (ui.current) {
            const template = await initTemplate();
            ui.current.setInputs(template.sampledata ?? [{}]);
        }
    };

    const onSaveFormContrato = () => {
        let dataAtual = new Date();

        // Define o fuso horário para "America/Sao_Paulo"
        dataAtual.toLocaleString("en-US", { timeZone: "America/Sao_Paulo" });

        const { session } = valuesSession();
        generatePDF(ui.current).then(async (pdfBlob) => {
            // const pdfBlobString = await blobToString(pdfBlob);
            const formulario = new FormData();
            if (pdfBlob) {
                formulario.append("pdfBlob", pdfBlob);
                const dados: any = {
                    id_contrato: contratoIdTemporario,
                    coleta_contrato: proposta.coleta_proposta,
                    revisao_contrato: clienteContratos.length + 1,
                    cliente_contrato: dadosCliente.id_cliente,
                    proposta_contrato: proposta.id_proposta,
                    caminho_contrato: `clientes/${session.id_usuario}_${
                        session.telefone1_usuario
                    }/Contratos/Contrato_${proposta.id_proposta}_Versao_${
                        clienteContratos.length + 1
                    }_Coleta_${proposta.coleta_proposta}.pdf`,
                    data_contrato: dataAtual.toISOString(),
                    user_contrato: session.id_usuario,
                    dataEmail_contrato: "",
                    horaEmail_contrato: "",
                    userEmail_contrato: "",
                    status_contrato: "1",
                };
                for (const key in dados) {
                    formulario.append(key, dados[key]);
                }
                salvarContrato(formulario).then(() => {
                    contratoSalvo = true;
                });
            }
        });
    };

    return (
        <div>
            {isLoaded ? (
                <Menubar>
                    <button
                        type="button"
                        onClick={() =>
                            generatePDF(ui.current).then((res) => openBlob(res))
                        }
                        className="flex flex-row flex-nowrap items-center bg-success rounded px-2 py-1 text-white"
                    >
                        <div className="pr-2">
                            <FaRegFilePdf />
                        </div>
                        Gerar PDF
                    </button>
                    <button
                        type="button"
                        onClick={() => onSaveFormContrato()}
                        className="flex flex-row flex-nowrap items-center bg-success rounded px-2 py-1 text-white"
                    >
                        <div className="pr-2">
                            <FaFileUpload />
                        </div>
                        Salvar Contrato
                    </button>
                    <button
                        onClick={() => onResetInputs()}
                        className="flex flex-row gap-2 flex-nowrap items-center hover:bg-black-2 hover:bg-opacity-10 dark:hover:bg-white dark:hover:bg-opacity-5 rounded-sm px-3 py-1.5 text-sm font-medium outline-none"
                    >
                        <div>Resetar Campos</div>
                    </button>

                    {/* <button
                        onClick={() =>
                            console.log({ dadosCard, dadosCliente, proposta })
                        }
                    >
                        Mostrar todos propos
                    </button> */}
                </Menubar>
            ) : (
                <div className="w-full h-[500px] flex flex-col justify-center items-center">
                    <LoaderSun />
                </div>
            )}

            <div
                ref={uiRef}
                // style={{ width: "100%", height: `calc(100vh - ${65}px)` }}
                style={{
                    width: "100%",
                    height: `${isLoaded ? `calc(100vh - ${65}px)` : "0px"}`,
                }}
            />
        </div>
    );
};

export default FormContrato;
