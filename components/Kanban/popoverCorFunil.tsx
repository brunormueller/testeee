import { GetForm } from "@/utils";
import { Fragment, useState } from "react";
import * as yup from "yup";
const PopoverCorFunil = ({ corSelecionada }: any) => {
  const [corEtiqueta, setCorEtiqueta] = useState("#21272c");
  const [yupSchema, setYupSchema] = useState<
    yup.ObjectSchema<{}, yup.AnyObject, {}, "">
  >(yup.object().shape({}));
  const { handleSubmit, ...form } = GetForm(yupSchema, setYupSchema);

  const cores = [
    "#d71295",
    "#ed678d",
    "#6c7395",
    "#87896b",
    "#0a913b",
    "#3d4e81",
    "#ac0214",
    "#1415be",
    "#e3f43b",
    "#00e403",
  ];

  const handleChangeCor = (cor: string) => {
    corSelecionada(cor);
  };

  return (
    <Fragment>
      <div className="grid grid-cols-5 gap-2 px-4">
        {cores.map((cor, index) => (
          <div
            key={index}
            onClick={() => handleChangeCor(cor)}
            className={`h-6 w-10 rounded-sm  cursor-pointer`}
            style={{ backgroundColor: cor }}
          ></div>
        ))}
      </div>
    </Fragment>
  );
};

export default PopoverCorFunil;
