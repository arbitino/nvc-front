<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
    defineProps<{
        name: string
        label: string
        required?: boolean
        id?: string
        value?: string
    }>(),
    { value: '', required: false }
)

const emits = defineEmits<{
    (e: 'input', value: string): void
}>()

const input = ref<HTMLInputElement | null>(null)
const _value = ref<string>(props.value)
const onInput = (): void => {
    emits('input', _value.value)
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

        <textarea
            ref="input"
            :id="id || name"
            :name="name"
            :required="required"
            @input="onInput"
            v-model="_value"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        ></textarea>
    </div>
</template>

<style scoped></style>
