import Combobox from "@/components/Combobox";
import DatePickerWithRange from "@/components/DatePickerWithRange";
import Button from "@/components/Forms/Button";
import LoaderSun from "@/components/common/Loader/LoaderSun";
import { listarClienteContratos } from "@/requests/CRM/Contrato/listarClienteContratos";
import { baixarAws } from "@/requests/common/Aws/baixarAws";
import { ArrowLeft, Download, FilePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormContrato from "./FormContrato";

const options = [
    {
        value: "0",
        label: "Aguardando Aprovação",
    },
    {
        value: "1",
        label: "Aprovada",
    },
    {
        value: "3",
        label: "Cancelada",
    },
    {
        value: "2",
        label: "Reprovada",
    },
];

const Contratos = ({ dadosCard, dadosCliente, proposta }: any) => {
    const [view, setView] = useState("Contratos");
    const [statusContratos, setStatusContratos] = useState<string>("");
    const [clienteContratos, setClienteContratos] = useState<any[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleChangeStatus = (status: any) => {
        if (statusContratos === status) {
            setStatusContratos("");
        } else {
            setStatusContratos(status);
        }
    };

    useEffect(() => {
        listarClienteContratos(dadosCliente.id_cliente).then((res) => {
            setClienteContratos(res);
            setIsLoaded(true);
        });
    }, []);

    return (
        <div className="flex flex-col">
            {view == "Contratos" ? (
                <div className="w-full flex-col">
                    <div className="flex justify-end">
                        <Button
                            onClick={() => setView("NovoContrato")}
                            className="w-fit px-8 gap-2 flex items-center "
                        >
                            <FilePlus size={18} />
                            Novo Contrato
                        </Button>
                    </div>
                    <div className="bg-white w-full h-11 gap-4 items-center p-7 flex rounded-md my-2">
                        <input
                            placeholder="Procure por aqui..."
                            className="rounded-[6px] border-[1px] font-medium p-2 pl-3 text-[#71717A] w-full text-sm border-[#E4E4E7]"
                            type="text"
                        />
                        <Combobox
                            handleChange={handleChangeStatus}
                            placeholder="Selecione um status"
                            options={options}
                        />
                        <DatePickerWithRange />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        {isLoaded ? (
                            clienteContratos?.map((contrato, index) => (
                                <div
                                    key={index}
                                    className="bg-white flex w-full justify-between rounded-md"
                                >
                                    <div className="p-3 text-start">
                                        <p className="text-sm">
                                            Contrato Nº {contrato.id_contrato}
                                        </p>
                                        <p className="text-sm font-medium">
                                            Revisão {contrato.revisao_contrato}
                                        </p>
                                        <p className="font-semibold">
                                            Proposta Nº{" "}
                                            {contrato.proposta_contrato}
                                        </p>
                                        {/* <span>
                                            Quantidade de módulos:{" "}
                                            {proposta.qtdModulos1_proposta}
                                        </span> */}
                                    </div>
                                    <div className="p-3 flex flex-col justify-center items-center">
                                        <div>
                                            <Button
                                                className={`bg-transparent text-[blue] flex items-center rounded-md p-0 m-0 h-fit`}
                                                type="button"
                                                onClick={() => {
                                                    const toastPromise =
                                                        new Promise(
                                                            (
                                                                resolve,
                                                                reject
                                                            ) => {
                                                                baixarAws(
                                                                    contrato.caminho_contrato
                                                                )
                                                                    .then(
                                                                        (res) =>
                                                                            resolve(
                                                                                window.open(
                                                                                    res
                                                                                )
                                                                            )
                                                                    )
                                                                    .catch(
                                                                        (
                                                                            err
                                                                        ) => {
                                                                            reject(
                                                                                "err"
                                                                            );
                                                                        }
                                                                    );
                                                            }
                                                        );
                                                    return toast.promise(
                                                        toastPromise,
                                                        {
                                                            pending: {
                                                                render(
                                                                    data: any
                                                                ) {
                                                                    return "Aguarde";
                                                                },
                                                            },
                                                            success: {
                                                                render(
                                                                    data: any
                                                                ) {
                                                                    return "Download Iniciado";
                                                                },
                                                                theme: "light",
                                                            },
                                                            error: {
                                                                render(
                                                                    data: any
                                                                ) {
                                                                    return "Erro ao realizar o download";
                                                                },
                                                            },
                                                        }
                                                    );
                                                }}
                                            >
                                                <Download
                                                    color="#5193fc"
                                                    size={20}
                                                />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="w-full h-[400px] flex flex-col justify-center items-center">
                                <LoaderSun />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="w-full flex-col">
                    <Button
                        type="button"
                        onClick={() => {
                            setIsLoaded(false);
                            listarClienteContratos(
                                dadosCliente.id_cliente
                            ).then((res) => {
                                setClienteContratos(res);
                                setIsLoaded(true);
                            });
                            setView("Contratos");
                        }}
                        className={`w-fit h-fit mb-2 px-8 gap-2 flex items-center`}
                    >
                        <ArrowLeft size={18} />
                        Voltar
                    </Button>
                    <FormContrato
                        dadosCard={dadosCard}
                        dadosCliente={dadosCliente}
                        proposta={proposta}
                        clienteContratos={clienteContratos}
                    />
                </div>
            )}
        </div>
    );
};

export default Contratos;
