import { ref } from 'vue'

interface PromptOptions {
    title?: string
    description?: string
    placeholder?: string
    defaultValue?: string
    confirmText?: string
    cancelText?: string
}

const isOpen = ref(false)
const options = ref<PromptOptions>({})
const inputValue = ref('')
let resolvePromise: ((value: string | null) => void) | null = null

export function usePrompt() {
    function prompt(opts: PromptOptions): Promise<string | null> {
        options.value = {
            title: opts.title || 'Input',
            description: opts.description,
            placeholder: opts.placeholder,
            defaultValue: opts.defaultValue || '',
            confirmText: opts.confirmText || 'OK',
            cancelText: opts.cancelText || 'Cancel',
        }
        inputValue.value = opts.defaultValue || ''
        isOpen.value = true

        return new Promise((resolve) => {
            resolvePromise = resolve
        })
    }

    function handleConfirm() {
        const value = inputValue.value.trim()
        if (resolvePromise) {
            resolvePromise(value || null)
            resolvePromise = null
        }
        isOpen.value = false
    }

    function handleCancel() {
        if (resolvePromise) {
            resolvePromise(null)
            resolvePromise = null
        }
        isOpen.value = false
    }

    return {
        isOpen,
        options,
        inputValue,
        prompt,
        handleConfirm,
        handleCancel,
    }
}
