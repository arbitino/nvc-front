<script setup lang="ts">
import type { DatepickerEvent } from '@/shared/ui/fields/datepicker/types'

withDefaults(
    defineProps<{
        startName?: string
        endName?: string
        startLabel?: string
        endLabel?: string
        required?: boolean
    }>(),
    {
        required: false,
        startName: 'date-start',
        endName: 'date-end',
        startLabel: 'Начальная дата',
        endLabel: 'Конечная дата'
    }
)

const emits = defineEmits<{
    (e: 'change', value: DatepickerEvent): void
}>()

const onChange = (e: DatepickerEvent) => {
    emits('change', e)
}

const onChangeStart = (e: Event) => {
    onChange({ type: 'start', event: e })
}

const onChangeEnd = (e: Event) => {
    onChange({ type: 'end', event: e })
}
</script>

<template>
    <div>
        <div ref="el" class="flex items-center">
            <span class="mx-4 text-gray-500">с</span>
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        class="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                        />
                    </svg>
                </div>
                <input
                    :name="startName"
                    :required="required"
                    :placeholder="startLabel"
                    type="date"
                    @change="onChangeStart"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <span class="mx-4 text-gray-500">по</span>
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                        class="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"
                        />
                    </svg>
                </div>
                <input
                    :name="endName"
                    :required="required"
                    :placeholder="endLabel"
                    type="date"
                    @change="onChangeEnd"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
        </div>
    </div>
</template>

<style scoped></style>
