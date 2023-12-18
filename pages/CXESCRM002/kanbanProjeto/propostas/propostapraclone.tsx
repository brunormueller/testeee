import Button from "@/components/Forms/Button";
import {
  enviarLinkProposta,
  enviarLinkPropostaEmail,
} from "@/requests/CRM/enviarProposta";
// import { listarPropostas } from "@/requests/CRUD/Propostas/listarPropostas";
import Input from "@/components/Forms/Input";
import InputSelectComponent from "@/components/Forms/InputSelect";
import ModalComponente from "@/components/Modal/ModalComponente";
import SweetAlertConfirmacao from "@/components/Modal/SweetAlertConfirm";
import ColetaDados from "@/pages/CXESCRM005";
import { listarMotivoNegocioPerdido } from "@/requests/CRUD/NegociosPerdido/listarMotivoNegocioPerdido";
import { aprovarProposta } from "@/requests/CRUD/Propostas/aprovarProposta";
import { baixarProposta } from "@/requests/CRUD/Propostas/baixarProposta";
import { listarPropostas } from "@/requests/CRUD/Propostas/listarPropostas";
import { reprovarProposta } from "@/requests/CRUD/Propostas/reprovarProposta";
import { GetForm } from "@/utils";
import { ArrowLeft, Download, FilePlus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues } from "react-hook-form";
import { BiCheck, BiLogoWhatsapp, BiMailSend } from "react-icons/bi";
import Swal from "sweetalert2";
import * as yup from "yup";
import Combobox from "@/components/Combobox";
import DatePickerWithRange from "@/components/DatePickerWithRange";

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
const PropostasTab = ({ dadosCliente, dadosCard }: any) => {
  const [openModalRejeitar, setOpenModalRejeitar] = useState(false);
  const [openModalEmail, setOpenModalEmail] = useState(false);
  const [motivosReprovacao, setMotivosReprovacao] = useState<any[]>([]);
  const [motivoSelecionado, setMotivoSelecionado] = useState<string>("");
  const [propostas, setPropostas] = useState<any[]>([]);
  const [view, setView] = useState("Propostas");
  const [statusPropostas, setStatusPropostas] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const [yupSchemaReprovar, setYupSchemaReprovar] = useState<
    yup.ObjectSchema<{}, yup.AnyObject, {}, "">
  >(yup.object().shape({}));
  const [yupSchemaEmail, setYupSchemaEmail] = useState<
    yup.ObjectSchema<{}, yup.AnyObject, {}, "">
  >(yup.object().shape({}));

  const { handleSubmit: handleReprovar, ...formReprovar } = GetForm(
    yupSchemaReprovar,
    setYupSchemaReprovar
  );
  const { handleSubmit: handleEmail, ...formEmail } = GetForm(
    yupSchemaEmail,
    setYupSchemaEmail
  );

  const idColeta = dadosCard.id_coleta_cliente;
  useEffect(() => {
    console.log(idColeta);
    buscaPropostas();
  }, []);
  const buscaPropostas = () => {
    listarPropostas(dadosCard.id_coleta_cliente).then((res) => {
      setPropostas(res);
    });
  };
  const statusProposta = [
    { name: "Aguardando Aprovação", color: "bg-[#619ce8]", value: "0" },
    { name: "Aprovada", color: "bg-[#07b51c]", value: "1" },
    { name: "Reprovada", color: "bg-[#8d968e]", value: "2" },
    { name: "Obsoleta", color: "bg-[#b5071e]", value: "3" },
  ];

  const handleChange = (status: any) => {
    console.log(status);
    if (statusPropostas === status) {
      setStatusPropostas("");
    } else {
      setStatusPropostas(status);
    }
  };
  const enviarLink = (data: any) => {
    enviarLinkProposta(data).then((e) => {
      window.open(e["Whatsapp"]);
    });
  };
  const confirmarProposta = (data: any) => {
    setIsLoading(true);
    aprovarProposta(data).then((e: any) => {
      listarPropostas(idColeta);
      setIsLoading(false);
    });
  };

  const baixarPropostaAws = (data: any) => {
    console.log(data);
    baixarProposta(data).then((res) => {
      window.open(res.body);
    });
  };

  const onSubmitReprovar = (data: FieldValues) => {
    console.log(data);
    setIsLoading(true);

    if (motivoSelecionado != "99") {
      data["motivoOutros_proposta"] = "";
    }
    reprovarProposta(data).then((e) => {
      listarPropostas(idColeta);
      setOpenModalRejeitar(false);
      setIsLoading(false);
    });
  };
  const onSubmitEmail = (data: FieldValues) => {
    console.log(dadosCliente);
    setIsLoading(true);

    enviarLinkPropostaEmail(data).then(() => {
      setOpenModalEmail(false);
      listarPropostas(idColeta);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    listarMotivoNegocioPerdido().then((res) => {
      console.log(res);

      setMotivosReprovacao(res);
    });
  }, []);

  const filteredPropostas =
    statusPropostas !== ""
      ? propostas.filter(
          (proposta) => proposta.status_proposta === statusPropostas
        )
      : propostas;
  return (
    <div className="flex flex-col">
      <div className="flex justify-start">
        <Button
          type="button"
          onClick={() => {
            buscaPropostas();
            setView("Propostas");
          }}
          className={`w-fit h-fit mb-2 px-8 gap-2 ${
            view === "Propostas" ? "hidden" : "flex"
          } items-center`}
        >
          <ArrowLeft size={18} />
          Voltar
        </Button>
      </div>
      {view === "Propostas" ? (
        <>
          <div className="flex justify-end">
            <Button
              onClick={() => setView("NovaProposta")}
              className="w-fit px-8 gap-2 flex items-center "
            >
              <FilePlus size={18} />
              Nova Proposta
            </Button>
          </div>
          <div className="bg-white w-full h-11 gap-4 items-center p-7 flex rounded-md my-2">
            <input
              placeholder="Procure por aqui..."
              className="rounded-[6px] border-[1px] font-medium p-2 pl-3 text-[#71717A] w-full text-sm border-[#E4E4E7]"
              type="text"
            />
            <Combobox
              handleChange={handleChange}
              placeholder="Selecione um status"
              options={options}
            />
            <DatePickerWithRange />
          </div>
          {filteredPropostas.map((proposta, index) => {
            console.log(filteredPropostas);

            console.log(proposta.revisao_proposta);
            return (
              <div
                key={index}
                className="bg-white flex w-full justify-between rounded-md my-2"
              >
                <div className="p-3">
                  <p className="text-sm">
                    Proposta Nº {proposta.revisao_proposta}
                  </p>
                  <p className="font-semibold">Proposta comercial</p>
                  <span>
                    Quantidade de módulos: {proposta.qtdModulos1_proposta}
                  </span>
                </div>
                <div className="flex flex-col ">
                  {statusProposta.map(
                    (status, statusIndex) =>
                      proposta.aprovacao_cliente === status.value && (
                        <>
                          <div key={statusIndex} className="grid gap-2">
                            <div className=" rounded-bl-xl text-white font-medium rounded-tr-md gap-2  flex items-center h-fit justify-center bg-[#000]">
                              <span
                                className={`w-2 h-2 ${status.color} rounded-full ml-2`}
                              ></span>
                              <p className="mr-2">{status.name}</p>
                            </div>
                            <p className="flex justify-end mr-2">
                              {proposta.data_proposta}
                            </p>

                            <div className=" flex-row rounded-sm gap-4 flex h-fit justify-end mb-2 mr-2">
                              <Button
                                className={`bg-transparent text-[blue] flex items-center rounded-md p-0 m-0 h-fit`}
                                type="button"
                                onClick={() => {
                                  baixarPropostaAws({
                                    caminho: proposta.caminho_proposta,
                                    id_proposta: proposta.id_proposta,
                                  });
                                }}
                              >
                                <Download color="#5193fc" size={20} />
                              </Button>

                              <SweetAlertConfirmacao
                                resultConfirmed={() => {
                                  formEmail.setValue(
                                    "id_proposta" as never,
                                    proposta.id_proposta as never
                                  );
                                  formEmail.setValue(
                                    "email_cliente" as never,
                                    dadosCliente.email_cliente as never
                                  );
                                  formEmail.setValue(
                                    "id_cliente" as never,
                                    proposta.cliente_proposta as never
                                  ),
                                    setOpenModalEmail(true);
                                }}
                                className={`bg-transparent text-[blue] flex items-center rounded-md p-0 m-0 h-fit`}
                                tittle="Enviar ao Email"
                                icon="question"
                                html={`Tem certeza que deseja <b>Enviar</b> a proposta n° ${proposta.id_proposta} portadora da coleta n° ${idColeta}?`}
                              >
                                <BiMailSend size={24} />
                              </SweetAlertConfirmacao>
                              <SweetAlertConfirmacao
                                resultConfirmed={() => {
                                  const dados = {
                                    caminho_proposta: proposta.caminho_proposta,
                                    aprovacao_cliente:
                                      proposta.aprovacao_cliente,
                                    coleta_proposta: proposta.coleta_proposta,
                                    id_proposta: proposta.id_proposta,
                                    status_proposta: proposta.status_proposta,
                                    id_cliente: proposta.cliente_proposta,
                                  };
                                  enviarLink(dados);
                                  Swal.fire({
                                    title: "Sucesso",
                                    html: "Em breve você sera redirecionado!",
                                    didOpen: () => {
                                      Swal.showLoading();
                                    },
                                    timer: 6700,
                                  }).then((result) => {
                                    /* Read more about handling dismissals below */
                                    if (
                                      result.dismiss ===
                                      Swal.DismissReason.timer
                                    ) {
                                    }
                                  });
                                }}
                                className={`bg-transparent text-[green] flex items-center rounded-md p-0 m-0 h-fit`}
                                tittle="Enviar ao Whatsapp"
                                icon="question"
                                html={`Tem certeza que deseja <b>Enviar</b> a proposta n° ${proposta.id_proposta} portadora da coleta n° ${idColeta}?`}
                              >
                                <BiLogoWhatsapp size={24} />
                              </SweetAlertConfirmacao>
                              <SweetAlertConfirmacao
                                resultConfirmed={() => {
                                  confirmarProposta({
                                    id_proposta: proposta.id_proposta,
                                  });
                                }}
                                className={`bg-transparent  h-fit p-0 gap-0 text-[green] ${
                                  status.value == "0" ? "flex" : "hidden"
                                }`}
                                tittle="Aprovação"
                                icon="success"
                                html={`Tem certeza que deseja <b>Aprovar</b> a proposta n° ${proposta.id_proposta} portadora da coleta n° ${idColeta}?`}
                              >
                                <BiCheck size={24} />
                              </SweetAlertConfirmacao>
                              <SweetAlertConfirmacao
                                resultConfirmed={() => {
                                  formReprovar.setValue(
                                    "id_proposta" as never,
                                    proposta.id_proposta as never
                                  );
                                  setOpenModalRejeitar(true);
                                }}
                                className={`bg-transparent text-[red] ${
                                  status.value == "0" ? "flex" : "hidden"
                                } items-center rounded-md p-0 m-0 h-fit`}
                                tittle="Reprovação"
                                icon="error"
                                html={`Tem certeza que deseja <b>Reprovar</b> a proposta n° ${proposta.id_proposta} portadora da coleta n° ${idColeta}?`}
                              >
                                <X size={24} />
                              </SweetAlertConfirmacao>
                            </div>
                          </div>
                        </>
                      )
                  )}

                  <p className="flex justify-end mr-2 text-lg p-1 font-medium">
                    R$ 27.000
                  </p>
                </div>
              </div>
            );
          })}
          <ModalComponente
            hasForm={false}
            header="Reprovação"
            defaultW="w-[400px]"
            opened={openModalRejeitar}
            onClose={() => setOpenModalRejeitar(!openModalRejeitar)}
            hasSaveButton={false}
          >
            <div className="mt-5">
              <div className="bg-secondaryMenu bg-opacity-30 text-black-2 rounded-lg text-center text-lg mb-5">
                <span>
                  Por favor, preencha o motivo da{" "}
                  <strong className="text-danger">
                    <i>Reprovação</i>
                  </strong>
                </span>{" "}
              </div>

              <form
                className="flex flex-col gap-5"
                onSubmit={handleReprovar(onSubmitReprovar)}
              >
                <InputSelectComponent
                  formulario={formReprovar}
                  label="Motivo Reprovação"
                  name="motivo_reprovacao"
                  required
                  error="Escolha Algum Motivo"
                  options={motivosReprovacao.map((res: any) => ({
                    label: `${res.motivo_perdido}`,
                    value: `${res.id_perdido}`,
                  }))}
                  onChange={(e: any) => setMotivoSelecionado(e.value)}
                />
                {motivoSelecionado == "99" && (
                  <Input
                    type="textarea"
                    formulario={formReprovar}
                    label="Motivo"
                    name="motivoOutros_proposta"
                    error="Preencha o Motivo"
                  />
                )}

                <Button loading={isLoading} className="w-full bg-primary mt-5">
                  Salvar
                </Button>
              </form>
            </div>
          </ModalComponente>

          <ModalComponente
            hasForm={false}
            header="Enviar E-mail"
            defaultW="w-[400px]"
            opened={openModalEmail}
            onClose={() => setOpenModalEmail(!openModalEmail)}
            hasSaveButton={false}
          >
            <div className="mt-5">
              <div className="bg-secondaryMenu bg-opacity-30 text-black-2 rounded-lg text-center text-lg mb-5">
                <span>
                  Por favor, preencha o:{" "}
                  <strong>
                    <i>Email</i>
                  </strong>
                </span>{" "}
              </div>

              <form
                className="flex flex-col gap-5"
                onSubmit={handleEmail(onSubmitEmail)}
              >
                <Input
                  formulario={formEmail}
                  label="Email"
                  name="email_cliente"
                  error="Preencha o Motivo"
                  required
                />
                <Button loading={isLoading} className="w-full bg-primary mt-5">
                  Salvar
                </Button>
              </form>
            </div>
          </ModalComponente>
        </>
      ) : (
        <ColetaDados
          inCard={true}
          idColeta={idColeta}
          dadosCliente={dadosCliente}
        />
      )}
    </div>
  );
};

export default PropostasTab;
