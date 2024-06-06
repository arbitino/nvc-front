<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { Select } from '@/shared/ui/fields'
import {
    findProgramById,
    mapProgramsToSelectOption,
    type Program,
    useProgramsModel
} from '@/entities/resume-files'

const emits = defineEmits<{
    (e: 'change', value: Program | null): void
}>()

withDefaults(
    defineProps<{
        required?: boolean
        multiple?: boolean
    }>(),
    { required: false, multiple: false }
)

const { programs } = storeToRefs(useProgramsModel())
const { loadPrograms } = useProgramsModel()

const programsOptions = computed(() => mapProgramsToSelectOption(programs.value))
const onChange = (programId: string) => {
    emits('change', findProgramById(programId))
}

loadPrograms()
</script>

<template>
    <Select
        :options="programsOptions"
        :required="required"
        :multiple="multiple"
        @change="onChange"
        label="Выберите программу стажировки"
        name="program"
        id="program"
    />
</template>

<style scoped></style>
