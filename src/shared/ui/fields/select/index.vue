<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOptions } from '@/shared/types'

withDefaults(
    defineProps<{
        name: string
        label: string
        options: SelectOptions
        id?: string
        multiple?: boolean
        required?: boolean
    }>(),
    {
        multiple: false,
        required: false
    }
)

const emits = defineEmits<{
    (e: 'change', value: string): void
}>()

const input = ref<HTMLInputElement | null>(null)

const onChange = (): void => {
    emits('change', input.value?.value || '')
}
</script>

<template>
    <div>
        <label
            :for="id || name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
            {{ label }}
        </label>
        <select
            ref="input"
            :id="id || name"
            :name="name"
            @change="onChange"
            :multiple="multiple"
            :required="required"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer"
            :class="multiple ? 'max-h-44' : ''"
        >
            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<style scoped></style>
