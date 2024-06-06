import { defineStore, storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import type { Genders } from '@/entities/genders'
import { GENDERS_LOADED_MSG, GENDERS_NOT_LOADED_MSG, GendersApi } from '@/entities/genders'
import { useDatabase } from '@/shared/api'
import { useFailedToast, useSuccessToast } from '@/shared/ui/toast'
import { DATABASES_NOT_LOADED_MSG } from '@/shared/lang/ru/databases'
import type { SelectOptions } from '@/shared/types'

export const useGendersModel = defineStore('genders', () => {
    const genders = ref<Genders>({ genders: [] })
    const { currentDatabase } = storeToRefs(useDatabase())

    const loadGenders = () => {
        if (!currentDatabase.value || !currentDatabase.value?.code) {
            useFailedToast(`${GENDERS_NOT_LOADED_MSG} - ${DATABASES_NOT_LOADED_MSG}`)
            return
        }

        GendersApi.fetchGenders(currentDatabase.value).then((_genders) => {
            genders.value = _genders
            useSuccessToast(GENDERS_LOADED_MSG)
        })
    }

    watch(currentDatabase, () => {
        loadGenders()
    })

    return { genders, loadGenders }
})

export const mapGendersToSelectOptions = (genders: Genders): SelectOptions => {
    if (!genders.genders || !genders.genders.length) {
        return []
    }

    return genders.genders.map((gender) => ({
        label: gender.name,
        value: gender.id
    }))
}

export const findGenderById = (id: string) => {
    const { genders } = useGendersModel()

    if (!genders.genders || !genders.genders.length) {
        return null
    }

    return genders.genders.find((gender) => gender.id === id)
}
