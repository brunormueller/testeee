import Swal from "sweetalert2";
import Button from "../Forms/Button";

const SweetAlertConfirmacao = ({
    resultConfirmed,
    icon,
    tittle,
    html,
    className,
    children,
}: any) => {
    const handleSweetAlert = () => {
        Swal.fire({
            icon: icon,
            title: tittle,
            html: `${html}`,
            showDenyButton: true,
            confirmButtonText: "Sim",
            denyButtonText: `Não`,
        }).then((result) => {
            if (result.isConfirmed) {
                {
                    resultConfirmed();
                }
            } else {
            }
        });
    };

    return (
        <Button className={className} type="button" onClick={handleSweetAlert}>
            {children}{" "}
        </Button>
    );
};

export default SweetAlertConfirmacao;
