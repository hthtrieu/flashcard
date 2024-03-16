import { toast } from 'react-toastify';
export default class ShowToastify {
    constructor(type: string, message: string) {
        switch (type) {
            case "success":
                ShowToastify.showSuccessToast(message)
                break;
            case "error":
                ShowToastify.showErrorToast(message)
                break;
            case "warning":
                ShowToastify.showWarningToast(message)
                break;
            default:
                break;
        }
    }
    static showSuccessToast(message: any) {
        toast(message, {
            type: 'success',
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            closeButton: true,
        })
    }

    static showErrorToast(message: any) {
        toast(message, {
            type: 'error',
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            closeButton: true,
        })
    }

    static showWarningToast(message: any) {
        toast(message, {
            type: 'warning',
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            closeButton: true,
        })
    }
}