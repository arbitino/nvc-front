<script setup lang="ts">
import { SelectCompany } from '@/entities/companies'
import { Dropzone, Submit } from '@/shared/ui/fields'
import { VacancyApi } from '@/entities/vacancy'
import { fileExtensions } from '@/features/vacancy/upload-file/config'
import { ref } from 'vue'
import { useDatabase } from '@/shared/api'
import { useFailedToast, useSuccessToast } from '@/shared/ui/toast'

// TODO: fix lang or msg
const label = 'Допустимые форматы - <span class="italic">xlsx</span>'
const form = ref<HTMLFormElement | null>(null)

const onSubmit = () => {
    const { currentDatabase } = useDatabase()

    if (currentDatabase === null) {
        useFailedToast('Не выбрана база данных')
        return
    }

    const formData = new FormData(form.value as HTMLFormElement)

    VacancyApi.uploadVacancyFile(formData, currentDatabase).then((response) => {
        useSuccessToast(response ? response.message : 'no response')
    })
}
</script>

<template>
    <form
        @submit.prevent="onSubmit"
        class="flex flex-col max-w-prose"
        method="POST"
        enctype="multipart/form-data"
        ref="form"
    >
        <div class="mb-5">
            <SelectCompany :required="true" />
        </div>

        <Dropzone :label="label" :accept="fileExtensions" :required="true" name="file" />

        <Submit label="Отправить" />
    </form>
</template>

<style scoped></style>
