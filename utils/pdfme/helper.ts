import { listarComponentesKitByKitId } from "@/requests/CRUD/ColetaDados/cadastroColetaDados";
import { Font, Template, checkTemplate } from "@pdfme/common";
import { generate } from "@pdfme/generator";
import { barcodes, image, text } from "@pdfme/schemas";
import { Designer, Form, Viewer } from "@pdfme/ui";
import { PDFDocument } from "pdf-lib";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { toast } from "react-toastify";
import template from "./baseTemplate";
import plugins from "./plugins";

const fontObjList = [
    {
        fallback: true,
        label: "Roboto",
        url: "/fonts/Roboto-Regular.ttf",
    },
    {
        fallback: false,
        label: "Roboto-Bold",
        url: "/fonts/Roboto-Bold.ttf",
    },
];

export const getFontsData = async () => {
    const fontDataList = await Promise.all(
        fontObjList.map(async (font) => ({
            ...font,
            data: await fetch(font.url).then((res) => res.arrayBuffer()),
        }))
    );

    return fontDataList.reduce(
        (acc, font) => ({ ...acc, [font.label]: font }),
        {} as Font
    );
};

export const readFile = (
    file: File | null,
    type: "text" | "dataURL" | "arrayBuffer"
) => {
    return new Promise<string | ArrayBuffer>((r) => {
        const fileReader = new FileReader();
        fileReader.addEventListener("load", (e) => {
            if (e && e.target && e.target.result && file !== null) {
                r(e.target.result);
            }
        });
        if (file !== null) {
            try {
                if (type === "text") {
                    fileReader.readAsText(file);
                } else if (type === "dataURL") {
                    fileReader.readAsDataURL(file);
                } else if (type === "arrayBuffer") {
                    fileReader.readAsArrayBuffer(file);
                }
            } catch (error) {
                return;
            }
        }
    });
};

export const cloneDeep = (obj: any) => JSON.parse(JSON.stringify(obj));

const getTemplateFromJsonFile = (file: File) => {
    return readFile(file, "text").then((jsonStr) => {
        const template: Template = JSON.parse(jsonStr as string);
        try {
            checkTemplate(template);
            return template;
        } catch (e) {
            throw e;
        }
    });
};

export const downloadJsonFile = (json: any, title: string) => {
    if (typeof window !== "undefined") {
        const blob = new Blob([JSON.stringify(json)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${title}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }
};

export const handleLoadTemplate = async (
    e: any,
    currentRef: Designer | Form | Viewer | null
) => {
    if (e.target && e.target.files) {
        return getTemplateFromJsonFile(e.target.files[0])
            .then((t) => {
                if (!currentRef) return;
                currentRef.updateTemplate(t);
            })
            .catch((e) => {
                throw toast.error("Template inválido");
            });
    }
};

export const getPlugins = () => {
    return {
        Texto: text,
        Assinatura: plugins.signature,
        QR: barcodes.qrcode,
        Imagem: image,
    };
};

export const getLabelsBR = () => ({
    addNewField: "Adicionar Novo Campo!", // Update existing labels
    clear: "🗑️", // Add custom labels to consume them in your own plugins
    fieldsList: "Lista de Campos",
    bulkUpdateFieldName: "Atualizar Todos Campos",
    cancel: "Cancelar",
    commitBulkUpdateFieldName: "Confirmar Atualização",
    //
    // cancel: "",
    field: "Campo",
    fieldName: "Nome do Campo",
    align: "Alinhar",
    width: "Largura",
    height: "Altura",
    rotate: "Rotação",
    edit: "Editar",
    // plsInputName: "",
    fieldMustUniq: "Campos Precisam ser únicos",
    notUniq: "Não é único",
    noKeyName: "Não possui nome",
    // fieldsList: "",
    // addNewField: "",
    editField: "Editar Campo",
    type: "Tipo",
    errorOccurred: "Ocorreu Algum Erro",
    errorBulkUpdateFieldName: "Erro ao atualizar todos campos",
    // commitBulkUpdateFieldName: "",
    // bulkUpdateFieldName: "",
    "schemas.textColor": "Cor do Texto",
    "schemas.bgColor": "Cor de Fundo",
    // "schemas.horizontal": "",
    // "schemas.vertical": "",
    "schemas.left": "Esquerda",
    "schemas.center": "Centro",
    "schemas.right": "Direita",
    "schemas.top": "Cima",
    "schemas.middle": "Meio",
    "schemas.bottom": "Baixo",
    "schemas.text.fontName": "Nome da Fonte",
    "schemas.text.size": "Tamanho",
    "schemas.text.spacing": "Espaçamento",
    "schemas.text.textAlign": "Alinhamento do Texto",
    "schemas.text.verticalAlign": "Alinhamento Vertical",
    "schemas.text.lineHeight": "Tamanho da Linha",
    "schemas.text.min": "Mínimo Texto",
    "schemas.text.max": "Máximo Texto",
    "schemas.text.fit": "Encaixar texto",
    "schemas.text.dynamicFontSize": "Tamanho Dinâmico",
    "schemas.barcodes.barColor": "Cor da Barra",
    //
});

export const generatePDF = async (
    currentRef: Designer | Form | Viewer | null
) => {
    if (!currentRef) return;
    const template = currentRef.getTemplate();
    const inputs =
        typeof (currentRef as Viewer | Form).getInputs === "function"
            ? (currentRef as Viewer | Form).getInputs()
            : template.sampledata ?? [];
    const font = await getFontsData();

    const pdf = await generate({
        template,
        inputs,
        options: { font, title: "pdfme" },
        plugins: getPlugins(),
    });

    const blob = new Blob([pdf.buffer], { type: "application/pdf" });
    return blob;
};

export function openBlob(blob: any) {
    window.open(URL.createObjectURL(blob));
}

export async function blobToString (blob: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const result = reader.result;
        resolve(result);
      };
  
      reader.onerror = (error) => {
        reject(error);
      };
  
      reader.readAsText(blob);
    });
  };

export const isJsonString = (str: string) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

export const getTemplate = () => template;

export async function addAnexo(basePdf: string, proposta: any) {
    //docDefinition

    return listarComponentesKitByKitId(proposta.kit_proposta).then(
        async (res) => {
            const componentesKit = res.componentesKit;

            const elementos = [1, 2, 3, 4];
            const dados: any[] = [];
            componentesKit.map((componente: any) => {
                if (componente.descricao) {
                    dados.push([
                        {
                            text:
                                componente.nome == "Módulos"
                                    ? elementos.reduce(
                                          (accumulator, currentValue) =>
                                              accumulator +
                                              +proposta[
                                                  `qtdModulos${currentValue}_proposta`
                                              ],
                                          0
                                      )
                                    : componente.qtd,
                            // border: [false, true, true, true],
                            alignment: "center",
                        },
                        {
                            text: componente.categoria,
                            // border: [false, true, true, true],
                            alignment: "center",
                        },
                        {
                            text: componente.descricao,
                            // border: [false, true, true, true],
                            alignment: "center",
                            colSpan: 3,
                        },
                        {},
                        {},
                    ]);
                }
            });
            const dd: any = {
                content: [
                    { text: "Anexo I", style: "header", alignment: "center" },
                    {
                        table: {
                            headerRows: 2,
                            // widths: ["auto", "auto", "*"],
                            widths: ["*", "*", "*", "*", "*"],
                            body: [
                                [
                                    {
                                        // border: [false, false, false, false],
                                        text: "Kit Fotovoltaico",
                                        style: "tableHeader",
                                        // fillColor: "#45B5DD",
                                        fillColor: "#621F74",
                                        colSpan: 5,
                                        alignment: "center",
                                    },
                                    {},
                                    {},
                                    {},
                                    {},
                                ],
                                [
                                    {
                                        text: "Qtd",
                                        style: "tableHeader",
                                        fillColor: "#F07F00",
                                        alignment: "center",
                                    },
                                    {
                                        text: "Categoria",
                                        style: "tableHeader",
                                        fillColor: "#F07F00",
                                        alignment: "center",
                                    },
                                    {
                                        text: "Material",
                                        style: "tableHeader",
                                        fillColor: "#F07F00",
                                        alignment: "center",
                                        colSpan: 3,
                                    },
                                    {},
                                    {},
                                ],
                                ...dados,
                            ],
                        },
                        layout: {
                            // hLineWidth: function (i, node) {
                            //     return i === 0 || i === node.table.body.length ? 2 : 1;
                            // },
                            // vLineWidth: function (i, node) {
                            //     return i === 0 || i === node.table.widths.length
                            //         ? 2
                            //         : 1;
                            // },
                            // hLineColor: function (i, node) {
                            //     return i === 0 || i === node.table.body.length
                            //         ? "black"
                            //         : "grey";
                            // },
                            // vLineColor: function (i, node) {
                            //     return i === 0 || i === node.table.widths.length
                            //         ? "black"
                            //         : "grey";
                            // },
                            hLineWidth: () => 1,
                            vLineWidth: () => 1,
                            hLineColor: () => "#DDDDDD",
                            vLineColor: () => "#DDDDDD",
                            fillColor: function (
                                rowIndex: number,
                                node: any,
                                columnIndex: number
                            ) {
                                return rowIndex % 2 === 1 ? "#F4F4F4" : null;
                            },
                            // defaultBorder: false,
                        },
                    },
                ],
                styles: {
                    header: {
                        fontSize: 18,
                        bold: true,
                    },
                    tableHeader: {
                        bold: true,
                        fontSize: 13,
                        color: "white",
                    },
                },
            };

            pdfMake.tableLayouts = {
                lightLayout: {
                    hLineColor: function (i: any) {
                        return "#fff";
                    },
                    vLineColor: function (i: any) {
                        return "#eeeeee";
                    },
                    fillColor: function (
                        rowIndex: any,
                        node: any,
                        columnIndex: any
                    ) {
                        return rowIndex % 2 === 1 ? "#black" : null;
                    },
                },
            };
            pdfMake.vfs = pdfFonts.pdfMake.vfs;

            return new Promise((resolve, reject) => {
                pdfMake.createPdf(dd).getBase64(async (newPagePdfdata: any) => {
                    const pdfBase64data: any = basePdf;
    
                    const pdfBase64 = splitBase64(pdfBase64data);
                    const newPagePdf = newPagePdfdata;
    
                    if (pdfBase64 == null || newPagePdf == null) {
                        return toast.error("Falha ao ler o pdf base");
                    }
                    //
                    const pdfDoc = await PDFDocument.load(
                        Buffer.from(pdfBase64, "base64")
                    );
                    const newDoc = await PDFDocument.load(
                        Buffer.from(newPagePdf, "base64")
                    );
    
                    const pages = pdfDoc.getPages();
                    const newPages = newDoc.getPages();
    
                    for (let i = 0; i < newPages.length; i++) {
                        const [existingPage] = await pdfDoc.copyPages(newDoc, [i]);
                        pdfDoc.addPage(existingPage);
                        pages.push(newPages[i]);
                    }
    
                    const newPdf = await pdfDoc.save();
                    const newPdfBase64 = Buffer.from(newPdf).toString("base64");
                    resolve(`data:application/pdf;base64,${newPdfBase64}`);
                });
            })
        }
    );
}

export async function addAttachment(ui: any, proposta: any = undefined) {
    //docDefinition

    listarComponentesKitByKitId(proposta.kit_proposta).then((res) => {
        const componentesKit = res.componentesKit;

        const elementos = [1, 2, 3, 4];
        const dados = [];
        if (proposta) {
            componentesKit.map((componente: any) => {
                if (componente.descricao) {
                    dados.push([
                        {
                            text:
                                componente.nome == "Módulos"
                                    ? elementos.reduce(
                                          (accumulator, currentValue) =>
                                              accumulator +
                                              +proposta[
                                                  `qtdModulos${currentValue}_proposta`
                                              ],
                                          0
                                      )
                                    : componente.qtd,
                            // border: [false, true, true, true],
                            alignment: "center",
                        },
                        {
                            text: componente.categoria,
                            // border: [false, true, true, true],
                            alignment: "center",
                        },
                        {
                            text: componente.descricao,
                            // border: [false, true, true, true],
                            alignment: "center",
                            colSpan: 3,
                        },
                        {},
                        {},
                    ]);
                }
            });
            // dados.push([
            //     {
            //         text: elementos.reduce(
            //             (accumulator, currentValue) =>
            //                 accumulator +
            //                 +proposta[`qtdModulos${currentValue}_proposta`],
            //             0
            //         ),
            //         // border: [false, true, true, true],
            //         alignment: "center",
            //     },
            //     {
            //         text: "Peças",
            //         // border: [false, true, true, true],
            //         alignment: "center",
            //     },
            //     {
            //         text: kit.descricao,
            //         // border: [false, true, true, true],
            //         alignment: "center",
            //         colSpan: 3,
            //     },
            //     {},
            //     {},
            // ]);
            // dados.push([
            //     {
            //         text: "1",
            //         // border: [false, true, true, true],
            //         alignment: "center",
            //     },
            //     {
            //         text: "Peças",
            //         // border: [false, true, true, true],
            //         alignment: "center",
            //     },
            //     {
            //         text: "Inversor (AMPLIAÇÃO DE SISTEMA) (Monofásico-200.0Kw) 220Vca SEM INVERSOR",
            //         // border: [false, true, true, true],
            //         alignment: "center",
            //         colSpan: 3,
            //     },
            //     {},
            //     {},
            // ]);

            // dados.push([
            //     {
            //         text: "1",
            //         // border: [false, true, true, true],
            //         alignment: "center",
            //     },
            //     {
            //         text: "Disjuntor",
            //         // border: [false, true, true, true],
            //         alignment: "center",
            //     },
            //     {
            //         text: proposta.amperesDisjuntor_proposta + "A",
            //         // border: [false, true, true, true],
            //         alignment: "center",
            //         colSpan: 3,
            //     },
            //     {},
            //     {},
            // ]);

            // dados.push([
            //     {
            //         text: "1",
            //         // border: [false, true, true, true],
            //         alignment: "center",
            //     },
            //     {
            //         text: "Conjunto",
            //         // border: [false, true, true, true],
            //         alignment: "center",
            //     },
            //     {
            //         text: "Cabo Fotovoltaico 1,8kV CC + Conectores MC-4 para a ligação entre os Módulos Fotovoltaicos e os Inversores",
            //         // border: [false, true, true, true],
            //         alignment: "center",
            //         colSpan: 3,
            //     },
            //     {},
            //     {},
            // ]);

            // dados.push([
            //     {
            //         text: "1",
            //         // border: [false, true, true, true],
            //         alignment: "center",
            //     },
            //     {
            //         text: "Conjunto",
            //         // border: [false, true, true, true],
            //         alignment: "center",
            //     },
            //     {
            //         text: "Proteções CC e CA",
            //         // border: [false, true, true, true],
            //         alignment: "center",
            //         colSpan: 3,
            //     },
            //     {},
            //     {},
            // ]);

            // dados.push([
            //     {
            //         text: "1",
            //         // border: [false, true, true, true],
            //         alignment: "center",
            //     },
            //     {
            //         text: "Conjunto",
            //         // border: [false, true, true, true],
            //         alignment: "center",
            //     },
            //     {
            //         text: "* Estrutura de fixação para Solo - Solo para 10 módulos",
            //         // border: [false, true, true, true],
            //         alignment: "center",
            //         colSpan: 3,
            //     },
            //     {},
            //     {},
            // ]);
        } else {
            dados.push(
                ["Data1", "Data2", "Data3"],
                ["Data12", "Data22", "Data23"],
                ["Data31", "Data32", "Data33"],
                ["Data41", "Data42", "Data43"],
                ["Data51", "Data52", "Data53"],
                ["Data51", "Data52", "Data53"],
                ["Data51", "Data52", "Data53"],
                ["Data51", "Data52", "Data53"],
                ["Data51", "Data52", "Data53"],
                ["Data51", "Data52", "Data53"]
            );
        }
        const dd: any = {
            content: [
                { text: "Anexo I", style: "header", alignment: "center" },
                {
                    table: {
                        headerRows: 2,
                        // widths: ["auto", "auto", "*"],
                        widths: ["*", "*", "*", "*", "*"],
                        body: [
                            [
                                {
                                    // border: [false, false, false, false],
                                    text: "Kit Fotovoltaico",
                                    style: "tableHeader",
                                    // fillColor: "#45B5DD",
                                    fillColor: "#621F74",
                                    colSpan: 5,
                                    alignment: "center",
                                },
                                {},
                                {},
                                {},
                                {},
                            ],
                            [
                                {
                                    text: "Qtd",
                                    style: "tableHeader",
                                    fillColor: "#F07F00",
                                    alignment: "center",
                                },
                                {
                                    text: "Categoria",
                                    style: "tableHeader",
                                    fillColor: "#F07F00",
                                    alignment: "center",
                                },
                                {
                                    text: "Material",
                                    style: "tableHeader",
                                    fillColor: "#F07F00",
                                    alignment: "center",
                                    colSpan: 3,
                                },
                                {},
                                {},
                            ],
                            ...dados,
                        ],
                    },
                    layout: {
                        // hLineWidth: function (i, node) {
                        //     return i === 0 || i === node.table.body.length ? 2 : 1;
                        // },
                        // vLineWidth: function (i, node) {
                        //     return i === 0 || i === node.table.widths.length
                        //         ? 2
                        //         : 1;
                        // },
                        // hLineColor: function (i, node) {
                        //     return i === 0 || i === node.table.body.length
                        //         ? "black"
                        //         : "grey";
                        // },
                        // vLineColor: function (i, node) {
                        //     return i === 0 || i === node.table.widths.length
                        //         ? "black"
                        //         : "grey";
                        // },
                        hLineWidth: () => 1,
                        vLineWidth: () => 1,
                        hLineColor: () => "#DDDDDD",
                        vLineColor: () => "#DDDDDD",
                        fillColor: function (
                            rowIndex: number,
                            node: any,
                            columnIndex: number
                        ) {
                            return rowIndex % 2 === 1 ? "#F4F4F4" : null;
                        },
                        // defaultBorder: false,
                    },
                },
            ],
            styles: {
                header: {
                    fontSize: 18,
                    bold: true,
                },
                tableHeader: {
                    bold: true,
                    fontSize: 13,
                    color: "white",
                },
            },
        };

        pdfMake.tableLayouts = {
            lightLayout: {
                hLineColor: function (i: any) {
                    return "#fff";
                },
                vLineColor: function (i: any) {
                    return "#eeeeee";
                },
                fillColor: function (
                    rowIndex: any,
                    node: any,
                    columnIndex: any
                ) {
                    return rowIndex % 2 === 1 ? "#black" : null;
                },
            },
        };
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(dd).getBase64(async (newPagePdfdata: any) => {
            if (ui.current) {
                const templateAtual = ui.current.getTemplate();
                const pdfBase64data: any = templateAtual.basePdf;

                const pdfBase64 = splitBase64(pdfBase64data);
                const newPagePdf = newPagePdfdata;

                if (pdfBase64 == null || newPagePdf == null) {
                    return toast.error("Falha ao ler o pdf base");
                }
                //
                const pdfDoc = await PDFDocument.load(
                    Buffer.from(pdfBase64, "base64")
                );
                const newDoc = await PDFDocument.load(
                    Buffer.from(newPagePdf, "base64")
                );

                const pages = pdfDoc.getPages();
                const newPages = newDoc.getPages();

                const schemas = templateAtual.schemas;

                for (let i = 0; i < newPages.length; i++) {
                    const [existingPage] = await pdfDoc.copyPages(newDoc, [i]);
                    pdfDoc.addPage(existingPage);
                    pages.push(newPages[i]);
                    schemas.push({});
                }

                // pages.push(...newPages);
                // const schemas = templateAtual.schemas;
                // newPages.map(() => {
                //     schemas.push({});
                // });

                const newPdf = await pdfDoc.save();
                const newPdfBase64 = Buffer.from(newPdf).toString("base64");

                ui.current.updateTemplate(
                    Object.assign(cloneDeep(ui.current.getTemplate()), {
                        basePdf: `data:application/pdf;base64,${newPdfBase64}`,
                        schemas,
                    })
                );
            }
        });
    });
}

export function splitBase64(base64: string) {
    const match = base64.match(/data:application\/pdf;base64,(.*)/);

    if (match) {
        return match[1];
    } else {
        return null;
    }
}
