<script setup lang="ts">
import { ref } from 'vue'
import { useFailedToast, useSuccessToast } from '@/shared/ui/toast'

const props = withDefaults(
    defineProps<{
        accept: string[]
        label: string
        name: string
        id?: string
        required?: boolean
    }>(),
    { accept: () => [], required: false }
)

const emits = defineEmits<{
    (e: 'upload', value: File): void
}>()

const fileName = ref<HTMLElement | null>(null)
const fileFormats = ref<HTMLElement | null>(null)
const input = ref<HTMLInputElement | null>(null)

const onChange = () => {
    const file = input.value?.files && input.value?.files[0]

    // TODO: fix lang or msg
    if (
        !(
            file &&
            file.type &&
            props.accept.length > 0 &&
            props.accept.includes(file.type.toLowerCase())
        )
    ) {
        fileFormats.value?.classList.remove('hidden')
        fileFormats.value?.classList.add('text-red-500')

        if (fileName.value) {
            fileName.value.innerHTML = `<span class="font-semibold">Выбрать файл</span> или перетащить`
        }

        useFailedToast('Файл не загружен')
        return
    }

    fileFormats.value?.classList.add('hidden')

    if (fileName.value) {
        fileName.value.innerHTML = `<span class="font-semibold">${file.name || 'загружен'}</span>`
    }

    emits('upload', file)
    useSuccessToast('Файл загружен')
}
</script>

<template>
    <label
        :for="id || name"
        class="mb-5 relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
    >
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
                class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
            >
                <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
            </svg>

            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400" ref="fileName">
                <span class="font-semibold"> Выбрать файл </span>
                или перетащить
            </p>

            <p class="text-xs text-gray-500 dark:text-gray-400" ref="fileFormats" v-html="label" />
        </div>
        <input
            ref="input"
            :name="name"
            :required="required"
            :id="id || name"
            @change="onChange"
            type="file"
            class="absolute z-10 cursor-pointer opacity-0 inset-0"
        />
    </label>
</template>

<style scoped></style>
