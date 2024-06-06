<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { type Company, useCompaniesModel } from '@/entities/companies'
import { computed } from 'vue'
import { findCompanyById, mapCompaniesToSelectOption } from '@/entities/companies/model'
import { Select } from '@/shared/ui/fields'

const emits = defineEmits<{
    (e: 'change', value: Company | null): void
}>()

withDefaults(
    defineProps<{
        required?: boolean
        multiple?: boolean
    }>(),
    { required: false, multiple: false }
)

const { companies } = storeToRefs(useCompaniesModel())
const { loadCompanies } = useCompaniesModel()

const companiesOptions = computed(() => mapCompaniesToSelectOption(companies.value))
const onChange = (companyID: string) => {
    emits('change', findCompanyById(companyID))
}

loadCompanies()
</script>

<template>
    <Select
        :options="companiesOptions"
        :required="required"
        :multiple="multiple"
        @change="onChange"
        label="Выберите компанию"
        name="company"
        id="company"
    />
</template>

<style scoped></style>
