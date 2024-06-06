import { defineStore, storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useDatabase } from '@/shared/api'
import { DATABASES_NOT_LOADED_MSG } from '@/shared/lang/ru/databases'
import { useFailedToast, useSuccessToast } from '@/shared/ui/toast'
import { VACANCIES_TYPES_LOADED_MSG } from '@/entities/vacancy/config'
import type { VacancyTypes } from '@/entities/vacancy/'
import { VacancyApi } from '@/entities/vacancy'
import type { SelectOptions } from '@/shared/types'

export const useVacanciesModel = defineStore('vacancies', () => {
    const types = ref<VacancyTypes>({ types: [] })
    const { currentDatabase } = storeToRefs(useDatabase())

    const loadTypes = () => {
        if (!currentDatabase.value) {
            useFailedToast(DATABASES_NOT_LOADED_MSG)
            return
        }

        VacancyApi.fetchVacancyTypes(currentDatabase.value).then((_types) => {
            types.value = _types
            useSuccessToast(VACANCIES_TYPES_LOADED_MSG)
        })
    }

    watch(currentDatabase, () => {
        loadTypes()
    })

    return { types, loadTypes }
})

export const mapVacancyTypesToSelectOption = (types: VacancyTypes): SelectOptions => {
    if (!types || !types.types.length) {
        return []
    }

    return types.types.map((type) => ({
        label: type.name,
        value: type.id
    }))
}

export const findVacancyTypeById = (id: string) => {
    const { types } = useVacanciesModel()

    if (!types || !types.types.length) {
        return null
    }

    return types.types.find((type) => type.id === id)
}
