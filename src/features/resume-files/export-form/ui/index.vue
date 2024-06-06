<script setup lang="ts">
import { Submit } from '@/shared/ui/fields'
import { type ExportRequest, SelectPrograms, ResumeFilesApi } from '@/entities/resume-files'
import { Datepicker } from '@/shared/ui/fields'
import { ref } from 'vue'
import { useDatabase } from '@/shared/api'
import { formDateToTimeStamp } from '@/shared/lib'
import { useSuccessToast } from '@/shared/ui/toast'

const form = ref<HTMLFormElement | null>(null)
const link = ref<string>('')

const onSubmit = () => {
    const { currentDatabase } = useDatabase()

    if (form.value === null || currentDatabase === null) {
        return
    }

    const formData = new FormData(form.value)

    const exportRequest: ExportRequest = {
        programs: formData.getAll('program').length ? formData.getAll('program').map(Number) : [],
        date_start: formDateToTimeStamp(formData.get('date-start') as string),
        date_end: formDateToTimeStamp(formData.get('date-end') as string)
    }

    ResumeFilesApi.exportResumeFile(exportRequest, currentDatabase).then((result) => {
        if (result?.message) {
            useSuccessToast('Экспорт закончен')
            link.value = result.message
        }
    })
}
</script>

<template>
    <div>
        <a v-if="link" :href="link" download class="inline-block mb-2 dark:text-teal-50">
            Скачать файл
        </a>

        <form ref="form" @submit.prevent="onSubmit">
            <div class="mb-10 max-w-prose">
                <SelectPrograms :required="true" :multiple="true" />
            </div>

            <div class="mb-5">
                <Datepicker :required="true" />
            </div>

            <Submit label="Экспорт" />
        </form>
    </div>
</template>

<style scoped></style>
