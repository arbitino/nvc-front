<script setup lang="ts">
import { ref } from 'vue'

withDefaults(
    defineProps<{
        name: string
        label: string
        type?: 'text' | 'email' | 'password' | 'tel'
        id?: string
        value?: string
        required?: boolean
    }>(),
    { type: 'text', required: false }
)

const emits = defineEmits<{
    (e: 'input', value: string): void
}>()

const input = ref<HTMLInputElement | null>(null)

const onInput = (): void => {
    emits('input', input.value?.value || '')
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
        <input
            ref="input"
            :type="type"
            :id="id || name"
            :name="name"
            :value="value"
            @input="onInput"
            :required="required"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
    </div>
</template>

<style scoped></style>
