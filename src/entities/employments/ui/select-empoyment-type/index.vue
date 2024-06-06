<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { Select } from '@/shared/ui/fields'
import {
    type Employment,
    findEmploymentById,
    mapEmploymentsToSelectOptions,
    useEmploymentsModel
} from '@/entities/employments'

const { employments } = storeToRefs(useEmploymentsModel())
const { loadEmployments } = useEmploymentsModel()

const options = computed(() => mapEmploymentsToSelectOptions(employments.value))

const emits = defineEmits<{
    (e: 'change', value: Employment | null): void
}>()

const onChange = (employmentId: string) => {
    emits('change', findEmploymentById(employmentId))
}

loadEmployments()
</script>

<template>
    <Select
        :options="options"
        @change="onChange"
        label="Тип занятости"
        name="employmentType"
        id="employmentType"
    />
</template>

<style scoped></style>
