import Image from "next/image";
import { twMerge } from "tailwind-merge";
import LoaderGif from "../../public/images/loaders/loader2.gif";
const Button = ({
    children,
    disabled,
    loading,
    className,
    ...rest
}: // }: ButtonHTMLAttributes<HTMLButtonElement>) => {
any) => {
    const classButton = twMerge(
        `flex justify-center w-fit justify-center items-center rounded bg-success p-2 px-4 font-medium text-gray ${
            (loading || disabled) && "opacity-80 cursor-not-allowed"
        }`,
        className
    );
    return (
        // <div className="justify-center flex">
        <button
            className={classButton}
            disabled={loading || disabled}
            {...rest}
        >
            {loading ? (
                <Image width={32} height={32} src={LoaderGif} alt="Logo" />
            ) : (
                children
            )}
        </button>
        // </div>
    );
};

export default Button;
