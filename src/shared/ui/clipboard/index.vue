<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

defineProps<{
    label: string
}>()

const modelValue = defineModel<string>({
    default: '...'
})

const { text, copy, copied, isSupported } = useClipboard({ source: modelValue })
</script>

<template>
    <div class="w-full max-w-3xl">
        <div class="mb-2 flex justify-between items-center">
            <p class="text-sm font-medium text-gray-900 dark:text-white">
                {{ label }}
            </p>
        </div>
        <div class="relative bg-gray-50 rounded-lg dark:bg-gray-700 p-4 h-64">
            <textarea
                v-model="modelValue"
                class="bg-gray-50 dark:bg-gray-700 w-full h-full border-none overflow-auto max-h-full text-sm text-gray-500 dark:text-gray-400 whitespace-pre"
            />

            <div class="absolute top-2 end-2 bg-gray-50 dark:bg-gray-700">
                <button
                    v-if="isSupported"
                    @click="copy(text)"
                    class="text-gray-900 dark:text-gray-400 m-0.5 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 rounded-lg py-2 px-2.5 inline-flex items-center justify-center bg-white border-gray-200 border"
                >
                    <span v-if="!copied" id="default-message" class="inline-flex items-center">
                        <svg
                            class="w-3 h-3 me-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 20"
                        >
                            <path
                                d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z"
                            />
                        </svg>
                        <span class="text-xs font-semibold">Копировать</span>
                    </span>
                    <span v-else id="success-message" class="inline-flex items-center">
                        <svg
                            class="w-3 h-3 text-blue-700 dark:text-blue-500 me-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 16 12"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M1 5.917 5.724 10.5 15 1.5"
                            />
                        </svg>
                        <span class="text-xs font-semibold text-blue-700 dark:text-blue-500"
                            >Скопированно</span
                        >
                    </span>
                </button>
            </div>
        </div>
    </div>
    <p v-if="!isSupported" class="mt-2 text-sm text-gray-500 dark:text-gray-400">
        Браузер не поддерживает Clipboard API
    </p>
</template>

<style scoped></style>
