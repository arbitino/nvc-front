import {
    type Activities,
    ACTIVITIES_LOADED_MSG,
    ACTIVITIES_NOT_LOADED_MSG,
    ActivitiesApi
} from '@/entities/activities'
import { defineStore, storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import { useFailedToast, useSuccessToast } from '@/shared/ui/toast'
import { DATABASES_NOT_LOADED_MSG } from '@/shared/lang/ru/databases'
import { useDatabase } from '@/shared/api'
import type { SelectOptions } from '@/shared/types'

export const useActivitiesModel = defineStore('activities', () => {
    const activities = ref<Activities>({ activities: [] })
    const { currentDatabase } = storeToRefs(useDatabase())

    const loadActivities = () => {
        if (!currentDatabase.value || !currentDatabase.value?.code) {
            useFailedToast(`${ACTIVITIES_NOT_LOADED_MSG} - ${DATABASES_NOT_LOADED_MSG}`)
            return
        }

        ActivitiesApi.fetchActivities(currentDatabase.value).then((_activities) => {
            activities.value = _activities

            useSuccessToast(ACTIVITIES_LOADED_MSG)
        })
    }

    watch(currentDatabase, () => {
        loadActivities()
    })

    return { activities, loadActivities }
})

export const mapActivitiesToSelectOptions = (activities: Activities): SelectOptions => {
    if (!activities.activities || !activities.activities.length) {
        return []
    }

    return activities.activities.map((activity) => ({
        label: activity.name,
        value: activity.name
    }))
}

export const findActivityByName = (name: string) => {
    const { activities } = useActivitiesModel()

    if (!activities.activities || !activities.activities.length) {
        return null
    }

    return activities.activities.find((activity) => activity.name === name)
}
