import { type ToastType, useToast as BaseToast } from 'vue-toast-notification'

export const useToast = (message: string, type: ToastType) => {
    if (import.meta.env.VITE_USE_TOASTS !== 'true') {
        console.log("Toast's is off")
        return
    }

    BaseToast().open({
        message: message,
        type: type,
        position: 'top-right'
    })
}

export const useSuccessToast = (message: string) => {
    useToast(message, 'success')
}

export const useFailedToast = (message: string) => {
    useToast(message, 'error')
}
