<script setup lang="ts">
import { Submit } from '@/shared/ui/fields'
import { SelectCompany } from '@/entities/companies'
import { SelectVacancyType, type Vacancy } from '@/entities/vacancy'
import { SelectActivity } from '@/entities/activities'
import { SelectEmploymentType } from '@/entities/employments'
import { SelectGender } from '@/entities/genders'
import { Checkbox, Input, Textarea } from '@/shared/ui/fields'
import { ref } from 'vue'
import { VacancyApi } from '@/entities/vacancy'
import { useSuccessToast } from '@/shared/ui/toast'
import { useDatabase } from '@/shared/api'

const form = ref<HTMLFormElement | null>(null)

const onSubmit = () => {
    const { currentDatabase } = useDatabase()

    if (form.value === null || currentDatabase === null) {
        return
    }

    const formData = new FormData(form.value)

    const vacancy: Vacancy = {
        companyId: Number(formData.get('company')),
        isActive: Boolean(formData.get('isActive')),
        isSend: Boolean(formData.get('isSend')),
        contacts: formData.get('contacts') as string,
        education: formData.get('education') as string,
        position: formData.get('position') as string,
        qualification: formData.get('qualification') as string,
        recruiterEmail: formData.get('recruiterEmail') as string,
        salary: formData.get('salary') as string,
        sex: formData.get('sex') as string,
        subdivision: formData.get('subdivision') as string,
        type: formData.get('type') as string,
        workActivities: formData.get('workActivities') as string,
        workConditions: formData.get('workConditions') as string,
        workDuty: formData.get('workDuty') as string,
        workExperience: formData.get('workExperience') as string,
        employmentType: formData.get('employmentType') as string
    }

    console.log(vacancy)

    VacancyApi.storeVacancyByFormData(vacancy, currentDatabase)
        .then((response) => {
            useSuccessToast(response ? response.message : 'no response')
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            if (form.value !== null) {
                form.value.reset()
                form.value.isActive.checked = true
                form.value.isSend.checked = true
            }
        })
}
</script>

<template>
    <form ref="form" @submit.prevent="onSubmit">
        <div class="mb-10 max-w-prose">
            <SelectCompany />
        </div>

        <div class="grid gap-5 md:grid-cols-2 mb-5">
            <div class="">
                <SelectVacancyType />

                <div class="grid gap-6 mt-2 md:grid-cols-3">
                    <Checkbox name="isActive" label="Активная" :checked="true" />
                    <Checkbox name="isSend" label="Включить в рассылку" :checked="true" />
                </div>
            </div>

            <div class="">
                <SelectActivity />
            </div>

            <div class="">
                <SelectEmploymentType />
            </div>

            <div class="">
                <SelectGender />
            </div>

            <div class="">
                <Input name="position" label="Позиция" :required="true" />
            </div>

            <div class="">
                <Input name="subdivision" label="Подразделение" />
            </div>

            <div class="">
                <Input name="education" label="Образование" />
            </div>

            <div class="">
                <Input name="salary" label="Уровень зарплаты" />
            </div>

            <div class="">
                <Textarea name="workExperience" label="Опыт работы" />
            </div>

            <div class="">
                <Textarea name="qualification" label="Требования" :required="true" />
            </div>

            <div class="">
                <Textarea name="workDuty" label="Функциональные обязанности" :required="true" />
            </div>

            <div class="">
                <Textarea name="workConditions" label="Условия" />
            </div>

            <div class="">
                <Textarea
                    name="contacts"
                    label="Контактная информация для связи по данной вакансии"
                />
            </div>

            <div class="">
                <Input name="recruiterEmail" label="E-mail рекрутера" type="email" />
            </div>
        </div>

        <Submit label="Отправить" />
    </form>
</template>

<style scoped></style>
