import { Api } from '../lib'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DATABASES_LOADED_MSG, DATABASES_SELECTED_MSG } from '../lang/ru/databases'
import { useSuccessToast } from '@/shared/ui/toast'
import type { Database, Databases } from '@/shared/types'

let api: Api

export const useApi = () => {
    if (!api) {
        api = new Api({
            fetchOptions: {
                baseURL: import.meta.env.VITE_API_URL
            },
            apiVersion: import.meta.env.VITE_API_VERSION
        })
    }

    return api
}

export const useDatabase = defineStore('database', () => {
    const databases = ref<Databases>({ databases: [] })
    const currentDatabase = ref<Database | null>(null)

    const changeDatabase = (db: Database) => {
        currentDatabase.value = db

        useSuccessToast(`${DATABASES_SELECTED_MSG} - ${db.name}`)
    }

    const loadDatabases = async () => {
        const api = useApi()

        databases.value = await api.get<Databases>('/db')

        useSuccessToast(DATABASES_LOADED_MSG)
        changeDatabase(databases.value.databases[0])
    }

    return { databases, currentDatabase, changeDatabase, loadDatabases }
})
