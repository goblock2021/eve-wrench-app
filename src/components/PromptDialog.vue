<script setup lang="ts">
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { usePrompt } from '@/composables/usePrompt'

const { isOpen, options, inputValue, handleConfirm, handleCancel } = usePrompt()
</script>

<template>
    <AlertDialog :open="isOpen">
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>{{ options.title }}</AlertDialogTitle>
                <AlertDialogDescription v-if="options.description">
                    {{ options.description }}
                </AlertDialogDescription>
            </AlertDialogHeader>
            <Input
                v-model="inputValue"
                :placeholder="options.placeholder"
                @keyup.enter="handleConfirm"
                @keyup.escape="handleCancel"
            />
            <AlertDialogFooter>
                <Button variant="outline" @click="handleCancel">
                    {{ options.cancelText }}
                </Button>
                <Button @click="handleConfirm">
                    {{ options.confirmText }}
                </Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>
