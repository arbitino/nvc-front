<script setup lang="ts">
import { ref } from 'vue'

withDefaults(
    defineProps<{
        name: string
        label: string
        checked: boolean
        value?: string
        id?: string
    }>(),
    { checked: false, value: '1' }
)

const emits = defineEmits<{
    (e: 'change', value: boolean): void
}>()

const input = ref<HTMLInputElement | null>(null)

const onChange = (): void => {
    emits('change', input.value?.checked || false)
}
</script>

<template>
    <div>
        <input
            ref="input"
            checked
            :id="id || name"
            :name="name"
            :value="value"
            @change="onChange"
            type="checkbox"
            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label :for="id || name" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            {{ label }}
        </label>
    </div>
</template>

<style scoped></style>
