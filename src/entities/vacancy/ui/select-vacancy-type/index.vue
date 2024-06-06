<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { Select } from '@/shared/ui/fields'
import {
    findVacancyTypeById,
    mapVacancyTypesToSelectOption,
    useVacanciesModel,
    type VacancyType
} from '@/entities/vacancy'

const { types } = storeToRefs(useVacanciesModel())
const { loadTypes } = useVacanciesModel()

const emits = defineEmits<{
    (e: 'change', value: VacancyType | null): void
}>()

const options = computed(() => mapVacancyTypesToSelectOption(types.value))

const onChange = (vacancyId: string) => {
    emits('change', findVacancyTypeById(vacancyId))
}

loadTypes()
</script>

<template>
    <Select :options="options" @change="onChange" label="Тип вакансии" name="type" id="type" />
</template>

<style scoped></style>
