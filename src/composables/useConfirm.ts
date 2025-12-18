import { ref } from 'vue'

interface ConfirmOptions {
    title?: string
    description: string
    confirmText?: string
    cancelText?: string
    destructive?: boolean
}

const isOpen = ref(false)
const options = ref<ConfirmOptions>({ description: '' })
let resolvePromise: ((value: boolean) => void) | null = null

export function useConfirm() {
    function confirm(opts: ConfirmOptions | string): Promise<boolean> {
        if (typeof opts === 'string') {
            opts = { description: opts }
        }
        options.value = {
            title: opts.title || 'Confirm',
            description: opts.description,
            confirmText: opts.confirmText || 'Continue',
            cancelText: opts.cancelText || 'Cancel',
            destructive: opts.destructive || false,
        }
        isOpen.value = true

        return new Promise((resolve) => {
            resolvePromise = resolve
        })
    }

    function handleConfirm() {
        if (resolvePromise) {
            resolvePromise(true)
            resolvePromise = null
        }
        isOpen.value = false
    }

    function handleCancel() {
        if (resolvePromise) {
            resolvePromise(false)
            resolvePromise = null
        }
        isOpen.value = false
    }

    return {
        isOpen,
        options,
        confirm,
        handleConfirm,
        handleCancel,
    }
}
