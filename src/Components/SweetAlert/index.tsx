import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

interface AlertOptions {
    title: string;
    text: string;
    onClose?: () => void;
}
export const SuccessAlert = ({ title, text, onClose }: AlertOptions) =>
    MySwal.fire({
        icon: 'success',
        title,
        text,
    }).then(() => {
        if (onClose) onClose();
    });


export const ErrorAlert = ({ title, text, onClose }: AlertOptions) =>
    MySwal.fire({
        icon: 'error',
        title,
        text,
    }).then(() => {
        if (onClose) onClose();
    });


export const confirmAlert = async (title: string, text: string): Promise<boolean> => {
    const result = await MySwal.fire({
        title,
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar',
    });

    return result.isConfirmed;
}