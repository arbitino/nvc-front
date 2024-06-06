<script setup lang="ts">
import {
    findGenderById,
    type Gender,
    mapGendersToSelectOptions,
    useGendersModel
} from '@/entities/genders'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { Select } from '@/shared/ui/fields'

const { genders } = storeToRefs(useGendersModel())
const { loadGenders } = useGendersModel()

const emits = defineEmits<{
    (e: 'change', value: Gender | null): void
}>()

const options = computed(() => mapGendersToSelectOptions(genders.value))

const onChange = (genderId: string) => {
    emits('change', findGenderById(genderId))
}

loadGenders()
</script>

<template>
    <Select :options="options" @change="onChange" label="Пол" name="sex" id="sex" />
</template>

<style scoped></style>
