import { defineStore, storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useDatabase } from '@/shared/api'
import { useFailedToast, useSuccessToast } from '@/shared/ui/toast'
import { DATABASES_NOT_LOADED_MSG } from '@/shared/lang/ru/databases'
import type { Employments } from '@/entities/employments'
import {
    EMPLOYMENTS_LOADED_MSG,
    EMPLOYMENTS_NOT_LOADED_MSG,
    EmploymentsApi
} from '@/entities/employments'
import type { SelectOptions } from '@/shared/types'

export const useEmploymentsModel = defineStore('employments', () => {
    const employments = ref<Employments>({ employmentTypes: [] })
    const { currentDatabase } = storeToRefs(useDatabase())

    const loadEmployments = () => {
        if (!currentDatabase.value || !currentDatabase.value.code) {
            useFailedToast(`${EMPLOYMENTS_NOT_LOADED_MSG} - ${DATABASES_NOT_LOADED_MSG}`)
            return
        }

        EmploymentsApi.fetchEmployments(currentDatabase.value).then((_employments) => {
            employments.value = _employments
            useSuccessToast(EMPLOYMENTS_LOADED_MSG)
        })
    }

    watch(currentDatabase, () => {
        loadEmployments()
    })

    return { employments, loadEmployments }
})

export const mapEmploymentsToSelectOptions = (employments: Employments): SelectOptions => {
    if (!employments.employmentTypes || !employments.employmentTypes.length) {
        return []
    }

    return employments.employmentTypes.map((employment) => ({
        label: employment.name,
        value: employment.id
    }))
}

export const findEmploymentById = (id: string) => {
    const { employments } = useEmploymentsModel()

    if (!employments.employmentTypes || !employments.employmentTypes.length) {
        return null
    }

    return employments.employmentTypes.find((employment) => employment.id === id)
}
