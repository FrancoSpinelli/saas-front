
import { Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const ToastContext = () => <ToastContainer
    position="bottom-right"
    autoClose={2000}
    limit={1}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    theme="dark"
    transition={Bounce}
/>