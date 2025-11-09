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
